import { serverBase } from '~/server/config';


// Access auth admin api
export default defineEventHandler(async (event) => {
    const { memberIds } = await readBody(event);
    const { supabaseRole, public: { supabaseUrl } } = useRuntimeConfig()
    const supabase = serverBase(supabaseUrl, supabaseRole)

    try {
      const teamMembers = [] as any

      await Promise.all(memberIds.map(async (id: string) => {
        const { data, error } = await supabase.auth.admin.getUserById(id)
        teamMembers.push(data.user)
      }))

      return { teamMembers: teamMembers }
    } catch (error) {
      return { error }
    }
});