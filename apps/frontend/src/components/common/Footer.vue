<template>
  <footer class="bg-gray-100 py-4 mt-auto">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <div class="flex-1"></div>
      <p class="text-gray-600 flex-1 text-center">&copy; 2025 Fortune ESS</p>
      <div class="flex-1 flex justify-end">
        <LanguageSwitcher v-if="$route.path !== '/home'" direction="up" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
</script>
