import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase initialization
// These will be automatically picked up from your .env file or Vercel environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://izbdbdjrcbhbepbyrgjk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6YmRiZGpyY2JoYmVwYnlyZ2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNzcxNjEsImV4cCI6MjA5MDk1MzE2MX0.iJ5XPYohsnmGNRhUS4tGZf-vNQKK39E-nvnJpwEPo7U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);