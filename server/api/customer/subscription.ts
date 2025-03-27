import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const { customer } = await readBody(event);
  const stripe = new Stripe(useRuntimeConfig().stripeSk)
  
  
  try {
      const subscriptions = await stripe.subscriptions.list({ customer })

      return { subscriptions }
  } catch (error) {
      return {  error }
  }
});