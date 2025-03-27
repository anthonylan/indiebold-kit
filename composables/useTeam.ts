export function useTeam() {
    const store = useStore();
    const { upsertRecord } = useDatabase();
    const toast = useToast();
    
    const workSpaceMembers = ref<any[]>([]);
    const delTeam = ref({ target: '', modal: false });
  
    //Attempt querying the real user data using auth admin
    const fetchTeamMembers = async () => {
      const org = store.selectedOrg as any;
      if (!org?.team) return;      
  
      const memberIds = org.team
        .map((item: any) => item.uid)
        .filter((uid: string) => uid);
  
      if (!memberIds.length) return;
  
      try {
        const { teamMembers } = await $fetch('/api/team', {
          method: 'POST',
          body: { memberIds },
        }) as any
  
        const pending = org.team.filter((item: any) => !memberIds.includes(item?.uid));
  
        workSpaceMembers.value = [...pending, ...teamMembers].map((member: any) => {
          const roleData = org.team.find((item: any) => item?.email === member?.email);
          return {
            ...member,
            status: member?.id ? 'Active' : 'Absent',
            org_role: roleData?.role,
            org_date: roleData?.date || Date.now(),
          };
        });
      } catch (error) {
        toast.add({ msg: 'Failed to fetch team members', type: 'error' })        
      }
    };
  
    // save the current logged in user uid in the team array
    const syncUserId = async () => {
      const org = store.selectedOrg as any;
      const findMe = org?.team?.find((member: any) => member.email === store.user?.email);
      if (!findMe) return;
      if(findMe?.uid && findMe?.uid == store.user.id) return;      
  
      findMe.uid = store.user?.id;
      await upsertRecord('orgs', { id: org.id, team: org.team });
    };
  
    //delete team member
    const handleTeamDeletion = async () => {
      const { id, team } = store.selectedOrg as any;
      delTeam.value.modal = false;
  
      const updatedTeam = team.filter((member: any) => member.email !== delTeam.value.target);
      const { error } = await upsertRecord('orgs', { id, team: updatedTeam });
  
      if (error) {
        toast.add({ msg: error, type: 'error' });
      } else {
        store.syncOrgs();
      }
    };
  
    return {
      workSpaceMembers,
      delTeam,
      fetchTeamMembers,
      syncUserId,
      handleTeamDeletion,
    };
  }
  