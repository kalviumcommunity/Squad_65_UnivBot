// Chat API temporarily disabled - focus on authentication flow
// Uncomment when ready to implement chat functionality

/*
import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await dbConnect()
    
    const { messages }: { messages: UIMessage[] } = await req.json()

    const result = streamText({
      model: openai("gpt-4o"),
      system: `You are UnivBot, a helpful AI assistant for university students. You help with:
      - Academic queries and doubts
      - Exam schedules and information  
      - Lab booking assistance
      - Faculty contact information
      - Campus resources and facilities
      - Study tips and academic guidance
      
      Be friendly, concise, and helpful. Use emojis occasionally to make responses more engaging. 
      Always try to provide practical solutions and direct students to appropriate resources when needed.
      You can use basic HTML formatting like <strong>, <em>, and <a> tags for rich text responses.
      Keep responses conversational and student-friendly.`,
      messages: convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
*/
