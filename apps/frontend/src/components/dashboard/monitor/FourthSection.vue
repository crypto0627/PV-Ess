<script setup lang="ts">
import BatteryIcon from '@/components/dashboard/monitor/icons/BatteryIcon.vue'
import DownIcon from '@/components/dashboard/monitor/icons/DownIcon.vue'
import UpIcon from '@/components/dashboard/monitor/icons/UpIcon.vue'
import { BorderColorType, StatusType } from '@/types'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'

const batteryStatus: Ref<StatusType> = ref('error')
const esdata = 0

const batteryStatusClass: ComputedRef<BorderColorType> = computed(() => {
  switch (batteryStatus.value) {
    case 'normal':
      return 'border-success'
    case 'warning':
      return 'border-warning'
    case 'error':
      return 'border-danger'
  }
})
</script>
<template>
  <div class="w-full h-full relative">
    <div
      class="block h-[50%] absolute right-0 top-0 border-dashed border-2"
    ></div>
    <div
      v-if="esdata < 0"
      class="w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12 z-10 absolute left-[70%] top-[70%] flex justify-around items-start"
    >
      <DownIcon class="animate-arrow-delay w-full h-full fill-danger" />
    </div>
    <div
      v-if="esdata > 0"
      class="w-6 sm:w-8 md:w-10 lg:w-12 h-20 sm:h-24 md:h-28 lg:h-32 z-10 absolute left-[69.5%] top-0 flex flex-col justify-around items-center"
    >
      <UpIcon
        class="animate-arrow-slower-reverse w-[70%] h-full fill-warning"
      />
      <UpIcon
        class="animate-arrow-slower-reverse w-[70%] h-full fill-warning"
      />
    </div>
    <div
      v-else-if="esdata < 0"
      class="w-6 sm:w-8 md:w-10 lg:w-12 h-20 sm:h-24 md:h-28 lg:h-32 z-10 absolute left-[69.5%] top-0 flex flex-col justify-around items-center"
    >
      <DownIcon class="animate-arrow-slower w-[70%] h-full fill-danger" />
      <DownIcon class="animate-arrow-slower w-[70%] h-full fill-danger" />
    </div>
    <div class="flex flex-col items-end justify-end w-full h-full">
      <div
        class="w-[10%] sm:w-[15%] md:w-[20%] aspect-square p-1 sm:p-1.5 md:p-2 rounded border-dashed border-2 sm:border-3 md:border-4"
        :class="batteryStatusClass"
      >
        <BatteryIcon class="w-full h-full fill-whiteblack" />
      </div>
      <div
        class="p-2 sm:p-2.5 md:p-3 rounded border-2 border-info mt-1 sm:mt-1.5 md:mt-2"
      >
        <h3 class="text-xs sm:text-sm md:text-base font-bold">
          {{ $t('main.dashboard.energy_storage_system') }}
        </h3>
        <h4 v-if="esdata < 0" class="text-xs sm:text-sm md:text-base">
          {{ $t('main.dashboard.today_charging_amount') }} 1000 kW
        </h4>
        <h4 v-else class="text-xs sm:text-sm md:text-base">
          {{ $t('main.dashboard.discharge_amount') }} 1000 kW
        </h4>
        <h4 class="text-xs sm:text-sm md:text-base">
          {{ $t('main.dashboard.battery_status') }}
          <span
            v-if="batteryStatus === 'error'"
            class="text-red-500 font-bold text-sm sm:text-base md:text-xl"
          >
            {{ $t('main.dashboard.error') }}</span
          >
          <span
            v-else-if="batteryStatus === 'warning'"
            class="text-yellow-500 font-bold text-sm sm:text-base md:text-xl"
          >
            {{ $t('main.dashboard.warning') }}</span
          >
          <span
            v-else
            class="text-green-500 font-bold text-sm sm:text-base md:text-xl"
            >正常</span
          >
        </h4>
      </div>
    </div>
  </div>
</template>
