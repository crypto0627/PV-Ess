<template>
  <header
    class="border-b border-gray-300 p-3.5 flex items-center justify-start lg:justify-end pl-4 lg:pl-16 pr-6 bg-white"
  >
    <!-- Mobile Menu Button -->
    <button
      @click="toggleSidebar"
      class="lg:hidden p-2 rounded-md hover:bg-gray-100"
    >
      <Menu class="h-5 w-5 text-gray-500" />
    </button>

    <div class="hidden lg:flex items-center gap-4">
      <AvatarMenu />
    </div>
  </header>
</template>

<script setup>
import { Menu } from 'lucide-vue-next'
import { defineEmits } from 'vue'
import AvatarMenu from '../common/AvatarMenu.vue'

const emit = defineEmits(['toggle-sidebar'])

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>
