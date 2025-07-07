import { NextResponse } from 'next/server'
import { getAllSummaries } from '@/lib/supabase'

export async function GET() {
  try {
    const summaries = await getAllSummaries()
    
    return NextResponse.json({
      success: true,
      data: summaries,
      count: summaries?.length || 0
    })
  } catch (error) {
    console.error('Error fetching summaries:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch summaries',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}