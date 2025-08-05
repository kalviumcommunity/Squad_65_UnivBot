"use client"

import type React from "react"

import { useState, useRef} from "react"
import { useSession } from "next-auth/react"
import {
  Send,
  GraduationCap,
  Settings,
  Paperclip,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SettingsDialog } from "@/components/settings-dialog"
import { PastEventsDialog } from "@/components/past-events-dialog"
import { SignInDialog } from "@/components/sign-in-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

function ChatMessage({ message, isUser }: { message: string; isUser: boolean }) {
  return (
    <div className={cn("flex w-full mb-6 animate-fadeIn", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-sm transition-all duration-200",
          isUser
            ? "bg-blue-500 text-white rounded-br-md ml-4"
            : "bg-muted/80 text-foreground rounded-bl-md mr-4 border border-border/50",
        )}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6">
      <div className="bg-muted/80 px-4 py-3 rounded-2xl rounded-bl-md border border-border/50">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const { data: session, status: sessionStatus } = useSession()
  // Chat functionality temporarily disabled
  // const { messages, sendMessage, status: chatStatus } = useChat({
  //   transport: new DefaultChatTransport({
  //     api: "/api/chat",
  //   }),
  // })

  const [input, setInput] = useState("")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isPastEventsOpen, setIsPastEventsOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  // useEffect(() => {
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  //   }
  // }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Chat functionality temporarily disabled
    // if (input.trim() && chatStatus === "ready") {
    //   setIsAnimating(true)
    //   sendMessage({ text: input })
    //   setInput("")
    //   setSelectedFiles([])
    //   setTimeout(() => setIsAnimating(false), 300)

    //   // Reset textarea height
    //   if (textareaRef.current) {
    //     textareaRef.current.style.height = "auto"
    //   }
    // }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)

    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)
  }

  const handleAttachmentClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    setSelectedFiles((files) => files.filter((_, i) => i !== index))
  }

  // Show loading state while checking authentication
  if (sessionStatus === "loading") {
    return (
      <div className="flex h-screen w-full bg-background items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-full mb-4">
              <GraduationCap className="h-16 w-16 text-blue-500 animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">🎓 UnivBot</h2>
            <p className="text-muted-foreground mb-4">Your Campus Assistant</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Preparing your personalized experience...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden border-t">
        {/* Top Navbar*/}
        <header className="flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between p-2 pl-6 pr-10">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold flex items-center gap-2">🎓 UnivBot</h1>
                <p className="text-sm text-muted-foreground">Your Campus Assistant</p>
              </div>
            </div>
            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              {session?.user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted/50">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                      <AvatarFallback className="text-xs">
                        {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden sm:block">
                      {session.user.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-sm"
                    onClick={() => setIsPastEventsOpen(true)}
                  >
                    Past Events
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-sm"
                    onClick={() => setIsPastEventsOpen(true)}
                  >
                    Past Events
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Chat Area - Scrollable */}
        <div className="flex-1 flex flex-col min-h-0">
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
          >
            <div className="max-w-4xl mx-auto w-full">
              {session?.user ? (
                // Show chat interface for authenticated users
                <div className="flex flex-col items-center justify-center min-h-full text-center py-16">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-full mb-6">
                    <GraduationCap className="h-16 w-16 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-3">Welcome {session.user.name}!</h2>
                  <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
                    I'm here to help you with your campus queries. Chat functionality will be enabled soon.
                  </p>
                </div>
              ) : (
                // Show welcome message for unauthenticated users
                <div className="flex flex-col items-center justify-center min-h-full text-center py-16">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-full mb-6">
                    <GraduationCap className="h-16 w-16 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-3">Welcome to UnivBot!</h2>
                  <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
                    I'm here to help you with your campus queries. Please sign in to get started.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Input Area - Disabled */}
          <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-4xl mx-auto p-4 w-full">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={session?.user ? "Chat functionality coming soon..." : "Sign in to start chatting..."}
                    className="min-h-[52px] max-h-[120px] resize-none rounded-2xl border-2 focus:border-blue-500 transition-all duration-200 pr-12 py-3"
                    disabled={true}
                    rows={1}
                  />
                  {/* Attachment Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={handleAttachmentClick}
                    disabled={true}
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={true}
                  className="h-[52px] w-[52px] rounded-2xl bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      
      {/* Past Events Dialog */}
      <PastEventsDialog open={isPastEventsOpen} onOpenChange={setIsPastEventsOpen} />

      {/* Sign In Dialog - Show as overlay when not authenticated */}
      {sessionStatus === "unauthenticated" && (
        <SignInDialog open={true} onOpenChange={() => {}} nonDismissible={true} />
      )}
    </div>
  )
}
