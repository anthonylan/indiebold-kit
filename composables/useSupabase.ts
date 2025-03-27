import { createClient, SupabaseClient } from '@supabase/supabase-js'
let supabase: SupabaseClient | null = null

export const useSupabase = () => {
  if (!supabase) {
    const { public: { supabaseAnonKey, supabaseUrl } } = useRuntimeConfig()    
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabase
}





