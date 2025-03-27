<script setup lang="ts">
definePageMeta({ middleware: ['auth'] });


import styleSheet from '~/scripts/styleSheet';
import { avatarUrl } from '#imports';

const { updateUser } = useAuth()
const { del, upload }  = useStorage('avatars')
const toast = useToast()

const store = useStore()
const meta  = ref({ display_name: '', country: '' }) as any
const email = ref('')
const loading = ref(false)

const handleSubmit = async (payload: any) => {
  await updateUser(payload)
  nextTick(() => store.syncUser())

  toast.add({ msg: 'Updates successfully saved!', type: 'success' })
}


const handleUpload = async (event: any) => {
   const files = event.target?.files

   const { custom_avatar } = store.user.user_metadata
   loading.value = true

  if (custom_avatar?.name) {
    await del(custom_avatar.name, 'private')
  }

  if (files?.length > 0) {
    const { data, error } = await upload(files[0], { folder: 'private', publicUrl: true })

    if (error) {
      toast.add({ msg: error, type: 'error' })
      return loading.value = false
    }

    handleSubmit({ custom_avatar: { url: data, name: files[0].name } })
    loading.value = false
  }
 }



 watchEffect(() => {
  if(store.user){
    email.value = store.user.email as string
    
    Object.entries(store?.user?.user_metadata || {}).forEach(([key, value]) => {
      meta.value[key] = value 
    });
  }
})

</script>

<template>
 <ClientOnly><Navigation /></ClientOnly>

 <TopHeader title="User profile" />


 <main :class="[styleSheet.container]" @click="stateMemory.userMenu = false">

     <!-- avatar -->
      <div :class="['flex flex-col pb-4 gap-4']">
         <div class="flex gap-3 items-center">
          <div  class="size-26" :class="[styleSheet.avatarCover]">
            <ClientOnly><img :src="avatarUrl(store.user)" class="w-full h-full object-cover" alt="avatar"></ClientOnly>
          </div>
          <div class="flex flex-col">
            <h2 class="text-lg font-bold" :class="[styleSheet.title]">Custom avatar</h2>
            <p>Help your team recognize you in organizations</p>
            <div class="w-auto relative mt-3">
                <input type="file" class="absolute left-0 top-0 border z-5 h-full opacity-0 cursor-pointer w-[150px]"  @input="handleUpload">
                <ButtonBase variant="secondary" :loading="loading" icon="ri-upload-2-line">Upload</ButtonBase>
            </div>
          </div>
         </div>
      </div>



      <!-- perfonal info -->
      <div :class="['flex flex-col gap-4 mt-5 max-w-xl']">
         <form @submit.prevent="handleSubmit(meta)" class="flex flex-col gap-4">
           <div class="flex flex-col gap-1">
              <label :class="styleSheet.form.label">Full name</label>
              <input placeholder="Mary Jane" v-model="meta.display_name" :class="[styleSheet.form.input]" required />
            </div>

            <div class="flex flex-col gap-1">
              <label :class="styleSheet.form.label">Email Address</label>
              <input v-model="email" :class="[styleSheet.form.input]" readonly />
            </div>

            <div class="flex flex-col gap-1">
              <label :class="styleSheet.form.label">Country</label>
              <input v-model="meta.country" :class="[styleSheet.form.input]" />
            </div>
            <div class="flex mt-2">
              <ButtonBase variant="primary" type="submit">Save changes</ButtonBase>
            </div>
         </form>
      </div>

  </main>


<Toast />

</template>