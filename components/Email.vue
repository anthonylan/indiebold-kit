<template>
    <div class="flex flex-col gap-1">
      <label :for="id" :class="[styleSheet.form.label]">{{ label }}</label>

      <div class="flex relative group">
        <input :id="id" placeholder="jane@indiebold.com"  type="email"
          :required="required" :class="[styleSheet.form.input, 'pl-10']" 
          :value="modelValue" @input="onInput"
        />
        <i :class="[styleSheet.form.icon, 'ri-mail-line left-3']"></i>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import styleSheet from '~/scripts/styleSheet';
  
  // Define types for the props
  interface EmailInputProps {
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
 defineProps<EmailInputProps>();

// Emit updated value when the input changes
const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};

</script>
  
  
  