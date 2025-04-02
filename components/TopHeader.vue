<template>
    <div :class="['w-full z-10 relative left-0 border-b', styleSheet.border]" @click="stateMemory.userMenu = false">
      <div class="flex items-center h-15 !min-h-[20px] !py-0 relative" :class="[styleSheet.container]">
        <div class="flex items-center flex-1 gap-3">
          <h2 class="text-2xl font-bold flex-1 font-title" :class="[styleSheet.title]">{{ title }}</h2>
          <button @click="stateMemory.mobileMenu = !stateMemory.mobileMenu" class="cursor-pointer inline-block lg:hidden"><i class="ri-menu-line text-2xl"></i></button>
        </div>
        <div class="flex absolute lg:relative">
          <slot></slot>
        </div>
     </div>
  </div>

  <div class="flex items-center justify-center h-screen w-full fixed top-0 z-99" :class="[styleSheet.card]" v-show="loading">
    <div class="w-10 h-10 border-4 border-t-transparent dark:border-t-[#bee0ef] border-black rounded-full animate-spin"></div>
  </div>
</template>

<script lang="ts" setup>
import styleSheet from '~/scripts/styleSheet';
import { stateMemory } from '#imports';

defineProps<{ title: string, loading?: boolean }>()



</script>