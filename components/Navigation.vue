<template>
  <aside :class="[styleSheet.card, styleSheet.sidebar.content, styleSheet.border, stateMemory.mobileMenu ? '-translate-x-0' : '-translate-x-[300px]']">
    <div :class="[styleSheet.border, 'flex items-center gap-3 h-15 border-b px-4']">
        <img src="../assets/images/logo-icon.svg" width="40"  alt="logo">
        <span :class="[styleSheet.title]" class="text-lg font-bold uppercase">bold</span>
    </div>

    <!-- links -->
    <nav class="flex flex-col overflow-y-auto flex-1 px-2" @click="closeAllMenus">
      <ul class="flex flex-col flex-1 gap-1 mt-2">
        <li v-for="link in links">
          <span v-if="link.seperator" class="flex text-sm text-gray-500 font-medium m-3">{{ link.seperator }}</span>

          <NuxtLink :to="link.path" class="text-gray-800 border border-transparent flex gap-2 items-center p-1.5 px-3" 
         :class="[link.path == route.path ? 'bg-gray-200 hover:bg-gray-100 dark:bg-[var(--dark-soft)]' : '', styleSheet.hoverItem]">
            <i class="text-xl" :class="link.icon"></i>
            <span class="text-md font-normal flex-1">{{ link.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>  

    <!-- User Tab -->
    <div class="flex items-center gap-2 p-2 select-none m-2 mb-25 md:mb-3 h-12" @click="stateMemory.userMenu = !stateMemory.userMenu" :class="[styleSheet.hoverItem]">
      <div class="size-7" :class="[styleSheet.avatarCover]">
          <img :src="avatarUrl(store.user)" :alt="store.user?.email" :class="[styleSheet.avatarImg]" referrerpolicy="no-referrer">
      </div>
        <span class="font-medium text-md flex-1 truncate">{{ store.user?.user_metadata?.display_name }}</span>
        <i class="ri-arrow-right-s-line text-2xl"></i>
    </div>
</aside>

<UserMenu v-show="stateMemory.userMenu" 
  @newTeam="toggleModalbyMenu('showTeam')" 
  @newOrg="toggleModalbyMenu('showOrgForm')" 
/>

<Modal v-model="stateMemory.showOrgForm">
  <OrganizationForm 
    @close="stateMemory.showOrgForm = false"  
    @error="($event) => toast.add({ msg: $event, type: 'error' })" />
</Modal>

<Modal v-model="stateMemory.showTeam">
   <InvitationForm 
   @close="stateMemory.showTeam = false" 
   @error="($event) => toast.add({ msg: $event, type: 'error' })" />
</Modal>

<Toast />



</template>



<script lang="ts" setup>
const store = useStore()
const toast = useToast()
const route = useRoute();


import { avatarUrl, stateMemory, closeAllMenus } from '#imports';
import styleSheet from '~/scripts/styleSheet';
import UserMenu from './UserMenu.vue';

const links = ref([
  { name: 'Home', path: '/home', icon: 'ri-home-line' },
  { name: 'Billing', path: '/settings/billing', icon: 'ri-vip-crown-2-line', seperator: 'Settings' },
  { name: 'Members', path: '/settings/members', icon: 'ri-group-3-line' },
  { name: 'Account', path: '/settings/account', icon: 'ri-user-3-line' },
  { name: 'Danger', path: '/settings/danger', icon: 'ri-door-lock-line' },
])


const toggleModalbyMenu = (value: 'showTeam' | 'showOrgForm') => {
  closeAllMenus()
  setTimeout(() =>  stateMemory[value] = true, 300);  
}


onMounted(() => {
  store.syncUser()  
})


watchEffect(() => {
  if(store.user?.email){
   store.syncOrgs()
  }
})

</script>


<style>



</style>