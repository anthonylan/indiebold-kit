<template>
    <Teleport to="body">
      <transition name="fade">
        <div v-if="modelValue" class="fixed inset-0 z-999 flex items-center justify-center bg-black/50" @click.self="close">
          <div class="overflow-hidden" :class="[styleSheet.card]" @keyup.esc="close">
            <slot></slot>
          </div>
        </div>
      </transition>
    </Teleport>
  </template>
  
  <script setup lang="ts">
import styleSheet from '~/scripts/styleSheet';

  defineProps<{ modelValue: boolean }>();
  const emit = defineEmits(["update:modelValue"]);
  
  const close = () => emit("update:modelValue", false);
  </script>
  
  <style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  