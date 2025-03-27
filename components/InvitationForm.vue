<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col p-5 gap-4 m-auto w-[680px]">
        <div class="flex flex-col gap-1">
            <h2 class="text-xl font-bold" :class="[styleSheet.title]">Invite others to {{ store.selectedOrg?.name }}</h2>
            <p class="text-sm">Invite others to collaborate in IndieBold! Due to high demand, invites are limited to 3 per organization. Regardless of delivery, teammates will join your org when they sign up with the invited email.</p>
        </div>

        <div class="flex border-t my-2" :class="[styleSheet.border]"></div>

        <div class="grid grid-cols-[70%_28%] gap-3">
            <div class="flex flex-col gap-1">
              <label for="" :class="styleSheet.form.label">Email address</label>
              <input placeholder="jane@indiebold.com" v-model="form.email" :class="[styleSheet.form.input]" required />
            </div>
            <div class="flex flex-col gap-1">
              <label for="" :class="styleSheet.form.label">Level</label>
              <CustomSelect :options="roles"  v-model="form.role" />
            </div>
        </div>
        <div class="flex flex-col gap-1 mt-3">
            <label for="" :class="styleSheet.form.label">Message (optional)</label>
            <textarea placeholder="Tell your teammate why you're inviting them to IndieBold" rows="4" v-model="form.msg" :class="[styleSheet.form.input, '!h-auto']" />
        </div>
        
        <div class="flex border-t my-2" :class="[styleSheet.border]"></div>

        <div class="flex justify-end gap-3">
          <button :class="[styleSheet.btn.baseStyle, styleSheet.btn.variants.secondary]" type="button" @click="$emit('close')">Cancel</button>
          <button :class="[styleSheet.btn.baseStyle, styleSheet.btn.variants.primary]" type="submit">Invite team member</button>
       </div>
    </form>
</template>

<script lang="ts" setup>
import styleSheet from '~/scripts/styleSheet'
import { roles } from '#imports'
import CustomSelect from './CustomSelect.vue'

const store = useStore()
const { upsertRecord } = useDatabase()
const emit = defineEmits(['close', 'error'])

const form = ref({ email: '', role: 2, msg: '' })

const handleSubmit = async () => {
    const { team, id } = store.selectedOrg
    const { email, role, msg } = form.value
    const teamRef = [...team]

    if(teamRef.filter((item) => item.email == email).length > 0) {
        return emit('error', 'A member with this email address already exist in this organization')
    }

    teamRef.push({ email, role, date: Date.now() })
    const { error } = await upsertRecord('orgs', { id, team: teamRef })
    if(error) return emit('error', error)


    emit('close')
    store.syncOrgs()
    form.value.email = ''



    //Attempt to sent the message
    if(teamRef.length < 3){
         const res = await $fetch('/api/team/invite', { 
            method: 'POST', 
            body: { 
               msg, email, 
               owner: store.user?.user_metadata?.display_name, 
               org_name: store.selectedOrg?.name 
            }
        })          
    }
}


</script>