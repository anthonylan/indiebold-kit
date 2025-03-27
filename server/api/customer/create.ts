import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const stripe = new Stripe(useRuntimeConfig().stripeSk)
  const { name, email } = await readBody(event);

  
  try {
    //prevent duplicates on stripe by looking if customer exist
    const { data } = await stripe.customers.list({ email })
    if(data.length > 0){
        return { customer: data[0].id }
    }

     //else create a new customer
    const customer = await stripe.customers.create({ name, email })
    return { customer: customer.id }

  } catch (error) {
    return { error }
  }
});