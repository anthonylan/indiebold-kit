<script setup lang="ts">
import styleSheet from '~/scripts/styleSheet';
import { purchaseOptions } from '~/scripts/data';

definePageMeta({
  middleware: ['auth']
})



const loading = ref(true)
const store  = useStore()
const isUserOnboarded = computed(() =>  !store.user?.user_metadata?.boarded)


onMounted(() => {
  loading.value = isUserOnboarded.value

  setTimeout(() => {
    loading.value = false
  }, 1000);
})



</script>

<template>
  <TopHeader title="Home" :loading="loading" />
  <ClientOnly><Navigation  /></ClientOnly>


  <!-- onboarding screen -->
   <OnboardingFlow v-if="isUserOnboarded" />



    <main v-else :class="[styleSheet.container, 'py-10']">
      <div class="flex flex-col gap-5 max-w-2xl">
        <img src="~/assets/images/ab.svg" width="200" alt="welcome">
        <h2 class="text-4xl font-bold font-title" :class="[styleSheet.title]">Welcome aboard</h2>
        <p>This is just a welcome page—nothing too serious. Feel free to explore the demo app! You can subscribe and cancel plans, create organizations, invite members, and try out all the features.</p>
        <p>For testing subscriptions, you can use any of the provided Stripe <a href="https://docs.stripe.com/testing" target="_blank" class="underline">test cards</a> during checkout.</p>

        <br>
        <h2 class="text-3xl font-bold font-title" :class="[styleSheet.title]">How to purchase?</h2>

        <p>indieBOLD offers a one-time purchase with two setup options: DIY and Developer Setup.</p>
        <ul class="flex flex-col gap-4">
          <li>
            <strong>DIY Setup:</strong> You handle everything—setting up the project, configuring environment variables, and deploying it yourself. A comprehensive documentation guide is available in the indieBOLD GitHub repository upon purchase.
            <a :href="purchaseOptions.diy.link" target="_blank" class="block my-3 text-orange-600 hover:opacity-90">{{ purchaseOptions.diy.title }} <i class="ri-arrow-right-up-long-line"></i></a>
          </li>
          <li>
            <strong>Developer Setup:</strong> If you're not technical or prefer a hassle-free setup, you can opt for the Priority Package, where I handle the setup for you. This is also a one-time purchase.
            <a :href="purchaseOptions.dev.link" target="_blank" class="block my-3 text-orange-600 hover:opacity-90">{{ purchaseOptions.dev.title }} <i class="ri-arrow-right-up-long-line"></i></a>
          </li>
        </ul>


      </div>
    </main>


</template>

