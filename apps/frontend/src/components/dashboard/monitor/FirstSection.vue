<script setup lang="ts">
import TowerIcon from '@/components/dashboard/monitor/icons/TowerIcon.vue'
</script>
<template>
  <div class="w-full h-full relative">
    <div
      class="block w-full absolute right-0 top-0 border-dashed border-2"
    ></div>
    <div
      class="block w-full absolute right-0 top-[100%] border-dashed border-2"
    ></div>
    <div class="flex flex-col items-end justify-center w-full h-auto">
      <div class="p-2 md:p-3 rounded border-2">
        <h3 class="font-bold text-sm md:text-base lg:text-lg">
          {{ $t('main.dashboard.grid_output') }}
        </h3>
        <h4 class="text-xs md:text-sm lg:text-base">
          {{ $t('main.dashboard.frequency') }} 60 Hz
        </h4>
      </div>
      <div
        class="w-[30%] md:w-[25%] lg:w-[20%] aspect-square p-1 md:p-2 rounded border-dashed border-green-600 border-4 mt-2"
      >
        <TowerIcon class="w-full h-full fill-whiteblack" />
      </div>
    </div>
  </div>
</template>
