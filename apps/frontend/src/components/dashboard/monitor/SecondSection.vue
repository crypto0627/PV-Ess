<script setup lang="ts">
import RightIcon from '@/components/dashboard/monitor/icons/RightIcon.vue'
import SolarpanelIcon from '@/components/dashboard/monitor/icons/SolarpanelIcon.vue'
import UpIcon from '@/components/dashboard/monitor/icons/UpIcon.vue'

const pvdata = 0
</script>
<template>
  <div class="w-full h-full relative">
    <div
      v-if="pvdata > 0"
      class="w-[30%] h-6 sm:h-8 md:h-10 z-10 absolute left-[35%] top-[45%] flex justify-around items-center"
    >
      <RightIcon class="animate-arrow w-full h-full fill-warning" />
      <RightIcon class="animate-arrow w-full h-full fill-warning" />
      <RightIcon class="animate-arrow w-full h-full fill-warning" />
      <RightIcon class="animate-arrow w-full h-full fill-warning" />
    </div>
    <div
      v-if="pvdata > 0"
      class="w-[30%] h-6 sm:h-8 md:h-10 z-10 absolute left-[30%] top-[70%] flex justify-around items-center"
    >
      <UpIcon class="animate-arrow w-full h-full fill-warning" />
    </div>
    <div
      class="block w-[100%] h-[0.1rem] absolute left-0 top-0 border-dashed border-2"
    ></div>
    <div
      class="block w-[100%] h-[0.1rem] absolute left-0 top-[100%] border-dashed border-2"
    ></div>
    <div
      class="block w-[0.1rem] h-[100%] absolute left-[100%] top-0 border-dashed border-2"
    ></div>
    <div
      class="flex flex-col items-start justify-start w-full sm:w-3/4 md:w-1/2 h-auto"
    >
      <div class="p-2 sm:p-3 rounded border-2">
        <h3 class="font-bold text-sm sm:text-base md:text-lg">
          {{ $t('main.dashboard.old_pv_system') }}
        </h3>
        <h4 class="text-xs sm:text-sm md:text-base">
          {{ $t('main.dashboard.generation_amount') }} 1000 kW
        </h4>
        <h4 class="text-xs sm:text-sm md:text-base">
          {{ $t('main.dashboard.battery_status') }}
          <span class="text-red-500 font-bold text-base sm:text-lg md:text-xl">
            {{ $t('main.dashboard.error') }}</span
          >
          <span
            class="text-yellow-500 font-bold text-base sm:text-lg md:text-xl"
          >
            {{ $t('main.dashboard.warning') }}</span
          >
          <span
            class="text-green-500 font-bold text-base sm:text-lg md:text-xl"
          >
            {{ $t('main.dashboard.normal') }}</span
          >
        </h4>
      </div>
      <div
        class="w-[30%] sm:w-[35%] md:w-[40%] aspect-square p-1 sm:p-1.5 md:p-2 rounded border-dashed border-black border-4 mt-2"
      >
        <SolarpanelIcon class="w-full h-full fill-whiteblack" />
      </div>
    </div>
  </div>
</template>
