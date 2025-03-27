<template>
    <Wrapper title="Reset password" icon="ri-door-lock-fill" subtitle="Enter your email address. If an account exists, you’ll receive an email with a password reset link soon">
      <template #link>
        <div :class="[styleSheet.form.linkWrap]">
          <p :class="[styleSheet.form.htext]">Changed your mind?</p>
          <NuxtLink to="/login" :class="[styleSheet.form.link]"> Go back</NuxtLink>
        </div>
      </template>
       <template #form> 
           <form @submit.prevent="submit" class="min-w-[300px] mt-5">
               <Email v-model="form.email" label="Email address" id="login-email" required />
               <ButtonBase variant="primary" class="w-full h-11 mt-7">Reset password</ButtonBase>
           </form>
       </template>
    </Wrapper>
  
    <Toast />
  </template>
  
  
  
  <script lang="ts" setup>
  import styleSheet from '~/scripts/styleSheet'
  import Wrapper from '~/components/Wrapper.vue'
  
  const { requestResetLink } = useAuth()
  const toast = useToast()
  
  const form = ref({ email: '' })
  
  const submit = async () => {
   const { email } = form.value
   const { error } = await requestResetLink(email)
  
   form.value.email = ''
   if(error) return  toast.add({ msg: error, type: 'error' })

   toast.add({ msg: `Reset link sent to ${email}`, type: 'success' })
  }
  
  
  </script>