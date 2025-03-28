<template>
   <Wrapper title="Log into your account" icon="ri-user-fill" subtitle="Enter your details to login.">
    <template #link>
       <div :class="[styleSheet.form.linkWrap]">
          <p :class="[styleSheet.form.htext]">Don't have an account yet?</p>
          <NuxtLink to="/register" :class="[styleSheet.form.link]"> Sign up now</NuxtLink>
        </div>
    </template>
      
      <template #form> 
          <form @submit.prevent="submit">
              <div class="flex flex-col gap-5 my-7">
                <Email v-model="form.email" label="Email address" id="login-email" required />
                <Password v-model="form.password" id="login=pw" label="Password">
                  
                </Password>
              </div>
              
              <ButtonBase variant="primary" :disabled="loading" class="w-full h-11">Log in</ButtonBase>
              <div class="text-center py-4">
                <NuxtLink to="/password/reset" :class="[styleSheet.form.link]">Forgot your password?</NuxtLink>

              </div>
          </form>
          <div class="flex menu-separator"></div>
          <div class="text-center text-sm">Or log in with</div>
          <Providers />
      </template>
   </Wrapper>


   <Toast />
</template>



<script lang="ts" setup>
import styleSheet from '~/scripts/styleSheet'
import Providers from '~/components/Providers.vue'
import Wrapper from '~/components/Wrapper.vue'

const { signIn } = useAuth()
const toast = useToast()

const form = ref({ email: '', password: '' })
const loading = ref(false)

const submit = async () => {
  loading.value = true  

  const { email, password } = form.value
  const { error } = await signIn(email, password) as any

  loading.value = false
  if(error) return  toast.add({ msg: error, type: 'error' })

  location.href = `${location.origin}/home`
}

</script>