export const useDatabase = () => {
    const supabase = useSupabase()
  
    // Fetch all records from a table
    const fetchRecords = async (table: string) => {
      const { data, error } = await supabase.from(table).select('*')
      return { data, error: error?.message }
    }
  
    // update Existing record
    const  upsertRecord = async (table: string, record: any) => {
      const { data, error } = await supabase.from(table).upsert(record).select()
      return { data, error: error?.message }
    }

     // Insert a new record
     const  insertRecord = async (table: string, record: any) => {
      const { data, error } = await supabase.from(table).insert(record).select()
      return { data, error: error?.message }
    }

    const updateRecord = async (table: string, record: any) => {
      const { data, error } = await supabase.from(table).update(record).eq('id', record.id).select()
      return { data, error: error?.message }
    }

    //Specilized Queries
    const fetchUserWorkspaces = async (email: string) => {
      const { data, error } = await supabase
      .from('orgs')
      .select('*')
      .contains('team', JSON.stringify([{'email': email}]))

      return { data, error: error?.message }
    }
  
    return { fetchRecords, insertRecord, upsertRecord, fetchUserWorkspaces, updateRecord }
  }
  