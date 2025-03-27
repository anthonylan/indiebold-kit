<template>
<div v-if="store.user" :class="[styleSheet.umenu.content, styleSheet.card]">
  <div :class="styleSheet.umenu.row">
    <span :class="[styleSheet.umenu.label, '!mt-0', styleSheet.hl]">Signed in as</span>

    <div class="flex gap-2 m-2">
       <div class="size-10" :class="[styleSheet.avatarCover]">
         <img :src="avatarUrl(store.user)" :alt="store.user?.email" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-col">
        <div class="font-medium text-md truncate" :class="[styleSheet.title]">{{ store.user?.user_metadata?.display_name }}</div>
        <span class="leading-3 text-sm" :class="[styleSheet.hl]">{{ store.user?.email }}</span>
      </div>
   </div>
  </div>

  <!-- current organization -->
  <div :class="styleSheet.umenu.row">
    <span :class="[styleSheet.umenu.label, styleSheet.hl]">current organization</span>

    <div :class="[styleSheet.umenu.link, styleSheet.hoverItem]" @click="editMode = true" v-if="!editMode">
       <div class="size-6 overflow-hidden rounded">
         <img :src="defAvatar(store.selectedOrg?.name)"  class="w-full h-full object-cover">
      </div>
      <div class="flex items-center gap-3 flex-1">
        <div class="font-medium text-md">{{ store.selectedOrg?.name }}</div>
        <span :class="[styleSheet.umenu.tag, styleSheet.card]">{{ userInTeam(store.selectedOrg?.team) }}</span>
      </div>
      <i class="ri-settings-2-line text-lg"></i>
   </div>
   <ButtonBase variant="secondary" icon="ri-add-large-line" @click="$emit('newTeam')" :class="[styleSheet.btn.link]" v-if="!editMode">Invite members</ButtonBase>

    <form @submit.prevent="handleOrgRename" class="flex gap-2 px-1" v-if="editMode">
        <input placeholder="Acme inc." v-model="store.selectedOrg.name" :class="[styleSheet.form.input]" required />
        <ButtonBase variant="secondary" icon="ri-close-line" @click="editMode = false" type="button"></ButtonBase>
    </form>
  </div>

    <!-- other organization -->
    <div :class="styleSheet.umenu.row">
    <span :class="[styleSheet.umenu.label, styleSheet.hl]">other organizations</span>

    <div :class="[styleSheet.umenu.link, styleSheet.hoverItem]"  v-for="ws in store.organizations.filter((item: any) => item.id != store.selectedOrg?.id)" @click="store.setCurrentOrganizzation(ws)">
       <div class="size-6 overflow-hidden rounded">
         <img :src="defAvatar(ws?.name)"  class="w-full h-full object-cover">
      </div>
      <div class="flex items-center gap-3 flex-1">
        <div class="font-medium text-md flex-1">{{ ws?.name }}</div>
        <span :class="[styleSheet.umenu.tag, styleSheet.card]">{{ userInTeam(ws.team) }}</span>
      </div>
   </div>
   <ButtonBase variant="secondary" icon="ri-add-large-line" @click="$emit('newOrg')" :class="[styleSheet.btn.link]" :disabled="store.organizations.length > 4">New organization</ButtonBase>
  </div>

  <div :class="styleSheet.umenu.row">
    <ButtonBase variant="secondary" :icon="`text-xl ${colorMode == 'dark' ? 'ri-moon-line' : 'ri-sun-line'}`" @click="toggleDarkMode" :class="[styleSheet.btn.link]">
      <span class="capitalize">{{ colorMode }}</span> theme
    </ButtonBase>
    <ButtonBase variant="secondary" icon="ri-question-line text-xl" :class="[styleSheet.btn.link]" @click="openSupportWindow">Support</ButtonBase>
  </div>
  <div class="pt-2 flex flex-col">
    <ButtonBase variant="secondary" icon="ri-logout-box-r-line text-xl" @click="store.logout()" :class="[styleSheet.btn.link]">
      Log out
    </ButtonBase>
  </div>
</div>
</template>

<script setup lang="ts">
import styleSheet from '~/scripts/styleSheet';

const store = useStore()
const { colorMode, toggleDarkMode } = useDarkMode();
const { updateRecord } = useDatabase()

const emit = defineEmits(['newTeam', 'newOrg'])
const editMode = ref(false)

const userInTeam = (team: any) => {
    const user = team?.find((me: any) => me.email == store.user?.email)
    return roles.find((item) => item.value == user?.role)?.label || 'Owner'
}

const handleOrgRename = async () => {
   const { name, id } = store.selectedOrg
   await updateRecord('orgs', { id, name })
   editMode.value = false
}


const openSupportWindow = () => window.open('mailto:hello@indiebold.com', '_blank')
</script>