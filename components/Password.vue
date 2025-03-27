<template>
    <div class="flex flex-col gap-1">
      <div class="flex">
        <label :for="id" class="flex-1">{{ label }}</label>
        <slot name="forgotpassword"></slot>
      </div>
      <div class="flex relative group">
        <input :id="id" placeholder="••••••••••" :type="showPassword ? 'text' : 'password'" 
          :class="[styleSheet.form.input, 'pl-10']" :value="modelValue" @input="onInput" required
        />
        <i :class="[styleSheet.form.icon, 'ri-lock-2-line left-3']"></i>
        <a href="#" :class="[styleSheet.form.icon, 'right-3']" @click.prevent="togglePasswordVisibility">
          <i :class="!showPassword ? 'ri-eye-line' : 'ri-eye-off-line'"></i>
        </a>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
  import styleSheet from '~/scripts/styleSheet';
  
  // Define types for the props
  interface PasswordInputProps {
    id: string;
    label: string;
    required?: boolean;
    modelValue: string; // For v-model binding
  }
// Define emits for v-model support
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// Use defineProps with TypeScript typings
const props = defineProps<PasswordInputProps>();

// Local state for managing password visibility
const showPassword = ref(false);

// Emit updated value when the input changes
const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};

// Function to toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

</script>
  
  
  