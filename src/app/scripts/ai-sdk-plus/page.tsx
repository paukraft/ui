import Clapper from '@/components/clapper'
import { Expander } from '@/components/registry/expander/component'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { InlineCode } from '@/components/ui/inline-code'
import { Separator } from '@/components/ui/separator'
import { promises as fs } from 'fs'
import { ExternalLink } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import path from 'path'

export const metadata: Metadata = {
  title: 'AI SDK Plus - Enhanced AI SDK with Additional Features',
  description:
    "Enhanced version of Vercel AI SDK's generateObject with tool calling support, self-healing error recovery, and conversational continuity. Build more reliable AI agents with structured output and automatic retry mechanisms.",
}

export default async function Page() {
  const fileName = `ai-sdk-plus.ts`
  const filePath = path.join(process.cwd(), 'public', 'scripts', fileName)

  const code = await fs.readFile(filePath, 'utf-8')

  return (
    <div className="flex container mx-auto flex-1">
      {/* Table of Contents Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">On this page</h4>
          <nav className="space-y-1 text-sm">
            <a
              href="#overview"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Overview
            </a>
            <a
              href="#features"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Key Features
            </a>
            <a
              href="#tool-calling"
              className="block text-muted-foreground hover:text-foreground transition-colors pl-3"
            >
              Tool Calling
            </a>
            <a
              href="#error-recovery"
              className="block text-muted-foreground hover:text-foreground transition-colors pl-3"
            >
              Error Recovery
            </a>
            <a
              href="#conversational"
              className="block text-muted-foreground hover:text-foreground transition-colors pl-3"
            >
              Conversational Continuity - askFollowUp
            </a>
            <a
              href="#installation"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Installation
            </a>
            <a
              href="#examples"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Examples
            </a>
            <a
              href="#community"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Goals & Community
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-none overflow-hidden">
        <article className="w-full p-6 pb-16 flex flex-col gap-6 md:gap-12">
          {/* Header Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-6xl font-black">AI SDK Plus</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Adds a new generateObjectPlus function that is a enhanced version
              of the default generateObject function with some new concepts.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="https://ai-sdk.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="py-1 h-auto rounded-md px-2 text-xs [&_svg]:size-3.5 gap-1"
                >
                  AI SDK Documentation
                  <ExternalLink />
                </Button>
              </Link>
              <Link
                href="https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object#generateobject"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="py-1 h-auto rounded-md px-2 text-xs [&_svg]:size-3.5 gap-1"
                >
                  generateObject Reference
                  <ExternalLink />
                </Button>
              </Link>
            </div>
          </div>

          {/* Overview Section */}
          {/* <section id="overview">
            <h2 className="text-3xl font-bold mb-6">What is AI SDK Plus?</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-4">
                AI SDK Plus is an enhanced extension to the Vercel AI SDK&apos;s{' '}
                <InlineCode>generateObject</InlineCode> function. It adds a{' '}
                <InlineCode>generateObjectPlus</InlineCode> function that works
                like the standard <InlineCode>generateObject</InlineCode> but
                with enhancements that make production AI agents more reliable
                and add some new concepts.
              </p>
            </div>
          </section> */}

          {/* Quick Features Overview */}
          <section className="bg-muted/30 rounded-xl p-4 sm:p-6">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
              At a Glance
            </h3>
            {/* <h3
              className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 italic"
              style={{ transform: 'scaleX(1.4)', transformOrigin: 'left' }}
            >
              At a Glance
            </h3> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="size-2.5 sm:size-3 rounded-full bg-green-500 mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">
                    Tool Calling + Structured Output
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Use tools while maintaining structured responses
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent transform -rotate-12 hidden lg:block" />
                <div className="size-2.5 sm:size-3 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">
                    Self-Healing Error Recovery
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Automatically fixes validation and JSON errors
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 relative sm:col-span-2 lg:col-span-1">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent transform -rotate-12 hidden lg:block" />
                <div className="size-2.5 sm:size-3 rounded-full bg-purple-500 mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">
                    Conversational Continuity
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Follow-up conversations with context memory
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Key Features Section */}
          <section id="features">
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>

            <div className="space-y-12">
              {/* Tool Calling Feature */}
              <div id="tool-calling" className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  Tool Calling with Structured Output
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Unlike the standard generateObject, this supports tool calling
                  via the <InlineCode>maxSteps</InlineCode> parameter while
                  maintaining structured output. Essential for building
                  multi-step AI agents that need both tool access and reliable
                  data structures.
                </p>
                <div className="bg-muted/30 rounded-xl p-1">
                  <CodeBlock
                    code={`const { object } = await generateObjectPlus({
  model: openai('gpt-4o-mini'),
  schema: z.object({
    temperature: z.number(),
    condition: z.string(),
  }),
  maxSteps: 5, // Enable tool calling
  tools: {
    getWeather: {
      description: 'Get current weather',
      parameters: z.object({ city: z.string() }),
      execute: async ({ city }) => ({ temp: 22, condition: 'sunny' })
    }
  },
  prompt: 'What is the weather in Paris?'
})`}
                  />
                </div>
              </div>

              {/* Error Recovery Feature */}
              <div id="error-recovery" className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  Self-Healing Error Recovery
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Automatically catches and recovers from schema validation
                  failures, malformed JSON, and other common LLM output issues.
                  This has dramatically reduced production failures in my
                  enterprise deployments. The max number of retries can be
                  adjusted with the <InlineCode>maxRetries</InlineCode>{' '}
                  parameter. Self-healing works independently of{' '}
                  <InlineCode>maxSteps</InlineCode> - even with{' '}
                  <InlineCode>maxSteps: 1</InlineCode>, the retry mechanism will
                  still activate to fix validation errors.
                </p>
                <div className="bg-muted/30 rounded-xl p-1">
                  <Expander maxHeight={300}>
                    <CodeBlock
                      code={`
// The LLM doesn't get passed the refine part
// of the parameters in the schema, so we trick
// it into failing as we say pass 1 and 100 which 
// will fail the refine, so you can see the self-healing.

const { object, sessionMessages } = await generateObjectPlus({
  model: openai('gpt-4.1-nano'),
  prompt: 'Return 1 and 100',
  schema: z.object({
    value: z.number().refine((value) => value > 10, {
      message: 'Value must be greater than 10',
    }),
    value2: z.number().refine((value) => value < 10, {
      message: 'Value must be less than 10',
    }),
  }),
})

// Output shows automatic retry:
console.log(JSON.stringify(sessionMessages, null, 2))
// [
//   {
//     "role": "user",
//     "content": "Return 1 and 100"
//   },
//   ⬇️ The AI first returns 1 and 100 as instructed in the prompt.
//   {
//     "role": "assistant", 
//     "content": [{"type": "text", "text": "{\\"value\\":1,\\"value2\\":100}"}]
//   },
//   ⬇️ The zod schema validation fails and the AI is automatically asked to fix the issues by the AI SDK Plus.
//   {
//     "role": "user",
//     "content": "Your response had validation errors:\\n- value: Value must be greater than 10\\n- value2: Value must be less than 10\\nPlease fix these issues and try again."
//   },
//   ⬇️❤️‍🩹 The AI fixes the issues and returns 11 and 9. You never know it failed in your code and can happily use the correctly returned object.
//   {
//     "role": "assistant",
//     "content": [{"type": "text", "text": "{\\"value\\":11,\\"value2\\":9}"}]
//   }
// ]

console.log(object)
// { value: 11, value2: 9 }`}
                    />
                  </Expander>
                </div>
              </div>

              {/* Conversational Continuity Feature */}
              <div id="conversational" className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  Conversational Continuity - askFollowUp
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Calling <InlineCode>generateObjectPlus</InlineCode> returns an{' '}
                  <InlineCode>askFollowUp</InlineCode> function that maintains
                  conversation history and context, similar to if you use
                  ChatGPT you don&apos;t create a new chat for every message.
                  This enables natural back-and-forth interactions where the AI
                  can reference previous messages and build upon earlier
                  context.
                </p>
                <div className="bg-muted/30 rounded-xl p-1">
                  <Expander maxHeight={400}>
                    <CodeBlock
                      code={`const { object, askFollowUp } = await generateObjectPlus({
  model: openai('gpt-4o-mini'),
  schema: z.object({
    userRequirement: z.string(),
    needsMoreDetails: z.boolean(),
    suggestedQuestions: z.array(z.string())
  }),
  prompt: 'I need help building a website'
})

// First response might indicate needing more details
console.log(object)
// {
//   userRequirement: "Website development assistance requested",
//   needsMoreDetails: true,
//   suggestedQuestions: [
//     "What type of website do you want to build?",
//     "What features do you need?",
//     "Do you have a design in mind?"
//   ]
// }

// Follow up maintains conversation context
const { object: detailedPlan } = await askFollowUp({
  prompt: "It's an e-commerce site for selling handmade jewelry",
  schema: z.object({
    recommendedTech: z.array(z.string()),
    estimatedTimeframe: z.string(),
    keyFeatures: z.array(z.string())
  })
})

console.log(detailedPlan)
// {
//   recommendedTech: ["Next.js", "Stripe", "PostgreSQL", "AWS S3"],
//   estimatedTimeframe: "2-3 months",
//   keyFeatures: [
//     "Product catalog",
//     "Shopping cart",
//     "Secure payments",
//     "Admin dashboard"
//   ]
// }

// Can continue the conversation with more specifics
const { object: technicalDetails } = await askFollowUp({
  prompt: "Tell me more about the product catalog implementation",
  schema: z.object({
    databaseSchema: z.string(),
    apiEndpoints: z.array(z.string()),
    performanceConsiderations: z.array(z.string())
  })
})
`}
                    />
                  </Expander>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Installation Section */}
          <section id="installation">
            <h2 className="text-3xl font-bold mb-6">Installation</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              To use it, you can copy the code below and use it in your project.
              Self healing is enabled by default but you can customize how many
              retries it is allowed by passing maxRetries (default 5).
            </p>
            <div className="bg-muted/30 rounded-xl p-1">
              <Expander
                maxHeight={400}
                showAllText="Show full code"
                showLessText="Collapse code"
              >
                <CodeBlock code={code} />
              </Expander>
            </div>
          </section>

          <Separator />

          {/* Examples Section */}
          <section id="examples">
            <h2 className="text-3xl font-bold mb-8">Examples</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Here are some examples of how to use AI SDK Plus in practice.
            </p>

            <div className="space-y-10">
              {/* Example 1 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Return a structured object with a tool call
                </h3>
                <div className="bg-muted/30 rounded-xl p-1">
                  <Expander maxHeight={300}>
                    <CodeBlock
                      code={`const location = 'Freiburg in Germany'

const { object } = await generateObjectPlus({
  model: openai('gpt-4.1-mini'),
  schema: z.object({
    degreesInCelsius: z.number(),
    weather: z.enum(['sunny', 'cloudy', 'rainy']),
  }),
  maxSteps: 10,
  tools: {
    getWeather: {
      description: 'Get the weather for a given location',
      parameters: z.object({
        location: z.string(),
      }),
      execute: async ({ location }) => {
        // This is a mock implementation of the getWeather tool.
        // In a real world scenario, you would call an external API to get the weather.
        // For the sake of this example, we'll just return a fixed value.
        return {
          degreesInCelsius: 29,
          weather: 'sunny',
        }
      },
    },
  },
  prompt: \`What is the weather in \${location}?\`,
})

console.log(\`It is \${object.degreesInCelsius} degrees and \${object.weather} in \${location}.\`)
// It is 29 degrees and sunny in Freiburg in Germany.`}
                    />
                  </Expander>
                </div>
              </div>

              {/* Example 2 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Using askFollowUp to send a follow up
                </h3>
                <div className="bg-muted/30 rounded-xl p-1">
                  <Expander maxHeight={300}>
                    <CodeBlock
                      code={`const emails = await getEmails()

const { object: { doWeWantToSendAFollowUp }, askFollowUp } = await generateObjectPlus({
  model: openai('gpt-4.1-mini'),
  schema: z.object({
    doWeWantToSendAFollowUp: z.boolean(),
  }),
  prompt: \`Do we want to send a follow up email to clarify something?

  Emails: \${emails.join(', ')}
  \`,
})

if (doWeWantToSendAFollowUp) {
  console.log('Generating follow up email')
  // We do not need to send the emails again as it has the messages we send before still in its context.
  const { object: { followUpEmail } } = await askFollowUp({
    prompt: 'Generate a follow up email to clarify something',
    schema: z.object({
      followUpEmail: z.string(),
    }),
  })

  console.log(followUpEmail)
  await sendEmail(followUpEmail)
} else {
  console.log('No follow up needed')
}`}
                    />
                  </Expander>
                </div>
              </div>

              {/* Example 3 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Looping askFollowUp till we have enough results
                </h3>
                <div className="bg-muted/30 rounded-xl p-1">
                  <Expander maxHeight={300}>
                    <CodeBlock
                      code={`const minResults = 10
const query = 'Pizza'

const restaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
})

const restaurantsStorage = []
let askFollowUpStorage = null

const { object: restaurants, askFollowUp } = await generateObjectPlus({
  model: openai('gpt-4.1-mini'),
  prompt: \`Find me restaurants that serve \${query}\`,
  schema: z.object({
    restaurants: z.array(restaurantSchema),
  }),
  maxSteps: 10,
})

restaurantsStorage.push(...restaurants.restaurants)
askFollowUpStorage = askFollowUp

while (restaurantsStorage.length < minResults) {
  // Doesn't need maxSteps as it uses the maxSteps from the first call, same for model and tools
  const { object: restaurants } = await askFollowUpStorage({
    prompt: 'Pls find more restaurants',
    schema: z.object({
      restaurants: z.array(restaurantSchema),
    }),
  })

  restaurantsStorage.push(...restaurants.restaurants)
  askFollowUpStorage = askFollowUp
}

console.log(\`Found \${restaurantsStorage.length} restaurants\`)
console.log(restaurantsStorage)`}
                    />
                  </Expander>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Goals & Community Section */}
          <section id="community">
            <h2 className="text-3xl font-bold mb-6">Goals & Community</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                My primary goal is helping others build reliable AI solutions.
                Secondarily, I hope the AI SDK team considers incorporating some
                concepts natively. The code is largely LLM-generated and may
                contain bugs - tough I am actively using it in prod and it is
                working well - I&apos;ll update it as I find issues. Pull
                requests are welcome to help identify and fix any problems.
                Please note that I don&apos;t take responsibility if something
                doesn&apos;t work correctly in your implementation.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Clapper clapperId="ai-sdk-plus" />
    </div>
  )
}
