<script setup lang="ts">
import styleSheet from '~/scripts/styleSheet';

definePageMeta({
  middleware: ['auth']
})



const loading = ref(true)
const store  = useStore()
const isUserOnboarded = computed(() => {
  return !store.user?.user_metadata?.boarded || store.organizations.length == 0
})


onMounted(() => {
  store.syncOrgs()

  loading.value = isUserOnboarded.value

  setTimeout(() => {
    loading.value = false
  }, 500);
})





</script>

<template>
  <TopHeader title="" :loading="loading" />

  <!-- onboarding screen -->
  <section v-if="isUserOnboarded">
      <OnboardingFlow />
  </section>



  <section v-else>
    <ClientOnly><Navigation  /></ClientOnly>


    <main :class="[styleSheet.container, 'py-10']">
      <div class="flex flex-col gap-5 max-w-2xl">
        <img src="~/assets/images/ab.svg" width="200" alt="welcome">
        <h2 class="text-2xl font-bold dark:text-white">Welcome on board</h2>
        <p>This is just a welcome page—nothing critical. However, feel free to explore the demo app! You can subscribe and cancel subscriptions, create organizations, invite members, and test all the available features.</p>
        <p>What you see here is exactly what you'll get when you purchase the starter kit—this is the live version of your future product.</p>
        <p>For testing subscriptions, you can use any of the provided <a href="https://docs.stripe.com/testing" target="_blank" class="underline">test cards</a> during checkout.</p>
      </div>
    </main>

  </section>

</template>

