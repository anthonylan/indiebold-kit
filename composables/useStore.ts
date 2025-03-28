interface Team {
  email: string;
  role: number
  date: Date
  owner?: boolean
  uid?: string 
}

import { stateMemory } from '#imports';

const store = shallowReactive({
  user: {} as import('@supabase/supabase-js').User | any,
  organizations: [] as any,
  selectedOrg: {} as any,
  userLevel: {} as Team,

  async syncUser() {
    const { fetchUser } = useAuth()

    // Fetch latest user data
    const { data } = await fetchUser()    
    store.user = data?.user || {}
  },


  //sync organization
  async syncOrgs() {
    const { fetchUserLinkedOrgs } = useDatabase()    

    // Fetch latest user organizations
    const { data } = await fetchUserLinkedOrgs(store.user?.email as string)    
    store.organizations = data    


    //prompt the user to create a new organization
    if(data?.length == 0) stateMemory.showOrgForm = true

    
    const savedOrganization = store.organizations.find((item: any) => item.id == localStorage.getItem('org_id'))
    if(savedOrganization && savedOrganization.id){
      return store.setCurrentOrganizzation(savedOrganization)
    }

    //set default organization
    if(!store.selectedOrg?.name && store.organizations?.length > 0) {
        store.setCurrentOrganizzation(store.organizations[0])
     }
  },

  setCurrentOrganizzation(org: any){
    store.selectedOrg = org
    localStorage.setItem('org_id', org.id)

    //find currently logged in user on this org
    store.userLevel =  org?.team?.find((item: Team) => item.email === store.user?.email)
    stateMemory.userMenu = false
  },
  logout() {
    useAuth().signOut()
    localStorage.removeItem('org_id')

    store.user = {}
    navigateTo('/login')
  }
})


export const useStore = () => store
