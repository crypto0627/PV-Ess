<template>
  <div class="flex flex-col h-full gap-5">
    <!-- 上半部 (固定大小) -->
    <div
      class="bg-gray-200 p-4 h-[360px] flex justify-center items-center text-center"
    >
      <h1 class="text-xl text-white/80 mb-4">
        {{ $t('main.dashboard.factory_generation_amount') }}
      </h1>

      <!-- 限制 LineChart 的大小 -->
      <div class="w-full h-[300px]">
        <LineChart />
      </div>
    </div>

    <!-- 下半部 (佔據剩餘高度) -->
    <div class="flex-1 bg-gray-300 p-4">
      <h2 class="text-xl font-bold">下半部內容</h2>
      <p>這裡是下半部的內容區域。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from '@/components/dashboard/LineChart.vue'
</script>
