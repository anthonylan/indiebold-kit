<template>
<div class="relative w-full">
    <!-- Custom select trigger -->
    <div  @click="toggleDropdown"  :class="[styleSheet.btn.baseStyle, styleSheet.btn.variants.secondary, 'w-full justify-start']">
      <i v-if="icon" :class="icon"></i>
      <span v-if="selectedOption" class="block truncate flex-1">{{ selectedOption.label }}</span>
      <span v-else class="block truncate text-gray-400 flex-1">Select an option</span>
      <i class="ri-arrow-down-s-line text-lg transition-transform duration-200" :class="{ 'transform rotate-180': isOpen }"></i>
    </div>

    <!-- Dropdown menu -->
    <div v-if="isOpen"  class="absolute z-10 overflow-hidden w-full mt-1 shadow border" :class="[styleSheet.card]">
    <ul class="overflow-hidden text-sm max-h-60">
        <li v-for="option in options" :key="option.value" @click="selectOption(option)"
        class="relative m-1 px-3 py-1.5" :class="[selectedOption && selectedOption.value === option.value ? 'bg-gray-100 dark:bg-[var(--dark-soft)]' : '', styleSheet.hoverItem]">

        <div class="flex items-center justify-between">
            <span class="block truncate flex-1">{{ option.label }}</span>
            <i class="ri-check-line text-gray-600 text-lg" :class="[selectedOption && selectedOption.value === option.value ? 'opacity-100' : 'opacity-0']"></i>
        </div>
        </li>
    </ul>
    </div>
</div>
</template>
  
<script setup>
import styleSheet from '~/scripts/styleSheet';

  
  const props = defineProps({
    options: {
      type: Array,
      required: true,
      // Each option should have { label: String, value: Any }
    },
    modelValue: {
      type: [String, Number, Object],
      default: null
    },
    icon: {
      type: String,
      required: false,
    }
  });
  
  const emit = defineEmits(['update:modelValue', 'change']);
  
  const isOpen = ref(false);
  const selectedOption = ref(null);
  
  // Find the selected option based on modelValue
  const updateSelectedOption = () => {
    if (props.modelValue) {
      selectedOption.value = props.options.find(option => option.value === props.modelValue);
    } else {
      selectedOption.value = null;
    }
  };
  
  // Watch for changes in the modelValue prop
  watch(() => props.modelValue, () => {
    updateSelectedOption();
  }, { immediate: true });
  
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  // Handle option selection
  const selectOption = (option) => {
    selectedOption.value = option;
    isOpen.value = false;
    emit('update:modelValue', option.value);
    emit('change', option);
  };
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    const el = document.querySelector('[data-dropdown-container]');
    if (el && !el.contains(event.target)) {
      isOpen.value = false;
    }
  };
  
  // Add click outside event listener
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  // Clean up event listener
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  
  // Initial setup
  updateSelectedOption();
  </script>