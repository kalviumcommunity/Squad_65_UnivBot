"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Chrome, Shield, Users, Zap } from "lucide-react"

interface SignInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nonDismissible?: boolean
}

export function SignInDialog({ open, onOpenChange, nonDismissible = false }: SignInDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error("Sign in error:", error)
      setIsLoading(false)
    }
  }

  // Close dialog if user is already signed in (unless non-dismissible)
  if (session && open && !nonDismissible) {
    onOpenChange(false)
    return null
  }

  return (
    <Dialog 
      open={open} 
      onOpenChange={nonDismissible ? undefined : onOpenChange}
      modal={true}
    >
      <DialogContent 
        className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] min-w-0 sm:w-auto sm:max-w-md sm:min-w-0 mx-2 sm:mx-0 overflow-hidden" 
        showCloseButton={!nonDismissible}
        onPointerDownOutside={nonDismissible ? (e) => e.preventDefault() : undefined}
        onEscapeKeyDown={nonDismissible ? (e) => e.preventDefault() : undefined}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between min-w-0">
          <DialogTitle className="flex items-center gap-2 text-xl min-w-0">
            <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <span className="truncate">Sign In</span>
          </DialogTitle>
          {!nonDismissible && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>

        <DialogDescription className="mt-2 break-words">
          Sign in to access your personalized UnivBot experience and save your conversation history.
        </DialogDescription>

        {/* Sign In Options */}
        <div className="space-y-4 py-4">
          {/* Google Sign In Button */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            ) : (
              <Chrome className="h-5 w-5" />
            )}
            <span className="truncate">{isLoading ? "Signing in..." : "Continue with Google"}</span>
          </Button>
        </div>

        {/* Benefits Section */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-semibold text-sm">Why sign in?</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="break-words">Secure and private conversations</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <span className="break-words">Faster responses with personalized context</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-purple-500 flex-shrink-0" />
              <span className="break-words">Access to your conversation history</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 