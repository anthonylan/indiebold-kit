import Stripe from 'stripe';
import { serverBase } from '~/server/config';


export default defineEventHandler(async (event) => {
    const { supabaseRole, stripeSk, public: { supabaseUrl } } = useRuntimeConfig()

    const stripe = new Stripe(stripeSk)
    const { uid, customer } = await readBody(event);
    const supabase = serverBase(supabaseUrl, supabaseRole)
  
  try {
    const { error } = await supabase.auth.admin.deleteUser(uid)
    if(error) return { error: error.message }


    await stripe.customers.del(customer)
    return { msg: 'Done'}

  } catch (error) {
    return { error }
  }
});