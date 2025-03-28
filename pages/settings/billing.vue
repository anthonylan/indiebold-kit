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

const handleTabs = (status: string) => {
  keys.value.cycle = status;
};

const fetchData = async () => {
  const response = await fetchSubscriptions() as any
  if (!response) return;

  subs.value = response.subscriptions.data;
  defSub.value = subs.value.length > 0 ? subs.value[0] : null;

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

<TopHeader title="User billing" :loading="keys.loader" />



<main :class="[styleSheet.container]" @click="closeAllMenus()">

  <!-- Non organization oner -->
  <section class="max-w-2xl" v-if="store.userLevel?.role > 0">
    <div class="flex my-2 p-3 border" :class="[styleSheet.card]">
        <p>This page is blank because you are not the owner of this organization. To manage billing, please switch or create your own organization.</p>
    </div>
  </section>

 <section class="max-w-2xl" v-else>
  <!-- subscription -->
    <div class="flex flex-col">
      <h2 class="text-lg">{{  defaultSub?.name ? `Your subscription is active, and you're all set!` : `You’re not subscribed to a plan yet`  }}</h2>
      <h2 class="text-lg">{{ defaultSub?.name ? `Enjoy uninterrupted access to all our features, so cool don't you think?` : 'Start your subscription to continue using bold.' }}</h2>
    </div>

    <div class="p-0 mt-5" v-if="defaultSub?.name">
      <div class="flex flex-col gap-5 p-5 border" :class="[styleSheet.card]">
        <div class="flex items-end flex-col md:flex-row">
          <div class="flex gap-10 flex-1">
          <div class="flex flex-col gap-1" v-for="(item, index) in subGrid">
            <p class="text-sm capitalize" :class="[styleSheet.hl]">{{ item.title }}</p>
            <p class="text-md">{{ item?.value }}</p>
          </div>
        </div>
        <div class="flex justify-end w-full md:w-auto pt-4">
          <ButtonBase variant="primary" icon="ri-money-dollar-circle-line" :loading="loading" @click="handlePortal" class="w-full">Manage</ButtonBase>
        </div>
        </div>
      </div>
    </div>




  <!-- Pricing -->    
    <div class="grid grid-cols-1  gap-6 mt-6">
        <div class="flex flex-col gap-2 p-4 rounded-lg border " :class="[styleSheet.card]" v-for="item in table">
            <div class="flex md:items-center flex-col md:flex-row gap-2">
                <h2 class="text-xl font-medium flex-1 ">{{ item.name }}</h2>
                <div class="flex" v-if="item.prices.length > 1">
                  <ButtonTabs :tabs="['Pay monthly', 'Pay yearly']" v-model="keys.cycle" @change="handleTabs" />
                </div>
            </div>
            <div class="flex items-center gap-1 mt-3 " :class="[styleSheet.title]">
                <span class="text-sm">$</span>
                <h1 class="font-bold text-3xl">{{ item.costs.length == 1 ? item.costs[0] : item.costs[billingCycle] }} </h1>
                <span class="text-sm font-medium">/month</span>
            </div>
            <p class=" max-w-md">{{ item.desc }}</p>
          
            <h2 class="text-sm font-medium mt-5 ">Everything included:</h2>
            <ul>
                <li class="flex mt-2 gap-2 text-sm " v-for="feat in item.features">
                    <i class="ri-checkbox-circle-line"></i> <span>{{ feat }}</span>
                </li>
            </ul>
            <div class="flex flex-col mt-3">
                <ClientOnly>
                    <ButtonBase v-if="subs.length > 0"  variant="secondary" :loading="loading" :disabled="activeSub(item)" @click="handleSwitch">
                      {{ activeSub(item) ? `Current` : `Update`  }} plan
                    </ButtonBase>
                    <ButtonBase  v-else  variant="secondary" icon="ri-money-dollar-circle-line"  :loading="loading" 
                      @click="handleCheckout(item.prices.length == 1 ? item.prices[0] : item.prices[billingCycle])"> Subscribe to {{  item.name }}
                    </ButtonBase>
                </ClientOnly>
            </div>
          </div>
        </div>

    </section>
   </main>
</template>