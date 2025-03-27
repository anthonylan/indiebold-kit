interface UserMeta {
    [key: string]: any; 
}

export const useAuth = () => {
    const supabase = useSupabase()
  
    // Get current user
     const fetchUser = async () => {
       const { data, error } = await supabase.auth.getUser()      
       return { data, error: error?.message }
     }
    
      // Get current user
      const updateUser = async (payload: UserMeta) => {
        const { data, error } = await supabase.auth.updateUser({ data: payload })      
        return { data, error: error?.message }
      }
  
    // Sign up
    const signUp = async (email: string, password: string, name: string) => {
      const { data, error } = await supabase.auth.signUp({
         email, password, options: { data: { display_name: name }} 
       })
      return { data, error: error?.message }
    }
  
    // Sign in
    const signIn = async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      return { data, error: error?.message }
    }

    //send password reset email
    const requestResetLink = async (email: string) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/password/update`,
      })
      return { data, error: error?.message }
    }

     // Update the user password
     const updatePassword = async (password: string) => {
      const { data, error } = await supabase.auth.updateUser({ password })
      return { data, error: error?.message }
    }


  
    // Sign out
    const signOut = async () => {
      await supabase.auth.signOut()
    }
  
    return { fetchUser, updateUser, signUp, signIn, signOut, requestResetLink, updatePassword }
  }
  