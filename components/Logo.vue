<template>
    <img v-if="colorMode == 'dark'" src="~/assets/images/logo-white.svg" alt="logo light" width="45">
    <img v-else src="~/assets/images/logo-icon.svg" alt="logo dark" width="45">
</template>

<script setup lang="ts">
const { colorMode } = useDarkMode();

</script>