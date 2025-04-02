<script setup lang="ts">
import styleSheet from '~/scripts/styleSheet';





</script>

<template>



<div class="flex flex-col gap-3 text-center p-20 border max-w-lg m-auto my-10" :class="[styleSheet.card]">
     <img src="~/assets/images/ab.svg" width="200" alt="" class="mx-auto">
     <h1 class="text-4xl my-3 font-title" :class="[styleSheet.title]">Nothing to see here</h1>

     <a href="https://indiebold.com" :class="[styleSheet.btn.baseStyle, styleSheet.btn.variants.primary]">Go to sales page</a>
     <div class="grid grid-cols-2 justify-center gap-3">
      <a href="/login" :class="[styleSheet.btn.baseStyle, styleSheet.btn.variants.secondary]">Log in</a>
      <a href="mailto:hello@indiebold.com" target="_blank" :class="[styleSheet.btn.baseStyle, styleSheet.btn.variants.secondary]">Report a bug</a>
     </div>
</div>
 

</template>



