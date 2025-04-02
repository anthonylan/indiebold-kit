<script setup lang="ts">
definePageMeta({ middleware: ['auth'] });


import styleSheet from '~/scripts/styleSheet';
import { avatarUrl, roles, dayjs, closeAllMenus } from '#imports';
const store = useStore()
const toast = useToast()

const { workSpaceMembers, delTeam, fetchTeamMembers, syncUserId, handleTeamDeletion } = useTeam();
const loading = ref(true)
const count = ref(0)

watchEffect(() => {
  if (store.selectedOrg?.id) {
   count.value++

    nextTick(() => {
      loading.value = false  
    })
  }
});

watch(count, (old, newVal) => {
  if(newVal > 1) return // Prevent it from running multiple times
  syncUserId();
  fetchTeamMembers(); 
})


// Note: `workSpaceMembers` contains the actual data you need. Everything below is just for managing its visibility.  
// You can remove the extra code if you're using your own table implementation.  
// Tip: If you're using a UI library, it often provides built-in filtering, sorting, and search functionality,  
// so you may not need the code below.  


const searchExcluded = ref([]) as any
const keys = ref({ tab: 'All', search: '', sortby: 'org_role', loaded: false });
const sorting = [
  { label: 'Email', value: 'email' },
  { label: 'Level', value: 'org_role' },
  { label: 'Joined', value: 'org_date' },
]


const excluded = computed(() => {
  if (keys.value.tab === 'All') return [];
  
  return workSpaceMembers.value
    .filter((item) => item.status !== keys.value.tab)
    .map((item) => item.email);
});

const handleTabs = (status: string) => (keys.value.tab = status);
const sortMembers = (field: string) => {
  const sortedMembers = [...workSpaceMembers.value].sort((a: any, b: any) => {
    if (a[field] < b[field]) return -1;
    if (a[field] > b[field]) return 1;
    return 0;
  });
  
  workSpaceMembers.value = sortedMembers; // Update sorted members in the reactive state
};


const searchUsers = () => {
  const query = keys.value.search.toLowerCase();
  searchExcluded.value = workSpaceMembers.value.filter(user => 
    !user?.email?.toLowerCase().includes(query)).map((item) => item?.email)
}


const combineSearchAndStatusFilters = computed(() => {
  return workSpaceMembers.value?.filter((item: any) => {
    return !excluded.value.includes(item?.email) && !searchExcluded.value.includes(item?.email)
  })
})





</script>

