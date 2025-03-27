export const useBillingApi = () => {
    const store = useStore();
  
    // ** Fetch User Subscriptions **
    const fetchSubscriptions = async () => {
      const customer = store.user?.user_metadata?.customer;
      if (!customer) return null;
  
      return await $fetch('/api/customer/subscription', {
        method: 'POST',
        body: { customer },
      });
    };
  
    // ** Redirect User to Billing Portal **
    const usePortal = async () => {
      const customer = store.user?.user_metadata?.customer;
      if (!customer) return null;
  
      return await $fetch('/api/customer/portal', {
        method: 'POST',
        body: { customer },
      });
    };
  
    // ** Handle Subscription Checkout **
    const useCheckout = async (priceId: string) => {
      const customer = store.user?.user_metadata?.customer;
      if (!customer) return null;
  
      return await $fetch('/api/customer/subscribe', {
        method: 'POST',
        body: { customer, priceId, mode: 'subscription' },
      });
    };

     // ** Handle Subscription Update **
     const useSwitch = async (subId: string) => {
        const customer = store.user?.user_metadata?.customer;
        if (!customer) return null;
        
    
        return await $fetch('/api/customer/switch', {
          method: 'POST',
          body: { customer, subId: subId },
        });
      };
  
    return { fetchSubscriptions, usePortal, useCheckout, useSwitch };
  };
  