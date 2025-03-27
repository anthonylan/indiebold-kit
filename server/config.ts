
import { table as PricingTable } from '~/scripts/data';
import { createClient } from '@supabase/supabase-js'

const createPortalConfig = (clientBaseUrl: string) => {
    return {
        business_profile: {
            privacy_policy_url: `${clientBaseUrl}/privacy`,
            terms_of_service_url: `${clientBaseUrl}/privacy`,
          },
          features: {
            customer_update: {
              allowed_updates: ['name', 'address'],
              enabled: true,
            },
            invoice_history: { enabled: true },
            payment_method_update: { enabled: true },
            subscription_cancel: { 
              enabled: true,
              cancellation_reason:{
                enabled: true,
                options: ['missing_features', 'other', 'switched_service', 'too_expensive', 'unused']
              }
            },
            subscription_update: {
              enabled: true,
              default_allowed_updates: ['price', 'promotion_code'],
              products: PricingTable.map((item) => {
                return {
                  prices: item.prices.map((price: string) => price),
                  product: item.product
                }
              })
            },
          },
    }
}



const serverBase = (supabaseUrl:string, supabaseRole: string) => {
  const supabase = createClient(supabaseUrl, supabaseRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  return supabase
}




export { createPortalConfig, serverBase }