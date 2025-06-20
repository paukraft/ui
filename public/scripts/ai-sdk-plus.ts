import { CoreMessage, generateText, Output } from 'ai'
import { TypeOf, z, ZodIssue, ZodObject } from 'zod'

/* ----------------------------------------------------------------------------
 * Types & helpers
 * ------------------------------------------------------------------------- */

/**
 * Parameter bag of `generateText` – prevents duplication below.
 */
type GenerateTextParams = Parameters<typeof generateText>[0]

/**
 * Error shape emitted by the AI SDK (condensed to what we need here).
 */
interface AIError {
  response?: { messages?: CoreMessage[]; text?: string }
  value?: unknown
  cause?: {
    name?: string
    cause?: {
      issues?: ZodIssue[]
    }
  }
  [key: string]: any
}

/**
 * Given a schema `T`, derive the concrete object type – or `undefined` when no
 * schema is supplied (i.e., `undefined`).
 */
export type OutputType<T extends ZodObject<any> | undefined> =
  T extends ZodObject<any> ? TypeOf<T> : undefined

/**
 * Successful return shape. The function throws on error, so no `error` field.
 */
export interface GenerateObjectResult<T> {
  /** Validated object from the model (never null when schema provided, undefined when no schema). */
  object: T
  /** Full conversation history (system ➜ prompt ➜ all messages). */
  sessionMessages: CoreMessage[]
  /** Raw response payload from the SDK (for advanced inspection). */
  response?: unknown
  /** Raw `experimental_output` from the SDK, if requested. */
  experimental_output?: unknown
  /**
   * Helper to push a follow-up user prompt into the *same* session without
   * re-building all args manually. Optionally accepts a new schema for validation.
   */
  askFollowUp: <
    TNewSchema extends ZodObject<any> | undefined = undefined
  >(opts: {
    prompt: string
    schema?: TNewSchema
  }) => Promise<GenerateObjectResult<OutputType<TNewSchema>>>
}

/* ------------------------------------------------------------------------- *
 * Utility: Build the conversation array that gets passed to the model.
 * ------------------------------------------------------------------------- */
const createSessionMessages = ({
  system,
  prompt,
  messages = [],
}: {
  system?: string
  prompt?: string
  messages?: CoreMessage[]
}): CoreMessage[] => {
  const session: CoreMessage[] = []

  if (system) session.push({ role: 'system', content: system })
  if (prompt) session.push({ role: 'user', content: prompt })
  session.push(...messages)

  return session
}

/* ------------------------------------------------------------------------- *
 * Utility: Clean JSON from markdown code blocks
 * Attempts to extract JSON from markdown code blocks (```json{...}```)
 * ------------------------------------------------------------------------- */
const cleanJsonFromMarkdown = ({ text }: { text: string }): string => {
  // If no text is provided, return empty string
  if (!text) return ''

  console.log(
    'Cleaning JSON from markdown, raw text:',
    text.substring(0, 100) + '...'
  )

  // Check for code blocks with json tag - this pattern is more flexible
  const jsonCodeBlockRegex = /```(?:json)?\s*([\s\S]*?)```/
  const match = jsonCodeBlockRegex.exec(text)

  if (match && match[1]) {
    const cleanedContent = match[1].trim()
    console.log(
      'Extracted JSON from markdown:',
      cleanedContent.substring(0, 100) + '...'
    )
    return cleanedContent
  }

  // If no code blocks found, return the original text
  return text
}

/* ------------------------------------------------------------------------- *
 * Utility: Balance brackets in potentially malformed JSON
 * ------------------------------------------------------------------------- */
const balanceBrackets = ({ text }: { text: string }): string => {
  try {
    // Count opening and closing brackets/braces
    const openBraces = (text.match(/\{/g) || []).length
    const closeBraces = (text.match(/\}/g) || []).length
    const openBrackets = (text.match(/\[/g) || []).length
    const closeBrackets = (text.match(/\]/g) || []).length

    let result = text

    // Balance braces if needed
    if (openBraces > closeBraces) {
      const missingBraces = openBraces - closeBraces
      result += '}'.repeat(missingBraces)
      console.log(`Added ${missingBraces} closing braces to balance JSON`)
    }

    // Balance brackets if needed
    if (openBrackets > closeBrackets) {
      const missingBrackets = openBrackets - closeBrackets
      result += ']'.repeat(missingBrackets)
      console.log(`Added ${missingBrackets} closing brackets to balance JSON`)
    }

    return result
  } catch (e) {
    console.log('Error in balanceBrackets:', e)
    return text
  }
}

/* ------------------------------------------------------------------------- *
 * Utility: Try to manually parse JSON safely
 * ------------------------------------------------------------------------- */
