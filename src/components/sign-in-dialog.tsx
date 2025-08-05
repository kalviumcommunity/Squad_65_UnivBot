"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Chrome, Shield, Users, Zap } from "lucide-react"

interface SignInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignInDialog({ open, onOpenChange }: SignInDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    // TODO: Implement Google OAuth
    console.log("Google sign-in clicked")
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[calc(100vw-3rem)] sm:w-auto max-w-[calc(100vw-3rem)] sm:max-w-md" showCloseButton={false}>
        {/* Header with Close Button */}
        <div className="flex items-center justify-between">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            Sign In
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <DialogDescription className="mt-2">
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
            {isLoading ? "Signing in..." : "Continue with Google"}
          </Button>


        </div>

        {/* Benefits Section */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-semibold text-sm">Why sign in?</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure and private conversations</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-blue-500" />
              <span>Faster responses with personalized context</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-purple-500" />
              <span>Access to your conversation history</span>
            </div>
          </div>
        </div>


      </DialogContent>
    </Dialog>
  )
} 