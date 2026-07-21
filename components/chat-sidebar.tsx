"use client"

import { SquarePen, MessageSquare, Trash2, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type Conversation = {
  id: string
  title: string
}

type ChatSidebarProps = {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
  onNewChat: () => void
  onDelete: (id: string) => void
  isOpen: boolean
  onClose: () => void
}

export function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out md:static md:z-auto md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-3">
          <div className="flex items-center gap-2 px-1">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-4" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold">AI Model</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground md:hidden"
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-3 pb-2">
          <button
            type="button"
            onClick={onNewChat}
            className="flex w-full items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent"
          >
            <SquarePen className="size-4" />
            New chat
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <p className="px-2 pb-1.5 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
            Chats
          </p>
          <ul className="flex flex-col gap-0.5">
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeId
              return (
                <li key={conversation.id}>
                  <div
                    className={cn(
                      "group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(conversation.id)}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    >
                      <MessageSquare className="size-4 shrink-0 opacity-70" />
                      <span className="truncate">{conversation.title}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(conversation.id)}
                      className={cn(
                        "shrink-0 rounded p-1 text-sidebar-foreground/50 opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100",
                        isActive && "opacity-100",
                      )}
                      aria-label={`Delete ${conversation.title}`}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border px-3 py-3">
          <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold">
              U
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">You</p>
              <p className="truncate text-xs text-sidebar-foreground/50">Free plan</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
