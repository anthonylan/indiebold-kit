export const useStorage = (bucket: string) => {
    const supabase = useSupabase()
  
    //@ Upload a file to the specified folder in the bucket
    const upload = async(file: File, config: { folder: string; publicUrl: boolean }) => {
        const filePath = `${config.folder}/${file.name}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            return { error: error.message };
        }

        if (config.publicUrl) {
            const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
            return { data: publicUrlData.publicUrl };
        }

        return { data: `File ${filePath} uploaded successfully` };
    }




    //@ Read and list files from a specific folder with a limit
    const list = async (folder: string, limit: number) => {
        const { data, error } = await supabase.storage
            .from(bucket)
            .list(folder, { limit, offset: 0 });

        if (error) {
            return { error: error.message };
        }

        const files = data?.map((item: any) => {
            const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(`${folder}/${item.name}`);
            return { ...item, publicUrl: publicData.publicUrl };
        });

        return { files };
    }




    //@ Delete a file from the specified folder in the bucket
    const del = async (name: string, folder: string) => {
        const { data, error } = await supabase.storage.from(bucket).remove([`${folder}/${name}`]);
        return { data, error: error?.message };
    }
  
    return { upload, list, del }
  }
  