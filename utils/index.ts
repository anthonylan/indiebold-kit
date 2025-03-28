import dayjs from "dayjs"

import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

const generateRandomInt8 = () => {
  return Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)) + 1;
};

const roles = [
    { label: 'Member', value: 2 },
    { label: 'Admin', value: 1 },
]
const skinUrl = `https://api.dicebear.com/9.x`

const avatarUrl = (user: any) => {
  const useSkin = `${skinUrl}/micah/svg?seed`

  const { user_metadata, email } = user
  const name = user_metadata?.display_name || user_metadata?.name || email || 'x'

  return user_metadata?.custom_avatar?.url || user_metadata?.avatar_url || `${useSkin}=${name}`
}

const defAvatar = (title: any) =>  `${skinUrl}/initials/svg?seed=${title?.charAt(0) || 'default'}`

const stateMemory = reactive({ 
  userMenu: false, 
  mobileMenu: false,
  showTeam: false,
  showOrgForm: false
})


const handleOrgCreation = async (owner: any, orgName: string) => {
  const { insertRecord } = useDatabase()

  const entry = {
    id: generateRandomInt8(),
    name: orgName,
    team: [{ 
        email: owner?.email,
        uid: owner?.id,
        role: 0, 
        owner: true,
        date: Date.now()
    }]
 }


  const { data, error } =  await insertRecord('orgs', entry)
  return { data, error }
}


const closeAllMenus = () => {
  stateMemory.mobileMenu = false
  stateMemory.userMenu = false
}

export { avatarUrl, roles, dayjs, defAvatar, stateMemory, handleOrgCreation, closeAllMenus }