const tryParseJson = ({
  text,
}: {
  text: string
}): { success: boolean; result: any } => {
  try {
    // Clean the text first to remove any markdown code block markers
    const cleanedText = cleanJsonFromMarkdown({ text })

    // Remove any special characters that might cause parsing issues
    const sanitizedText = cleanedText
      .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Ensure property names are quoted
      .replace(/\u2028/g, '') // Remove line separator character
      .replace(/\u2029/g, '') // Remove paragraph separator character

    console.log(
      'Sanitized JSON (first 100 chars):',
      sanitizedText.substring(0, 100) + '...'
    )

    // First try to parse as is
    try {
      const result = JSON.parse(sanitizedText)
      console.log('Successfully parsed JSON manually on first attempt')
      return { success: true, result }
    } catch (parseError) {
      console.log(
        'First parse attempt failed, trying to balance brackets:',
        parseError
      )

      // If that fails, try to balance brackets and parse again
      const balancedText = balanceBrackets({ text })
      const result = JSON.parse(balancedText)
      console.log('Successfully parsed JSON manually after balancing brackets')
      return { success: true, result }
    }
  } catch (e) {
    console.log('All JSON parsing attempts failed:', e)

    return { success: false, result: null }
  }
}

/* ------------------------------------------------------------------------- *
 * Utility: Turn Zod issues into a friendly bullet list we can send back to
 * the model as feedback.
 * ------------------------------------------------------------------------- */
const formatZodErrors = ({ issues }: { issues: ZodIssue[] }): string =>
  [
    'Your response had validation errors:',
    ...issues.map((i) => `- ${i.path.join('.')}: ${i.message}`),
    'Please fix these issues and try again.',
  ].join('\n')

/* ------------------------------------------------------------------------- *
 * Utility: Create askFollowUp helper function
 * ------------------------------------------------------------------------- */
const createAskFollowUp = ({
  maxRetries,
  sessionMessages,
  restParams,
}: {
  maxRetries: number
  sessionMessages: CoreMessage[]
  restParams: Omit<GenerateTextParams, 'messages' | 'prompt' | 'system'>
}) => {
  return async <TNewSchema extends ZodObject<any> | undefined = undefined>({
    prompt: followUpPrompt,
    schema: newSchema,
  }: {
    prompt: string
    schema?: TNewSchema
  }): Promise<GenerateObjectResult<OutputType<TNewSchema>>> => {
    const result = await generateObjectPlus({
      schema: newSchema,
      maxRetries,
      ...restParams,
      messages: [...sessionMessages, { role: 'user', content: followUpPrompt }],
    })

    return result as GenerateObjectResult<OutputType<TNewSchema>>
  }
}

/* ----------------------------------------------------------------------------
 * generateObjectPlus
 * ------------------------------------------------------------------------- */

/**
 * Safer, schema-aware alternative to `generateText` / `generateObject`.
 *
 * @template TSchema  Optional Zod schema that the output must satisfy.
 *
 * @param schema        Zod schema used to validate the model output.
 * @param maxRetries    Number of validation retries (default `2`).
 *
 * @throws  Re-throws the last SDK error when validation never succeeds or when
 *          the error is unrelated to validation – i.e. behaves just like
 *          `generateObject`.
 */
export const generateObjectPlus = async <
  TSchema extends ZodObject<any> | undefined = undefined
