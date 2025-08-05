import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/univbot'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// Simple connection caching
let cachedConnection: typeof mongoose | null = null
let connectionPromise: Promise<typeof mongoose> | null = null

async function dbConnect() {
  // Return existing connection if available
  if (cachedConnection) {
    return cachedConnection
  }

  // Create new connection if no promise exists
  if (!connectionPromise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
    }

    connectionPromise = mongoose.connect(MONGODB_URI, opts)
  }
  
  try {
    cachedConnection = await connectionPromise
    console.log('✅ Connected to MongoDB with connection pooling')
    return cachedConnection
  } catch (error) {
    connectionPromise = null
    throw error
  }
}

export default dbConnect 