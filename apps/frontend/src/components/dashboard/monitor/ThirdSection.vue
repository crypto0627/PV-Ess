<script setup lang="ts">
import RightIcon from '@/components/dashboard/monitor/icons/RightIcon.vue'
import SolarpanelIcon from '@/components/dashboard/monitor/icons/SolarpanelIcon.vue'
import UpIcon from '@/components/dashboard/monitor/icons/UpIcon.vue'
import { StatusType, borderColorType } from '@/types'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'

const pvdata = 0
const newPvStatus: Ref<StatusType> = ref('warning')

const newPvStatusClass: ComputedRef<borderColorType> = computed(() => {
  switch (newPvStatus.value) {
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
      v-if="pvdata > 0"
      class="w-3/4 h-16 z-10 absolute left-1/4 top-[1004px] flex justify-around items-center"
    >
      <right-icon class="animate-arrow-slow w-full h-full fill-warning" />
      <right-icon class="animate-arrow-slow w-full h-full fill-warning" />
      <right-icon class="animate-arrow-slow w-full h-full fill-warning" />
    </div>
    <div
      v-if="pvdata > 0"
      class="w-16 h-30 z-10 absolute left-[20.5%] top-0 flex flex-col justify-around items-center"
    >
      <up-icon
        class="animate-arrow-slow-reverse w-[70%] h-[70%] fill-warning"
      />
      <up-icon
        class="animate-arrow-slow-reverse w-[70%] h-[70%] fill-warning"
      />
    </div>
    <div
      class="block h-[50%] absolute left-0 top-0 border-dashed border-2"
    ></div>
    <div class="flex flex-col items-start justify-end w-full h-full">
      <div
        class="w-[10%] sm:w-[15%] md:w-[20%] aspect-square p-2 rounded border-dashed border-4 border-yellow-500 mb-2"
        :class="newPvStatusClass"
      >
        <solarpanel-icon class="w-full h-full fill-whiteblack" />
      </div>

      <div class="p-3 rounded border-2 border-info">
        <h3 class="font-bold">{{ $t('main.dashboard.new_pv_system') }}</h3>
        <h4>{{ $t('main.dashboard.generation_amount') }} 1000 kW</h4>
        <h4>
          {{ $t('main.dashboard.battery_status') }}
          <span
            v-if="newPvStatus === 'error'"
            class="text-red-500 font-bold text-xl"
          >
            {{ $t('main.dashboard.error') }}</span
          >
          <span
            v-else-if="newPvStatus === 'warning'"
            class="text-yellow-500 font-bold text-xl"
          >
            {{ $t('main.dashboard.warning') }}</span
          >
          <span v-else class="text-green-500 font-bold text-xl">
            {{ $t('main.dashboard.normal') }}</span
          >
        </h4>
      </div>
    </div>
    <div
      class="absolute z-20 -top-[2%] right-[40%] flex flex-col items-end justify-end"
    >
      <div
        class="rounded-full p-1 border-dashed border-blue-900 border-5"
      ></div>
      <div class="p-3 rounded border-2 border-info mt-2">
        <h3 class="font-bold">{{ $t('main.dashboard.point_c') }}</h3>
        <h4>{{ $t('main.dashboard.generation_amount') }} 1000 kW</h4>
      </div>
    </div>
  </div>
</template>
