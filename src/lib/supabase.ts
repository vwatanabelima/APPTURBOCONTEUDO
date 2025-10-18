
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';

// Check if the environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are not set. Authentication and database features will be disabled.");
}

// Initialize the Supabase client.
// It is safe to initialize it even if the variables are not set,
// as the client will not be able to connect and subsequent calls will fail gracefully.
export const supabase = createPagesBrowserClient<Database>({
  supabaseUrl,
  supabaseKey: supabaseAnonKey
});
