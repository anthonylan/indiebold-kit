<template>
    <div class="flex flex-col p-5 w-[450px]">
        <div class="flex items-start">
            <div class="flex flex-col flex-1">
                <h1 class="text-xl font-bold" :class="[styleSheet.title]">Create an organization </h1>
                <p class="text-md">Organizations gather people building together.</p>
            </div>
            <button class="cursor-pointer" @click="$emit('close')"><i class="ri-close-line text-2xl"></i></button>
        </div>
        <div class="flex border-t my-5" :class="[styleSheet.border]"></div>

        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-1">
            <label for="" :class="styleSheet.form.label">Organization name</label>
            <input placeholder="Acme inc." v-model="form.name" :class="[styleSheet.form.input]" required />
          </div>
          <div class="flex border-t my-5" :class="[styleSheet.border]"></div>

         <div class="flex gap-3 justify-end">
            <button :class="[styleSheet.btn.baseStyle, styleSheet.btn.variants.secondary]" type="button" @click="$emit('close')">Cancel</button>
            <button :class="[styleSheet.btn.baseStyle, styleSheet.btn.variants.primary]" type="submit">Create organization</button>
         </div>
        </form>
    </div>

</template>


<script setup lang="ts">
const form = ref({ name: '' })
import styleSheet from '~/scripts/styleSheet';
import { handleOrgCreation } from '#imports';


const emit = defineEmits(['close', 'error'])
const store = useStore()

const handleSubmit = async () => {
    const { data, error } =  await handleOrgCreation(store.user, form.value.name)
    if(error) return emit('error', error)

    store.syncOrgs()
    emit('close')
    
    if(data && data?.length > 0) {
        store.setCurrentOrganizzation(data[0]) 
    }
}


</script>