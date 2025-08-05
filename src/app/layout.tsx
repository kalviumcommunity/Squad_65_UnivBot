import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "UnivBot - Your Campus Doubt Solver",
  description:
    "AI-powered chatbot to help university students with academic queries, exam schedules, and campus resources.",
  keywords: ["university", "chatbot", "AI", "campus", "student", "academic"],
  authors: [{ name: "UnivBot Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="univbot-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
