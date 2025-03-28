<template>
    <div class="flex flex-col min-h-screen p-5 bg-gray-50 dark:bg-[var(--dark-soft)]">
      <div class="flex items-start">
        <div class="flex flex-1">
          <NuxtLink to="/login"><img src="~/assets/images/logo-icon.svg" alt="logo icon" width="50"></NuxtLink>
        </div>
          <slot name="link"></slot>
      </div>

       <div class="mt-10">
          <div :class="[styleSheet.form.wrapper]">
            <div class="text-center">
              <div class="relative flex mx-auto size-24 shrink-0 items-center justify-center rounded-full before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-neutral-500 before:to-transparent before:opacity-10">
                <div class="relative z-10 flex items-center justify-center rounded-full bg-white ring-1 ring-inset ring-neutral-200 size-16 dark:bg-[var(--dark)] dark:ring-[var(--dm-line)]">
                  <i :class="[icon, 'text-3xl text-gray-600 dark:text-[var(--gray)]']"></i>                
                </div>
              </div>
              <h2 class="text-2xl font-bold mt-3 mb-2" :class="[styleSheet.title]">{{ title }}</h2>
              <p class="text-gray-600 dark:text-[var(--gray)]">{{ subtitle }}</p>
            </div>
            
            <slot name="form"></slot>
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