import { Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function AiAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm",
        className,
      )}
      aria-hidden="true"
    >
      <Sparkles className="size-4" strokeWidth={2.5} />
    </div>
  )
}

export function UserAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <User className="size-4" />
    </div>
  )
}