<template>
  <!-- sidenav -->
 <ClientOnly><Navigation /></ClientOnly>


 <!-- top header -->
 <TopHeader title="Members" :loading="loading">
      <ButtonBase variant="primary" icon="ri-add-large-line" class="rounded-full" @click="stateMemory.showTeam = true" :disabled="store.userLevel?.role > 0 || !store.selectedOrg?.id">Add Member</ButtonBase>
  </TopHeader>


  <!-- main content-->
 <main :class="[styleSheet.container]" @click="closeAllMenus()">

  <!-- top actions -->
   <div class="flex md:items-center gap-4 flex-col md:flex-row">
        <div class="flex flex-1">
          <ButtonTabs :tabs="['All', 'Active', 'Absent']" v-model="keys.tab" @change="handleTabs" />
         </div>
         <div class="flex md:justify-end gap-3">
          <div class="flex relative group flex-1">
            <input placeholder="Search email..." v-model="keys.search" :class="[styleSheet.form.input, `pl-10`]" @input="searchUsers" />
            <i :class="[styleSheet.form.icon, 'ri-search-line left-3']"></i>
          </div>
          <ButtonBase variant="secondary" icon="ri-filter-line">Filter</ButtonBase>
          <div class="w-[140px] hidden md:block">
            <CustomSelect v-model="keys.sortby" :options="sorting" icon="ri-sort-alphabet-asc" @change="sortMembers(keys.sortby)" />
          </div>
      </div>
   </div>

   <!-- member's table -->
 <div class="max-w-full overflow-x-auto relative">

    <table :class="[styleSheet.table.main]">
      <thead>
        <tr>
          <th v-for="header in ['Name & email', 'Level', 'Status', 'Last logged in']" :class="[styleSheet.table.head.th]">
            <p class="flex items-center justify-between text-sm antialiased font-medium leading-none">
              {{ header }} 
            </p>
          </th>
          <th :class="[styleSheet.table.head.th]"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in combineSearchAndStatusFilters" class="group border-b border-gray-300 dark:border-[var(--dm-line)]">
          <td :class="[styleSheet.table.body.td]">
            <div class="flex items-center gap-3">
              <div class="size-10" :class="[styleSheet.avatarCover]">
                <img :src="avatarUrl(member)" :alt="member?.user_metadata?.display_name || 'N/A'" :class="[styleSheet.avatarImg]" referrerpolicy="no-referrer" />
              </div>
              <div class="flex flex-col">
                <p class="block text-sm font-bold antialiased" :class="[styleSheet.title]">
                  {{ member?.user_metadata?.display_name || 'N/A' }} <span v-if="member.email == store.user.email">(You)</span>
                </p>
                <p class="block text-sm antialiased font-normal">
                  {{ member?.email }}
                </p>
              </div>
            </div>
          </td>
          <td :class="[styleSheet.table.body.td]">
            <div class="flex flex-col">
              <p class="block text-sm antialiased font-normal leading-normal">
                {{ roles.find((item) => item.value == member.org_role)?.label || 'Owner' }}
              </p>
              <p class="block text-sm antialiased font-normal leading-normal opacity-70">
                Since {{ dayjs(member.org_date).format('MMM DD, YYYY') }}
              </p>
            </div>
          </td>
          <td :class="[styleSheet.table.body.td]">
            <div class="w-max">
              <div :class="[styleSheet.umenu.tag, 'py-0.5', member.status == 'Active' ? 'text-green-600' : 'opacity-70']">
                <i class="ri-checkbox-circle-fill text-sm"></i>
                <span class="text-[13px] ml-1">{{ member?.status }}</span>
              </div>
            </div>
          </td>
          <td :class="[styleSheet.table.body.td]">
            <p class="block text-sm antialiased font-normal leading-normal capitalize">
              {{ member?.id ? dayjs(member?.last_sign_in_at).fromNow() : 'N/A'  }}
            </p>
          </td>
          <td :class="[styleSheet.table.body.td]">
            <ButtonBase :disabled="member.email == store.user.email || store.userLevel?.role > 0" 
            @click="delTeam = { target: member.email, modal: true }" icon="ri-close-line text-xl text-red-500" variant="text"></ButtonBase>
          </td>
        </tr>
      </tbody>
    </table> 
  </div>

</main>




<!-- invitation modal -->
<Modal v-model="stateMemory.showTeam">
     <InvitationForm @close="stateMemory.showTeam = false" @error="($event) => toast.add({ msg: $event, type: 'error' })" />
</Modal>



<!-- delete members dialog -->
<Modal v-model="delTeam.modal">
     <div class="flex flex-col p-4">
      <div class="flex items-start">
            <div class="flex flex-col gap-2 flex-1">
                <h1 class="text-xl font-bold" :class="[styleSheet.title]">Revoke access</h1>
                <p class="text-md">Are you sure you want to revoke access for {{ delTeam.target }}?</p>
            </div>
            <button class="cursor-pointer" @click="delTeam.modal = false"><i class="ri-close-line text-2xl"></i></button>
        </div>
        <div class="flex border-t my-5" :class="[styleSheet.border]"></div>
        <div class="flex gap-3 justify-end">
            <ButtonBase variant="secondary" @click="delTeam.modal = false">No, keep access</ButtonBase>
            <ButtonBase variant="danger" @click="handleTeamDeletion">Yes, revoke access</ButtonBase>
         </div>
     </div>
</Modal>




<!-- toast -->
<Toast />

</template>