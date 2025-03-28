<script setup lang="ts">
import styleSheet from '~/scripts/styleSheet'
import { handleOrgCreation } from '#imports'

const { updateUser } = useAuth()
const store = useStore()
const toast = useToast()

const form = ref({ }) as any
const loading = ref(false)

onMounted( async() => {
  store.syncUser()
})

watchEffect(() => {
  if(store.user){
    const sp = store.user?.user_metadata as any
  
    form.value['display_name'] = sp?.name || sp?.display_name
    form.value['country'] = sp?.country
  }
})


const referrals = ['x', 'Reddit', 'Instagram', 'tiktok', 'Search engine', 'recommended', 'other']


// Attempt customer creation on Stripe
const handleSubmit = async () => {  
  loading.value = true 

  const { org_name, display_name, referral, country } = form.value
  const response = await $fetch('/api/customer/create', { 
      method: 'POST', 
      body: {  
        name: display_name,
        email: store.user?.email 
      }
    }) as any
    
    const { customer } = response
    if(!customer){
      toast.add({ msg: `Unable to create a customer Id`, type: 'error' })
      return loading.value = false
    }

    await updateUser({ display_name, referral, country, boarded: true, customer  })
    nextTick(() =>  store.syncUser())

    //create organization for this user
    loading.value = false
    if(org_name) handleNext() 
}


const handleNext = async () => {
    const { error } =  await handleOrgCreation(store.user, form.value.org_name)
    if(error) return toast.add({ msg: error, type: 'error' })

    store.syncOrgs()
}






</script>

<template>
    <div>
      <form @submit.prevent="handleSubmit" class="max-w-md m-auto pb-10 px-10">
        <div class="flex flex-col gap-2 text-center p-4">
            <img src="~/assets/images/ask.svg" width="140" alt="ballon" class="mx-auto">
            <h1 class="text-2xl font-bold" :class="[styleSheet.title]">Almost done!</h1>
            <p class="text-xl text-gray-600 dark:text-[var(--gray)]">Just a few more questions to setup your account.</p>
        </div>

        <div class="flex flex-col gap-2 mt-10">
            <label for="" :class="[styleSheet.form.label]">Tell us more about you</label>
            <input type="text" placeholder="Your name" v-model="form.display_name" :class="[styleSheet.form.input]">
            <input type="text" placeholder="Your country" v-model="form.country" :class="[styleSheet.form.input]" required>
        </div>

        <div class="flex flex-col gap-2 my-5" v-if="store.organizations?.length == 0">
            <label for="" :class="[styleSheet.form.label]">What's the name of your organization?</label>
            <input type="text" placeholder="Workspace name" v-model="form.org_name" :class="[styleSheet.form.input]" required>
        </div>

        <div class="flex flex-col gap-2 my-5">
            <label for="" :class="[styleSheet.form.label]">We'd love to know how you found Indiebold ✨ </label>
            <div class="flex gap-2 flex-wrap">
            <span v-for="disc in referrals" :class="[styleSheet.btn.baseStyle, form.referral == disc ? 'bg-white border dark:bg-[var(--dark-soft)] dark:border-[var(--dm-line)]' : styleSheet.btn.variants.secondary, 'uppercase text-[13px]']" @click="form.referral = disc">{{ disc }}</span>
            </div>
        </div>

        <ButtonBase variant="primary" class="w-full" type="submit" :loading="loading">Let's do this!</ButtonBase>
     </form>
    </div>


    <Toast />
   
</template>

