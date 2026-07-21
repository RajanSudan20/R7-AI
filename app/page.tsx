"use client"

import type { UIMessage } from "ai"
import { useCallback, useRef, useState } from "react"
import { ChatSidebar, type Conversation } from "@/components/chat-sidebar"
import { ChatPanel } from "@/components/chat-panel"

function createId() {
  return Math.random().toString(36).slice(2, 10)
}

export default function Page() {
  const firstId = useRef(createId())
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: firstId.current, title: "New chat" },
  ])
  const [activeId, setActiveId] = useState(firstId.current)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Persist messages per conversation so switching keeps history.
  const messagesStore = useRef<Record<string, UIMessage[]>>({})

  const handleMessagesChange = useCallback((id: string, messages: UIMessage[]) => {
    messagesStore.current[id] = messages
  }, [])

  const handleFirstMessage = useCallback((id: string, title: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title } : c)),
    )
  }, [])

  const handleNewChat = useCallback(() => {
    const id = createId()
    setConversations((prev) => [{ id, title: "New chat" }, ...prev])
    setActiveId(id)
    setSidebarOpen(false)
  }, [])

  const handleSelect = useCallback((id: string) => {
    setActiveId(id)
    setSidebarOpen(false)
  }, [])

  const handleDelete = useCallback(
    (id: string) => {
      delete messagesStore.current[id]
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id)
        if (next.length === 0) {
          const newId = createId()
          setActiveId(newId)
          return [{ id: newId, title: "New chat" }]
        }
        if (id === activeId) {
          setActiveId(next[0].id)
        }
        return next
      })
    },
    [activeId],
  )

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelect}
        onNewChat={handleNewChat}
        onDelete={handleDelete}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex min-w-0 flex-1 flex-col">
        <ChatPanel
          key={activeId}
          conversationId={activeId}
          initialMessages={messagesStore.current[activeId] ?? []}
          onMessagesChange={handleMessagesChange}
          onFirstMessage={handleFirstMessage}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
      </main>
    </div>
  )
}
