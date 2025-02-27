<template>
  <div class="w-full h-96">
    <Chart
      v-if="isChartReady"
      type="bar"
      :data="chartData"
      :options="chartOptions"
      class="w-full h-full"
    />
  </div>
</template>

<script setup lang="ts">
import { chartData, chartOptions } from '@/utils/BarScheduleChart'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { ref, watchEffect } from 'vue'
import { Chart } from 'vue-chartjs'

// ✅ 註冊所有控制器，確保 Bar 和 Line 正常顯示
ChartJS.register(
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
)

// 🔄 使用 ref 來確保 chartData 是 reactive
const isChartReady = ref(false)

// ✅ 監聽數據變化，確保圖表正確載入
watchEffect(() => {
  isChartReady.value = false
  setTimeout(() => {
    isChartReady.value = true
  }, 100)
})
</script>
