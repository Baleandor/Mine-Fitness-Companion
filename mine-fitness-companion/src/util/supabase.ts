import { createClient } from '@supabase/supabase-js'


export const supabase = createClient(
    'https://quydiknawtvporagkwoj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eWRpa25hd3R2cG9yYWdrd29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4NzgyODYsImV4cCI6MjAwNjQ1NDI4Nn0.LboXHJMD0hVskxcOrmweVDK9WFkcZE7b1787SsMt2BM'
)