
export default defineNuxtRouteMiddleware(async () => {
    // Only run on client-side    
    if (import.meta.server) return
    
    const supabase = useSupabase()
    
    // First attempt to get session
    let { data } = await supabase.auth.getSession()
    console.log("Initial session check:", data)
    
    // If session is null, wait a moment and try again
    if (!data.session) {
      console.log("No session found, waiting for auth state...")
      
      // Wait for a short time to allow auth to initialize
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Try again
      const refreshResult = await supabase.auth.getSession()
      data = refreshResult.data
      console.log("Second session check:", data)
    }
    
    // Now make the redirect decision
    if (!data.session) {
      console.log("Still no session, redirecting to login")
      return navigateTo('/login')
    }
    
    console.log("Session found, user is authenticated")
})