<template>
  <Wrapper title="Create a new account" icon="ri-user-add-fill" subtitle="Enter your details to register.">
    <template #link>
      <div :class="[styleSheet.form.linkWrap]">
          <p :class="[styleSheet.form.htext]">Alread have an account?</p>
          <NuxtLink to="/login" :class="[styleSheet.form.link]"> Log in</NuxtLink>
       </div>
    </template>
     <template #form> 
         <form @submit.prevent="submit">
             <div class="flex flex-col gap-1 my-7">
                <div class="flex flex-col gap-1">
                  <label for="" :class="styleSheet.form.label">Full name</label>
                  <input placeholder="Jane Darwell" v-model="form.name" :class="[styleSheet.form.input]" required />
              </div>
               <Email v-model="form.email" label="Email address" id="login-email" required class="my-3" />
               <Password v-model="form.password" id="login=pw" label="Password" />
               <small class="text-gray-500"><i class="ri-information-fill"></i> Must contain 1 uppercase letter, 1 number, min. 8 characters.</small>
             </div>
             <ButtonBase variant="primary" :disabled="loading" class="w-full h-11">Continue</ButtonBase>
         </form>

         <div class="relative text-center mt-5">
          <div class="flex menu-separator"></div>
          <div class="text-center text-sm mt-5 absolute -top-[50%] left-[50%] -translate-[50%] px-2" :class="[styleSheet.card]">Or sign up with</div>
         </div>
         
         <Providers />
     </template>
  </Wrapper>


  <Toast />
</template>



<script lang="ts" setup>
import styleSheet from '~/scripts/styleSheet'
import Providers from '~/components/Providers.vue'
import Wrapper from '~/components/Wrapper.vue'


const { signUp } = useAuth()
const config = useRuntimeConfig()
const toast = useToast()

const form = ref({ email: '', password: '', name: '' })
const loading = ref(false)

const submit = async () => {
 loading.value = true  

 const { email, password, name } = form.value
 const { error } = await signUp(email, password, name) as any

 loading.value = false
 if(error) return  toast.add({ msg: error, type: 'error' })

 location.href = config.public.clientBaseUrl + '/home'
}


</script>