import { NextRequest, NextResponse } from 'next/server'
import { scrapeBlogContent } from '@/lib/scraper'
import { generateEnhancedSummary } from '@/lib/aiSummary'
import { translateSummaryToUrdu } from '@/lib/translator'
import { saveBlogSummary } from '@/lib/supabase'
import { saveBlogContent } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    console.log('Processing URL:', url)

    // Step 1: Scrape blog content
    const scrapedData = await scrapeBlogContent(url)
    console.log('Scraped data:', { title: scrapedData.title, contentLength: scrapedData.content.length })

    // Step 2: Generate AI summary
    const aiSummary = generateEnhancedSummary(scrapedData.content, scrapedData.title)
    console.log('AI Summary generated:', { sentiment: aiSummary.sentiment, readingTime: aiSummary.readingTime })

    // Step 3: Translate summary to Urdu
    const urduSummary = translateSummaryToUrdu(aiSummary.summary)
    console.log('Urdu translation completed')

    // Step 4: Save to databases
    try {
      // Save full content to MongoDB
      const mongoResult = await saveBlogContent({
        url: url,
        title: scrapedData.title,
        content: scrapedData.content,
        author: scrapedData.author,
        publishedDate: scrapedData.publishedDate ? new Date(scrapedData.publishedDate) : undefined,
        metadata: scrapedData.metadata
      })
      console.log('Saved to MongoDB:', mongoResult._id)

      // Save summary to Supabase
      const supabaseResult = await saveBlogSummary({
        url: url,
        title: scrapedData.title,
        summary: aiSummary.summary,
        summary_urdu: urduSummary
      })
      console.log('Saved to Supabase:', supabaseResult)

    } catch (dbError) {
      console.error('Database error:', dbError)
      // Continue even if database save fails
    }

    // Return response
    return NextResponse.json({
      success: true,
      data: {
        url,
        title: scrapedData.title,
        author: scrapedData.author,
        publishedDate: scrapedData.publishedDate,
        originalContent: scrapedData.content,
        summary: {
          english: aiSummary.summary,
          urdu: urduSummary,
          keyPoints: aiSummary.keyPoints,
          readingTime: aiSummary.readingTime,
          sentiment: aiSummary.sentiment
        },
        metadata: scrapedData.metadata
      }
    })

  } catch (error) {
    console.error('Summarization error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process blog URL',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle GET request to return API information
export async function GET() {
  return NextResponse.json({
    message: 'Blog Summarizer API',
    endpoints: {
      POST: '/api/summarize - Summarize a blog post from URL'
    },
    usage: {
      method: 'POST',
      body: {
        url: 'https://example.com/blog-post'
      }
    }
  })
}