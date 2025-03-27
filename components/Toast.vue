<template>
  <div class="fixed bottom-5 right-5 flex flex-col gap-2 z-99">
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" 
           class="p-3 rounded-lg text-black dark:text-white flex items-center gap-3 border-b-4 shadow transition-all duration-300 ease-in-out"
           :class="[toastClass(toast.type as string), 'toast-enter', 'bg-white dark:bg-[var(--dark-soft)]']">
        <i :class="toastIcon(toast.type as string)"></i>
        <span>{{ toast.msg }}</span>
      </div>
    </TransitionGroup>
  </div>

</template>

<script setup lang="ts">
import styleSheet from '~/scripts/styleSheet';

const { toasts } = useToast();

const toastClass = (type: string) => ({
  success: 'border-green-500',
  error: 'border-red-500',
  info: 'border-blue-500',
}[type] || 'border-gray-500');

const toastIcon = (type: string) => ({
  success: 'text-green-500 ri-checkbox-circle-fill',
  error: 'text-red-500 ri-error-warning-fill',
  info: 'text-blue-500 ri-information-2-fill',
}[type] || 'text-gray-500 ri-notification-fill');
</script>

  
  
<style>
/* Custom transition animation */
.toast-enter-active, .toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
</style>
