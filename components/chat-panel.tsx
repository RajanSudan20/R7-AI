"use client"

import { useChat } from "@ai-sdk/react"
import type { UIMessage } from "ai"
import { useEffect, useRef, useState } from "react"
import { ArrowUp, Menu, Sparkles, Square, TriangleAlert, RotateCcw } from "lucide-react"
import { ChatMessage, TypingIndicator } from "@/components/chat-message"

const SUGGESTIONS = [
  "Explain quantum computing simply",
  "Write a haiku about the ocean",
  "Give me ideas for a weekend trip",
  "Help me debug a React error",
]

type ChatPanelProps = {
  conversationId: string
  initialMessages: UIMessage[]
  onMessagesChange: (id: string, messages: UIMessage[]) => void
  onFirstMessage: (id: string, title: string) => void
  onOpenSidebar: () => void
}

export function ChatPanel({
  conversationId,
  initialMessages,
  onMessagesChange,
  onFirstMessage,
  onOpenSidebar,
}: ChatPanelProps) {
  const [input, setInput] = useState("")
  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    id: conversationId,
    messages: initialMessages,
  })

  const scrollRef = useRef<HTMLDivElement>(null)
  const isLoading = status === "submitted" || status === "streaming"

  useEffect(() => {
    onMessagesChange(conversationId, messages)
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  function submit(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    if (messages.length === 0) {
      onFirstMessage(conversationId, trimmed.slice(0, 40))
    }
    sendMessage({ text: trimmed })
    setInput("")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return
      e.preventDefault()
      submit(input)
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="size-5" />
        </button>
        <h1 className="text-sm font-semibold">AI Model</h1>
        <span className="ml-auto rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
          gpt-5-mini
        </span>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-4 text-center">
            <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Sparkles className="size-7" strokeWidth={2.5} />
            </span>
            <h2 className="text-balance text-2xl font-semibold">How can I help you today?</h2>
            <p className="mt-2 text-pretty text-sm text-muted-foreground">
              Ask me anything, or start with one of these prompts.
            </p>
            <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => submit(suggestion)}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-card-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {status === "submitted" && <TypingIndicator />}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
                <div className="flex min-w-0 flex-col gap-2">
                  <p className="text-pretty">
                    Something went wrong generating a response. This is often because the AI
                    Gateway needs a valid credit card on file to unlock free credits.
                  </p>
                  <button
                    type="button"
                    onClick={() => regenerate()}
                    className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                  >
                    <RotateCcw className="size-3.5" />
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-border px-4 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-primary/60"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Message AI Model..."
            className="max-h-40 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
              aria-label="Stop generating"
            >
              <Square className="size-4 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <ArrowUp className="size-5" strokeWidth={2.5} />
            </button>
          )}
        </form>
        <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
          AI Model can make mistakes. Check important info.
        </p>
      </div>
    </div>
  )
}
