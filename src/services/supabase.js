import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://rjmozhgozrjujsitpwhx.supabase.co'
const supabaseKey =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqbW96aGdvenJqdWpzaXRwd2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNDA2NjAsImV4cCI6MjAyNDYxNjY2MH0.r6ms8aP8J74stFpM-bLpU4ZSv-Ox3MeNBK1i2qqZkHc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
