import Stripe from 'stripe';

export default defineEventHandler(async (event) => {  
  const { stripeSk, public: { clientBaseUrl } } = useRuntimeConfig()

  const stripe = new Stripe(stripeSk)
  const { customer, priceId, mode } = await readBody(event)
  
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${clientBaseUrl}/settings/billing`,
      cancel_url:`${clientBaseUrl}/settings/billing`,
      customer,
      mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    })

    return { url: session.url };
  } catch (error) {    
    return { error }
  }
});