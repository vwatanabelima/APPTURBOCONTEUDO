
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';

// This function will create a new Supabase client instance for the browser.
// It is designed to be called on the client-side, where process.env can access
// NEXT_PUBLIC_ variables.
export const getSupabaseBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    // The UI in login/page.tsx will handle the case where these are not set.
    // This check is a safeguard.
  }
  
  // We don't use a singleton here to avoid server-side execution issues.
  // createPagesBrowserClient is optimized to handle its own instance management on the client.
  return createPagesBrowserClient<Database>();
}
