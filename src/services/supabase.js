
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://wzwnumuaknyeywkrgdnu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6d251bXVha255ZXl3a3JnZG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwMTAxOTksImV4cCI6MjAwOTU4NjE5OX0.pt8SXk-XYHKNNIWscCx5zFook3peccuSGk8LnwA97bk'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;