<template>
  <nav
    class="absolute top-6 left-[290px] right-6 flex items-center justify-end gap-4 h-[72px] rounded-2xl p-4 bg-white/10 backdrop-blur-[30px] shadow-lg border border-white/10"
  >
    <button
      class="p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 text-white/90"
    >
      <i class="ai-sun text-xl"></i>
    </button>
    <button
      class="p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 text-white/90 relative"
    >
      <i class="ai-bell text-xl"></i>
      <span
        class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
      ></span>
    </button>
    <AvatarMenu />
  </nav>
</template>

<script setup>
import AvatarMenu from '@/components/common/AvatarMenu.vue'
</script>
