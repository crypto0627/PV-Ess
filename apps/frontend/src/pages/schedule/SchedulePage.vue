<template>
  <div class="flex flex-col h-full gap-5">
    <!-- 上半部 (固定大小) -->
    <div class="flex flex-col items-center">
      <h1 class="text-xl text-white/80 mb-4">
        {{ $t('main.dashboard.factory_generation_amount') }}
      </h1>

      <!-- 限制 LineChart 的大小 -->
      <div class="w-full flex justify-center">
        <ScheduleChart />
      </div>
    </div>

    <!-- 下半部 (佔據剩餘高度) -->
    <Scrollform />
  </div>
</template>

<script setup lang="ts">
import ScheduleChart from '@/components/schedule/ScheduleChart.vue'
import Scrollform from '@/components/schedule/Scrollform.vue'
</script>
