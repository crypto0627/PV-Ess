<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
    <Navbar />
    <Hero />
    <Features />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/home/Navbar.vue'
import Hero from '@/components/home/Hero.vue'
import Features from '@/components/home/Features.vue'
</script>
