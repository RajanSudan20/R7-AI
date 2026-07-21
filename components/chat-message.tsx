import type { UIMessage } from "ai"
import { AiAvatar, UserAvatar } from "@/components/ai-avatar"
import { cn } from "@/lib/utils"

export function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user"

  const text = message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")

  return (
    <div
      className={cn(
        "flex w-full gap-3 md:gap-4",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {isUser ? <UserAvatar /> : <AiAvatar />}
      <div
        className={cn(
          "flex min-w-0 max-w-[85%] flex-col gap-1",
          isUser ? "items-end" : "items-start",
        )}
      >
        <span className="px-1 text-xs font-medium text-muted-foreground">
          {isUser ? "You" : "AI Model"}
        </span>
        <div
          className={cn(
            "whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm bg-card text-card-foreground",
          )}
        >
          {text || "\u2026"}
        </div>
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex w-full gap-3 md:gap-4">
      <AiAvatar />
      <div className="flex flex-col gap-1">
        <span className="px-1 text-xs font-medium text-muted-foreground">AI Model</span>
        <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-card px-4 py-3.5">
          <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
          <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
          <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60" />
        </div>
      </div>
    </div>
  )
}