>({
  schema,
  prompt,
  messages,
  system,
  maxRetries = 5,
  currentRetry = 0,
  ...rest
}: GenerateTextParams & {
  schema?: TSchema
  maxRetries?: number
  currentRetry?: number
}): Promise<GenerateObjectResult<OutputType<TSchema>>> => {
  /* 1️⃣  Compose the conversation history for this invocation. */
  const sessionMessages = createSessionMessages({
    system,
    prompt,
    messages: messages as CoreMessage[],
  })

  try {
    /* 2️⃣  Send the request. */
    const generateArgs: GenerateTextParams = {
      ...rest,
      prompt,
      messages,
      system,
      experimental_output:
        rest.experimental_output ??
        (schema ? Output.object({ schema }) : undefined),
    }

    const result = await generateText(generateArgs)

    /* Add any assistant messages returned to our log. */
    if (result?.response?.messages)
      sessionMessages.push(...result.response.messages)

    /* 3️⃣  Success – build the helper & return. */
    type Out = OutputType<TSchema>

    const askFollowUp = createAskFollowUp({
      maxRetries,
      sessionMessages,
      restParams: rest,
    })

    return {
      ...result,
      object: (schema
        ? typeof result.experimental_output === 'object'
          ? (result.experimental_output as Out)
          : undefined
        : undefined) as Out,
      sessionMessages,
      askFollowUp,
    }
  } catch (err) {
    /* 4️⃣  Error handling. */
    const error = err as AIError

    /* Preserve any assistant messages that came along with the error. */
    if (error.response?.messages)
      sessionMessages.push(...error.response.messages)

    const validationIssues = error.cause?.cause?.issues
    const isValidationError = error.cause?.name === 'AI_TypeValidationError'
    const isJSONParseError =
      error['vercel.ai.error.AI_JSONParseError'] === true ||
      error['vercel.ai.error.AI_NoObjectGeneratedError'] === true ||
      (typeof error.message === 'string' &&
        error.message.toLowerCase().includes('parse'))
    const isAbortError =
      error.code === 'ABORT_ERR' ||
      error.name === 'AbortError' ||
      (typeof error.message === 'string' &&
        error.message.toLowerCase().includes('abort'))

    /* 4a.1 ▸ Try to manually recover from JSON parse errors by cleaning markdown */
    if (isJSONParseError) {
      console.log(
        'Detected JSON parse error, attempting to fix markdown issues'
      )

      // Get text from the error response if available
      const responseText =
        error.response?.text ||
        error.text ||
        (typeof error.message === 'string' ? error.message : '')

      if (responseText) {
        console.log('Response text found, attempting to clean and parse')
        const { success, result: parsedJson } = tryParseJson({
          text: responseText,
        })

        if (success) {
          console.log(
            'Successfully parsed the JSON, checking schema validation'
          )

          if (schema) {
            // Try to validate the cleaned JSON against the schema
            try {
              const validated = schema.parse(parsedJson)
              console.log(
                'Successfully recovered and validated JSON from markdown code blocks'
              )

              // Create a success result manually
              const askFollowUp = createAskFollowUp({
                maxRetries,
                sessionMessages,
                restParams: rest,
              })

              const successResult: GenerateObjectResult<OutputType<TSchema>> = {
                object: validated as OutputType<TSchema>,
                sessionMessages,
                response: error.response,
                askFollowUp,
              }

              return successResult
            } catch (validationErr) {
              // If validation fails, log the specific validation errors
              console.log(
                'Cleaned JSON validation failed, showing validation errors:'
              )
              if (validationErr instanceof z.ZodError) {
                console.log(JSON.stringify(validationErr.errors, null, 2))
              } else {
                console.log('Unknown validation error:', validationErr)
              }
              console.log('Continuing with retry flow')
            }
          } else {
            // If no schema is provided but we have valid JSON, return it directly
            console.log('No schema provided, returning undefined for object')

            const askFollowUp = createAskFollowUp({
              maxRetries,
              sessionMessages,
              restParams: rest,
            })

            const successResult: GenerateObjectResult<OutputType<TSchema>> = {
              object: undefined as OutputType<TSchema>,
              sessionMessages,
              response: error.response,
              askFollowUp,
            }

            return successResult
          }
        } else {
          console.log('Failed to parse JSON')
        }
      } else {
        console.log('No response text found in error object')
      }
    }

    /* 4a ▸ Retry on validation errors while we have attempts left. */
    if (isValidationError && validationIssues && currentRetry < maxRetries) {
      const errorMessage = formatZodErrors({ issues: validationIssues })

      console.log(
        `Trying to fix Zod validation error ${currentRetry + 1}/${maxRetries}`
      )
      return generateObjectPlus<TSchema>({
        schema,
        maxRetries,
        currentRetry: currentRetry + 1,
        ...rest,
        messages: [...sessionMessages, { role: 'user', content: errorMessage }],
      })
    }

    /* 4b ▸ Retry on JSON parse errors while we have attempts left. */
    if (isJSONParseError && currentRetry < maxRetries) {
      const jsonErrorMessage =
        'Your response had a JSON parsing error. Please provide a valid JSON response without using code blocks or markdown formatting. Ensure your response is plain JSON without any backticks or ```json markers.'

      console.log(
        `Trying to fix JSON parse error ${currentRetry + 1}/${maxRetries}`
      )
      return generateObjectPlus<TSchema>({
        schema,
        maxRetries,
        currentRetry: currentRetry + 1,
        ...rest,
        messages: [
          ...sessionMessages,
          { role: 'user', content: jsonErrorMessage },
        ],
      })
    }

    /* 4c ▸ Retry on AbortError while we have attempts left. */
    if (isAbortError && currentRetry < maxRetries) {
      console.log(`Trying to fix AbortError ${currentRetry + 1}/${maxRetries}`)
      return generateObjectPlus<TSchema>({
        schema,
        maxRetries,
        currentRetry: currentRetry + 1,
        ...rest,
        messages: sessionMessages,
      })
    }

    /* 4d ▸ Otherwise propagate the error (mirrors `generateObject`). */
    ;(error as any).sessionMessages = sessionMessages // attach context
    throw error
  }
}
