import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.')
  // Create a dummy client to prevent crashes during development
  supabase = {
    from: () => ({
      select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }),
      insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      upsert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }) }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) })
    })
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }