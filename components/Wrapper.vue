<template>
    <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-white dark:bg-[var(--dark-soft)]">
       <div class="h-full flex flex-col md:flex-row items-center relative">
           <div class="flex items-start relative md:absolute left-0 top-0 w-full px-5 md:px-10 pt-5">
             <div class="flex flex-1">
              <NuxtLink to="/login">
                <Logo />
              </NuxtLink>
            </div>
            <slot name="link"></slot>
          </div>
      
          <div :class="[styleSheet.form.wrapper, 'mt-10 md:mt-auto']">
            <div class="text-center mb-5">
              <h2 class="text-4xl font-bold mt-3 mb-2 font-title" :class="[styleSheet.title]">{{ title }}</h2>
              <p class="text-gray-600 dark:text-[var(--gray)]">{{ subtitle }}</p>
            </div>
            
            <slot name="form"></slot>
         </div>
       </div>

       <!-- right -->
        <div class="hidden md:flex items-end h-full relative" id="cover">
          <div class="flex absolute w-full h-full bg-black/30 top-0 left-0 z-1"></div>

          <div class="flex flex-col justify-center gap-3 max-w-md mx-auto py-15 text-center relative z-5">
            <h1 class="text-4xl font-bold text-white font-title">A minimalist SaaS boilerplate built with Nuxt</h1>
            <p class="text-xl text-white">Skip the tedious setup. Launch faster. Focus on what truly matters—building your SaaS.</p>
            <div class="flex justify-center gap-4">
              <span class="border border-white text-white px-2 py-1 rounded-2xl"><i class="ri-checkbox-circle-fill"></i> Lifetime updates</span>
              <span class="border border-white text-white px-2 py-1 rounded-2xl"><i class="ri-checkbox-circle-fill"></i> Unlimited projects</span>
            </div>
          </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import styleSheet from '~/scripts/styleSheet';


defineProps<{
  title: string
  subtitle: string
  icon?: string
}>()


</script>


<style>


#cover{
  background-image: url('https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-position: center;
}

</style>