<template>
    <div class="flex flex-1">
      <div class="relative flex justify-center w-auto bg-white px-1 h-10.5 dark:bg-[var(--dark-soft)] border rounded-full" :class="[styleSheet.border]">
        <!-- Sliding Indicator -->
        <div class="absolute left-0 top-1 h-8 bg-[#bee0ef] transition-all duration-300 dark:bg-[var(--dark)] rounded-full" 
        :style="{ width: `${tabWidth}px`, transform: `translateX(${tabPosition}px)` }"></div>
  
        <!-- Tab Buttons -->
        <button v-for="(item, index) in tabs" :key="item" ref="tabButtons" class="relative z-10 px-4 border-0 transition-colors duration-300 cursor-pointer" 
          :class="item === modelValue ? `${styleSheet.title}` : ''"
          @click="selectTab(item, index)" >
          {{ item }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
import styleSheet from '~/scripts/styleSheet';

  
  const props = defineProps({
    tabs: Array,
    modelValue: String, // v-model for active tab
  });
  
  const emit = defineEmits(["update:modelValue", 'change']);
  const tabButtons = ref([]);
  const tabWidth = ref(0);
  const tabPosition = ref(0);
  
  const selectTab = (item, index) => {
    emit("update:modelValue", item);
    updateIndicator(index);

    emit('change', item)
  };
  
  const updateIndicator = (index) => {
    if (tabButtons.value[index]) {
      tabWidth.value = tabButtons.value[index].offsetWidth;
      tabPosition.value = tabButtons.value[index].offsetLeft;
    }
  };
  
  onMounted(() => {
    nextTick(() => {
      const activeIndex = props.tabs.indexOf(props.modelValue);
      updateIndicator(activeIndex !== -1 ? activeIndex : 0);
    });
  });
  </script>
  