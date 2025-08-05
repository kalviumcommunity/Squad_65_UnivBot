"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import {
  Send,
  GraduationCap,
  Settings,
  MessageSquarePlus,
  Paperclip,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SettingsDialog } from "@/components/settings-dialog"
import { PastEventsDialog } from "@/components/past-events-dialog"
import { SignInDialog } from "@/components/sign-in-dialog"
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
        <div
          className="text-sm leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, "<br>") }}
        />
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
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  })

  const [input, setInput] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isPastEventsOpen, setIsPastEventsOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && status === "ready") {
      setIsAnimating(true)
      sendMessage({ text: input })
      setInput("")
      setSelectedFiles([])
      setTimeout(() => setIsAnimating(false), 300)

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
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
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-sm"
                onClick={() => setIsSignInOpen(true)}
              >
                Sign In
              </Button>
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
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-full text-center py-16">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-full mb-6">
                    <GraduationCap className="h-16 w-16 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-3">Welcome to UnivBot!</h2>
                  <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
                    I'm here to help you with your campus queries. Feed me info or docs for a personalized experience.
                  </p>

                </div>
              ) : (
                <div className="space-y-1">
                  {messages.map((message) => (
                    <div key={message.id}>
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          <ChatMessage key={index} message={part.text} isUser={message.role === "user"} />
                        ) : null,
                      )}
                    </div>
                  ))}
                  {status === "streaming" && <TypingIndicator />}
                </div>
              )}
            </div>
          </div>

          {/* Input Area - Fixed */}
          <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-4xl mx-auto p-4 w-full">
              {/* File Preview */}
              {selectedFiles.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg text-sm">
                      <Paperclip className="h-3 w-3" />
                      <span className="truncate max-w-32">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-destructive/20"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your question..."
                    className="min-h-[52px] max-h-[120px] resize-none rounded-2xl border-2 focus:border-blue-500 transition-all duration-200 pr-12 py-3"
                    disabled={status !== "ready"}
                    rows={1}
                  />
                  {/* Attachment Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={handleAttachmentClick}
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={!input.trim() || status !== "ready"}
                  className={cn(
                    "h-[52px] w-[52px] rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl",
                    isAnimating && "scale-95",
                    !input.trim() && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileSelect}
              />


            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      
      {/* Past Events Dialog */}
      <PastEventsDialog open={isPastEventsOpen} onOpenChange={setIsPastEventsOpen} />
      
      {/* Sign In Dialog */}
      <SignInDialog open={isSignInOpen} onOpenChange={setIsSignInOpen} />
    </div>
  )
}
