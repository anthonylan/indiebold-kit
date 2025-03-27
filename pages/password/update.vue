<template>
    <Wrapper title="New password" icon="ri-door-lock-fill" subtitle="Password should be 6-12 characters and include at least two of the following: uppercase, lowercase, number, or symbol.">
      <template #link>
        <p class="text-md text-gray-600">Refreshing this page will invalidate your session</p>
      </template>
      <template #form> 
        <div v-if="showForm">
          <form @submit.prevent="submit" class="min-w-[300px] mt-5">
               <div class="flex flex-col gap-6">
                 <Password v-model="form.password" id="pw-1" label="Password" />
                 <Password v-model="form.password2" id="pw-2" label="Confirm password" />
               </div>

               <ButtonBase variant="primary" class="w-full h-11 mt-7">Update password</ButtonBase>
           </form>
          </div>
           
          <div class="flex flex-col justify-center text-center gap-5 p-5 bg-red-100 min-w-[300px]" v-else>
            <h2 class="text-xl text-red-600">Session no longer valid</h2>
           </div>
       </template>
    </Wrapper>
  
    <Toast />
  </template>
  
  
  
<script lang="ts" setup>
  import Wrapper from '~/components/Wrapper.vue'
  
  const { updatePassword } = useAuth()
  const supabase = useSupabase()
  const toast = useToast()
  
  const form = ref({ password: '', password2: '' })
  const showForm = ref(false)
  
  const submit = async () => {
   const { password, password2 } = form.value
   if(password !== password2) return toast.add({ msg: `Passwords don't match`, type: 'error' })
   if(password.length < 6) return toast.add({ msg: `Really bruh? Make it longer plz`, type: 'error' })

   const { error } = await updatePassword(password)
  
   if(error) return  toast.add({ msg: error, type: 'error' })
   location.href = '/login'
  }
  


  onMounted(() => {
    supabase.auth.onAuthStateChange(async (event) => {
        if (event === "PASSWORD_RECOVERY") showForm.value = true
    });
  })
  
  </script>