<script setup lang="ts">
definePageMeta({ middleware: ['auth'] });

import { table } from '~/scripts/data';
import styleSheet from '~/scripts/styleSheet';
import { closeAllMenus } from '#imports';

const store = useStore();
const { fetchSubscriptions, usePortal, useCheckout, useSwitch } = useBillingApi();

const subs = ref<any[]>([]);
const defSub = ref<any | null>(null);
const defaultSub = ref<any | null>(null);
const subGrid = ref<{ title: string; value: string }[]>([]);
const loading = ref(false);
const keys = ref({ cycle: 'Pay monthly', loader: true });
const billingCycle = computed(() => (keys.value.cycle === 'Pay monthly' ? 0 : 1));
const planSelect = ref(table[0].prices[0])

const handleTabs = (status: string) => {
  keys.value.cycle = status;
};

const fetchData = async () => {
  const response = await fetchSubscriptions() as any
  if (!response) return;

  subs.value = response.subscriptions.data;
  defSub.value = subs.value.length > 0 ? subs.value[0] : null;
  planSelect.value = defSub.value?.plan?.id

  if (defSub.value?.id) {
    defaultSub.value = table.find((item) => item.prices.includes(defSub.value?.plan?.id));
    const { current_period_end, plan } = defSub.value;
    subGrid.value = [
      { title: 'Plan', value: defaultSub.value?.name ?? 'N/A' },
      { title: 'Cost', value: `$${(plan.amount / 100).toFixed(2)}/${plan.interval}` },
      { title: 'Renewal', value: new Date(current_period_end * 1000).toLocaleDateString() },
    ];
  }
};



const handleAction = async (action: Function, ...params: any[]) => {
  loading.value = true;
  const response = await action(...params) as any;  
  if (response?.url) location.href = response.url;
};

const handlePortal = async () => handleAction(usePortal);
const handleCheckout = async (priceId: string) => handleAction(useCheckout, priceId);
const handleSwitch = async () => handleAction(useSwitch, subs.value[0].id);


const activeSub = (item: any) => subs.value.some((sub) => item.prices.includes(sub?.plan?.id));

watchEffect(() => {
  if (store.user?.user_metadata?.customer) {
    fetchData();
    keys.value.loader = false
  }
});
</script>


<template>

<ClientOnly><Navigation /></ClientOnly>

<TopHeader title="Billing" :loading="keys.loader" />



<main :class="[styleSheet.container]" @click="closeAllMenus()">

  <!-- Non organization oner -->
  <section class="max-w-2xl" v-if="store.userLevel?.role > 0">
    <div class="flex my-2 p-3 border" :class="[styleSheet.card]">
        <p>This page is blank because you are not the owner of this organization. To manage billing, please switch or create your own organization.</p>
    </div>
  </section>

 <section class="max-w-2xl" v-else>
 
    <!-- subscription -->
    <div class="mb-10" v-if="defaultSub?.name">
      <div class="p-4 border" :class="[styleSheet.card, styleSheet.border]">
        <div class="flex gap-3 mb-4">
          <div class="size-12 flex items-center justify-center bg-[#bee0ef] text-black rounded-full">
            <i class="ri-vip-crown-2-fill text-xl"></i>
          </div>
        <div class="flex flex-col flex-1 gap-0.5">
           <div class="flex gap-2">
            <span class="font-bold font-title text-xl">{{ defaultSub.name }} plan</span>
             <div><span :class="[styleSheet.umenu.tag, 'capitalize p-0.5']">{{ defSub.status }}</span></div>
           </div>
           <p class="text-gray-500">
            Billing <span class="capitalize">{{ defSub.plan.interval }}ly</span> &#183; 
            Next invoice on {{ dayjs(defSub?.current_period_end * 1000).format('MMM DD') }} for ${{ (defSub?.plan.amount / 100).toFixed(2) }}
          </p>
        </div>
       </div>
       <ButtonBase variant="secondary" icon="ri-money-dollar-circle-line" :loading="loading" @click="handlePortal" class="w-full">Manage subscription</ButtonBase>
      </div>
    </div>



  <!-- Pricing -->    
   <div class="flex items-center my-5">
     <h3 class="flex-1 text-2xl font-bold font-title">Select plan</h3>
     <div class="flex">
        <ButtonTabs :tabs="['Pay monthly', 'Pay yearly']" v-model="keys.cycle" @change="handleTabs" />
      </div>
    </div>

   <div class="grid grid-cols-1  -space-y-2">
      <div class="flex flex-col gap-2 border" 
        :class="[styleSheet.card, styleSheet.border]" 
        :style="[item.prices.includes(planSelect) ? 'width:calc(100% + 10px); transform:translateX(-5px)' : '']" v-for="item in table">
           
            <div class="flex flex-col  cursor-pointer group p-4" @click="planSelect = item.prices[0]">
              <div class="flex">
                <h2 class="flex-1">{{ item.name }}</h2>
                <span class="size-4 rounded-full relative border group-hover:bg-gray-200" :class="[styleSheet.border]">
                  <i v-if="item.prices.includes(planSelect)" class="ri-checkbox-circle-fill absolute top-[50%] -translate-y-[50%]"></i>
                </span>
              </div>
              <div class="flex items-center gap-1 font-title" :class="[styleSheet.title]">
                <h1 class="font-bold text-3xl">${{ item.costs.length == 1 ? item.costs[0] : item.costs[billingCycle] }} </h1>
                <span class="text-md font-medium">/ month</span>
              </div>
            </div>

            <div v-if="item.prices.includes(planSelect)" class="p-4 pt-0">
               <div class="flex menu-separator"></div>
               <p class="max-w-md mb-5 mt-7">{{ item.desc }}</p>

              <ul class="grid grid-cols-2">
                <li class="flex items-center gap-2 text-sm " v-for="feat in item.features">
                    <i class="ri-check-line text-xl"></i> <span>{{ feat }}</span>
                </li>
             </ul>
             <div class="flex flex-col mt-5">
                <ClientOnly>
                    <ButtonBase v-if="subs.length > 0"  variant="primary" :loading="loading" :disabled="activeSub(item)" @click="handleSwitch">
                      {{ activeSub(item) ? `Current` : `Switch`  }} plan
                    </ButtonBase>
                    <ButtonBase  v-else  variant="primary"  :loading="loading" 
                      @click="handleCheckout(item.prices.length == 1 ? item.prices[0] : item.prices[billingCycle])"> Subscribe to {{  item.name }}
                    </ButtonBase>
                </ClientOnly>
            </div>
           </div>
          </div>
        </div>

    </section>
   </main>
</template>