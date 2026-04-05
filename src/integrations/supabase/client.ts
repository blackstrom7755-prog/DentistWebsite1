import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://izbdbdjrcbhbepbyrgjk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6YmRiZGpyY2JoYmVwYnlyZ2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNzcxNjEsImV4cCI6MjA5MDk1MzE2MX0.iJ5XPYohsnmGNRhUS4tGZf-vNQKK39E-nvnJpwEPo7U'
);