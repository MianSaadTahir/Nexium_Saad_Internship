'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! 
const supabase = createClient(supabaseUrl, supabaseKey)

export async function saveRecipe(userEmail: string, recipeText: string) {
  const { error } = await supabase
    .from('recipes')
    .insert([{ user_email: userEmail, recipe_text: recipeText }])

  if (error) {
    console.error('Supabase insert error:', error.message)
    throw new Error(error.message)
  }
}
