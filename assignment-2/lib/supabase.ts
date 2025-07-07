import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types for our database
export interface BlogSummary {
  id?: string
  url: string
  title: string
  summary: string
  summary_urdu: string
  created_at?: string
}

// Function to save summary to Supabase
export async function saveBlogSummary(data: BlogSummary) {
  try {
    const { data: result, error } = await supabase
      .from('blog_summaries')
      .insert([
        {
          url: data.url,
          title: data.title,
          summary: data.summary,
          summary_urdu: data.summary_urdu,
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return result
  } catch (error) {
    console.error('Error saving to Supabase:', error)
    throw error
  }
}

// Function to get all summaries
export async function getAllSummaries() {
  try {
    const { data, error } = await supabase
      .from('blog_summaries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching from Supabase:', error)
    throw error
  }
}