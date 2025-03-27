import Stripe from 'stripe';
import { createPortalConfig } from '~/server/config';


export default defineEventHandler(async (event) => {
    const { stripeSk, public: { clientBaseUrl } } = useRuntimeConfig()
    const stripe = new Stripe(stripeSk);
    const { customer, subId } = await readBody(event);
    
    try {
      // docs: https://docs.stripe.com/api/customer_portal/configurations/create
      const config = createPortalConfig(clientBaseUrl) as any
      const portalConfig = await stripe.billingPortal.configurations.create(config);
     
      //docs: https://docs.stripe.com/api/customer_portal/sessions/create
      const session = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${clientBaseUrl}/settings/billing`,
        configuration: portalConfig.id,
        flow_data: {
            type: 'subscription_update',
            subscription_update: {
                subscription: subId 
            }
        }
      });

      return { url: session.url };
    } catch (error) {    
      return { error };
    }
  });
  