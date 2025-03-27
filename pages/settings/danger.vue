<script setup lang="ts">
definePageMeta({ middleware: ['auth'] });

import styleSheet from '~/scripts/styleSheet';
const supabase  = useSupabase()

const store = useStore()
const toast = useToast()

const emailRef = ref('')
const keys = ref({ processing: false, loading: true })

const handleDeletion = async () => {
    const { id, user_metadata, email } = store.user
    keys.value.processing  = true

    if(emailRef.value !== email) {
        return toast.add({ msg: `Email doesn't match`, type: 'error' })
    }
    const response = await $fetch('/api/customer/delete', {
        method: 'POST',
        body: { customer: user_metadata?.customer, uid: id },
    })

    const { error } = response as any
    if(error) {
       toast.add({ msg: error, type: 'error' })
       return keys.value.processing  = false
    }

    const ownerOrgs = store.organizations
    .filter((item: any) => item.team?.some((has: any) => has.email == store.user.email && has?.owner))
    ?.map((item: any) => item.id)

    const res = await supabase.from('orgs').delete().in('id', ownerOrgs)
    if(res.status) store.logout()    
}


onMounted(() => {
    keys.value.loading  = false
})


</script>


<template>
    <ClientOnly><Navigation /></ClientOnly>
    <TopHeader title="Danger zone" :loading="keys.loading" />


    <main :class="[styleSheet.container]" @click="stateMemory.userMenu = false">
        <form @submit.prevent="handleDeletion" class="max-w-xl flex flex-col gap-3">
            <p>All of your data, including your profile, organizations, and personal information, will be permanently removed. </p>
            <p>By entering your email, you confirm that you understand and accept the consequences of deleting your account.</p>
            <div class="flex menu-separator"></div>

            <Email v-model="emailRef" label="Confirm deletion" id="delete" required />
            <div class="flex">
                <ButtonBase variant="danger" type="submit" :loading="keys.processing">Delete account</ButtonBase>
            </div>
        </form>
    </main>

    <Toast />
</template>