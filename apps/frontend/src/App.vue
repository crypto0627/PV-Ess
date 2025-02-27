<script setup>
import Footer from './components/common/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen rounded-2xl">
    <router-view />
    <Footer />
  </div>
</template>
