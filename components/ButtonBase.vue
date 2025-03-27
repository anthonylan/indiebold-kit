<template>
  <button :class="[baseStyle, variants[variant], { 'opacity-50 cursor-not-allowed': disabled }]" :disabled="disabled || loading" :type="type">
    <i v-if="loading" class="ri-loader-line spinning-icon"></i>
    <i v-else-if="icon" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import styleSheet from "~/scripts/styleSheet";

// Explicitly define the props interface
interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  variant: 'primary' | 'secondary' | 'danger' | 'text';
  icon?: string;
  type?: 'button' | 'submit'
}

// Use defineProps with the interface
defineProps<ButtonProps>();

// Destructure `btn` from `styleSheet`
const { btn } = styleSheet;
const variants = btn.variants;

const baseStyle = btn.baseStyle;
</script>


  