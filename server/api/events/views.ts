
import { serverBase } from "~/server/config";

export default defineEventHandler(async (event) => {
  const { supabaseRole, public: { supabaseUrl } } = useRuntimeConfig()
  const supabase = serverBase(supabaseUrl, supabaseRole)

    try {
       const { user_id, views } =  await readBody(event);

       const { data: old, error: oldErr } = await supabase.from('events').select('*').eq('user_id', user_id).single()
       const pastViews = old?.views
       const newViews = [...pastViews, ...views]
       console.log(newViews, oldErr);
       
       
       const { data, error } = await supabase.from('events').upsert({ user_id, views, last_activity: Date.now() }).select()
       console.log(error);
       
        
      return { data, error }
    } catch (error) {
      return { error }
    }
  });