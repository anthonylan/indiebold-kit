<template>
    <div class="flex justify-center gap-3">
        <button v-for="provider in providers" :key="provider.name" :class="[styleSheet.btn.baseStyle, styleSheet.hoverItem]" @click="handleOAuth(provider.name)">
            <img v-if="provider?.img" :src="provider?.img" :alt="provider.img" :width="provider.size">
            <i v-else :class="[provider.icon, 'text-2xl']"></i> 
             <span class="text-md capitalize">{{ provider.name }}</span>
        </button>
     </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import styleSheet from '~/scripts/styleSheet';


import googleLogo from '~/assets/images/google.svg'
import discordLogo from '~/assets/images/discord.svg'


const supabase = useSupabase()
const loading = ref(false)


const providers = [
      { name: 'google', img: googleLogo, size: '23' },
      { name: 'discord', img: discordLogo, size: '24' },
      { name: 'github', icon: 'ri-github-fill' }
   ]



const handleOAuth = async (provider: any) => {  
    loading.value = true

    const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin + '/home' },
    })

    if(error) {
        loading.value = false
        console.log(error);
    }
 }

</script>