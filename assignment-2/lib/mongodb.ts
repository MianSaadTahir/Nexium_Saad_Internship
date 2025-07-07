import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Declare global type for mongoose cache
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

// Cache the connection
let cached = global.mongooseCache

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

// Blog Content Schema
const BlogContentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: ''
  },
  publishedDate: {
    type: Date,
    default: null
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  },
  wordCount: {
    type: Number,
    default: 0
  },
  metadata: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
})

// Create or get the model
const BlogContent = mongoose.models.BlogContent || mongoose.model('BlogContent', BlogContentSchema)

export interface BlogContentType {
  _id?: string
  url: string
  title: string
  content: string
  author?: string
  publishedDate?: Date
  scrapedAt?: Date
  wordCount?: number
  metadata?: Record<string, any>
}

// Function to save full blog content to MongoDB
export async function saveBlogContent(blogData: BlogContentType) {
  try {
    await connectToDatabase()
    
    // Calculate word count
    const wordCount = blogData.content.split(/\s+/).length
    
    const blogContent = new BlogContent({
      ...blogData,
      wordCount
    })

    const result = await blogContent.save()
    return result
  } catch (error) {
    console.error('Error saving to MongoDB:', error)
    throw error
  }
}

// Function to get blog content by URL
export async function getBlogContentByUrl(url: string) {
  try {
    await connectToDatabase()
    const result = await BlogContent.findOne({ url })
    return result
  } catch (error) {
    console.error('Error fetching from MongoDB:', error)
    throw error
  }
}

// Function to get all blog contents
export async function getAllBlogContents() {
  try {
    await connectToDatabase()
    const results = await BlogContent.find({}).sort({ scrapedAt: -1 })
    return results
  } catch (error) {
    console.error('Error fetching all from MongoDB:', error)
    throw error
  }
}

export { BlogContent }