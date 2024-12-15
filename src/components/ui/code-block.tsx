'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import * as React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneLight,
  shadesOfPurple,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
  code: string
  language?: string
  className?: string
  showLineNumbers?: boolean
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ code, language = 'tsx', className, showLineNumbers = false }, ref) => {
    const [isCopied, setIsCopied] = React.useState(false)

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }

    // Customize theme based on dark/light mode
    const lightStyle = {
      ...oneLight,
      'pre[class*="language-"]': {
        ...oneLight['pre[class*="language-"]'],
        backgroundColor: 'transparent',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'calc(var(--radius) - 2px)',
      },
      'code[class*="language-"]': {
        ...oneLight['code[class*="language-"]'],
        backgroundColor: 'transparent',
      },
      'span[class*="token"]': {
        backgroundColor: 'transparent !important',
      },
    }

    const darkStyle = {
      ...shadesOfPurple,
      'pre[class*="language-"]': {
        ...shadesOfPurple['pre[class*="language-"]'],
        backgroundColor: 'transparent',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'calc(var(--radius) - 2px)',
      },
      'code[class*="language-"]': {
        ...shadesOfPurple['code[class*="language-"]'],
        backgroundColor: 'transparent',
      },
      'span[class*="token"]': {
        backgroundColor: 'transparent !important',
      },
    }

    return (
      <div ref={ref} className={cn('w-full rounded-lg bg-muted', className)}>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="text-sm text-muted-foreground">
            {language.toUpperCase()}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <div className="dark:hidden">
            <SyntaxHighlighter
              language={language}
              style={lightStyle}
              showLineNumbers={showLineNumbers}
              customStyle={{
                margin: 0,
                padding: '16px',
                paddingTop: '0px',
                background: 'transparent',
                fontSize: '14px',
                borderRadius: '0px',
                border: 'none',
              }}
              lineNumberStyle={{
                minWidth: '2.5em',
                paddingRight: '1em',
                color: 'hsl(var(--muted-foreground))',
                textAlign: 'right',
              }}
            >
              {code.trim()}
            </SyntaxHighlighter>
          </div>
          <div className="hidden dark:block">
            <SyntaxHighlighter
              language={language}
              style={darkStyle}
              showLineNumbers={showLineNumbers}
              customStyle={{
                margin: 0,
                padding: '16px',
                paddingTop: '0px',
                background: 'transparent',
                fontSize: '14px',
                borderRadius: '0px',
                border: 'none',
              }}
              lineNumberStyle={{
                minWidth: '2.5em',
                paddingRight: '1em',
                color: 'hsl(var(--muted-foreground))',
                textAlign: 'right',
              }}
            >
              {code.trim()}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    )
  }
)
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
