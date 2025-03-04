<script setup lang="ts">
import BatteryIcon from '@/components/dashboard/monitor/icons/BatteryIcon.vue'
import DownIcon from '@/components/dashboard/monitor/icons/DownIcon.vue'
import LeftIcon from '@/components/dashboard/monitor/icons/LeftIcon.vue'
import RightIcon from '@/components/dashboard/monitor/icons/RightIcon.vue'
import UpIcon from '@/components/dashboard/monitor/icons/UpIcon.vue'
import { StatusType, borderColorType } from '@/types'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'

const batteryStatus: Ref<StatusType> = ref('error')
const esdata = 0

const batteryStatusClass: ComputedRef<borderColorType> = computed(() => {
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
      class="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 z-10 absolute left-[1004.5px] top-[1020px] flex justify-around items-start"
    >
      <down-icon class="animate-arrow-delay w-full h-full fill-danger" />
    </div>
    <div
      v-if="esdata < 0"
      class="w-3/4 h-8 sm:h-10 md:h-12 z-10 absolute left-0 top-[1004px] flex justify-around items-center"
    >
      <right-icon class="animate-arrow-slower w-full h-full fill-danger" />
      <right-icon class="animate-arrow-slower w-full h-full fill-danger" />
      <right-icon class="animate-arrow-slower w-full h-full fill-danger" />
    </div>
    <div
      v-else-if="esdata > 0"
      class="w-3/4 h-8 sm:h-10 md:h-12 z-10 absolute left-0 top-[1004px] flex justify-around items-center"
    >
      <left-icon
        class="animate-arrow-slower-reverse w-full h-full fill-warning"
      />
      <left-icon
        class="animate-arrow-slower-reverse w-full h-full fill-warning"
      />
      <left-icon
        class="animate-arrow-slower-reverse w-full h-full fill-warning"
      />
    </div>
    <div
      v-if="esdata > 0"
      class="w-8 sm:w-10 md:w-12 h-24 sm:h-28 md:h-32 z-10 absolute left-[69.5%] top-0 flex flex-col justify-around items-center"
    >
      <up-icon
        class="animate-arrow-slower-reverse w-[70%] h-full fill-warning"
      />
      <up-icon
        class="animate-arrow-slower-reverse w-[70%] h-full fill-warning"
      />
    </div>
    <div
      v-else-if="esdata < 0"
      class="w-8 sm:w-10 md:w-12 h-24 sm:h-28 md:h-32 z-10 absolute left-[69.5%] top-0 flex flex-col justify-around items-center"
    >
      <down-icon class="animate-arrow-slower w-[70%] h-full fill-danger" />
      <down-icon class="animate-arrow-slower w-[70%] h-full fill-danger" />
    </div>
    <div class="flex flex-col items-end justify-end w-full h-full">
      <div
        class="w-[10%] sm:w-[15%] md:w-[20%] aspect-square p-2 rounded border-dashed border-4"
        :class="batteryStatusClass"
      >
        <battery-icon class="w-full h-full fill-whiteblack" />
      </div>
      <div class="p-3 rounded border-2 border-info mt-2">
        <h3 class="font-bold">
          {{ $t('main.dashboard.energy_storage_system') }}
        </h3>
        <h4 v-if="esdata < 0">
          {{ $t('main.dashboard.today_charging_amount') }} 1000 kW
        </h4>
        <h4 v-else>{{ $t('main.dashboard.discharge_amount') }} 1000 kW</h4>
        <h4>
          {{ $t('main.dashboard.battery_status') }}
          <span
            v-if="batteryStatus === 'error'"
            class="text-red-500 font-bold text-xl"
          >
            {{ $t('main.dashboard.error') }}</span
          >
          <span
            v-else-if="batteryStatus === 'warning'"
            class="text-yellow-500 font-bold text-xl"
          >
            {{ $t('main.dashboard.warning') }}</span
          >
          <span v-else class="text-green-500 font-bold text-xl">正常</span>
        </h4>
      </div>
    </div>
    <div
      class="absolute z-20 -top-[2%] right-[40%] flex flex-col items-start justify-start"
    >
      <div class="rounded-full p-1 border-dashed border-4 sm:border-5"></div>
      <div class="p-3 rounded border-2 border-info mt-5 sm:mt-4 xl:mt-2">
        <h3 class="font-bold">{{ $t('main.dashboard.point_b') }}</h3>
        <h4 v-if="esdata < 0">
          {{ $t('main.dashboard.today_charging_amount') }} 1000 kW
        </h4>
        <h4 v-else>{{ $t('main.dashboard.discharge_amount') }} 1000 kW</h4>
      </div>
    </div>
    <div
      class="absolute opacity-100 sm:opacity-0 z-20 w-3/4 h-1/2 top-[1033px] left-[1004.5px] flex flex-col items-end justify-start"
    >
      <div class="p-3 rounded border-2 border-info mt-5 sm:mt-4 xl:mt-2">
        <h3 class="font-bold">{{ $t('main.dashboard.point_b') }}</h3>
        <h4 v-if="esdata < 0">
          {{ $t('main.dashboard.today_charging_amount') }} 1000 kW
        </h4>
        <h4 v-else>{{ $t('main.dashboard.discharge_amount') }} 1000 kW</h4>
      </div>
      <div
        class="rounded-[5px] p-1 w-[2.5rem] sm:w-[3rem] md:w-[3.5rem] h-[2.5rem] sm:h-[3rem] md:h-60 border-dashed border-4 sm:border-5"
      ></div>
    </div>
  </div>
</template>
