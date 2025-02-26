<template>
  <div class="flex flex-col h-full gap-5">
    <!-- 控制區 -->
    <div class="flex justify-between items-center gap-4 p-4">
      <div class="flex items-center gap-4">
        <!-- 日期選擇 -->
        <input
          type="month"
          v-model="selectedMonth"
          class="bg-gray-700/50 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />

        <!-- 圖表選擇 -->
        <div class="relative">
          <select
            v-model="selectedChart"
            class="bg-gray-700/50 hover:bg-gray-700 text-white px-4 py-2 rounded-md appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all pr-8"
          >
            <option v-for="(title, key) in chartTitles" :key="key" :value="key">
              {{ title }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- 報表類型選擇 -->
      <div class="flex items-center gap-4">
        <button
          v-for="type in ['yearly', 'quarterly', 'monthly']"
          :key="type"
          class="bg-gray-700/50 hover:bg-gray-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          :class="{ 'bg-blue-500 hover:bg-blue-600': reportType === type }"
          @click="reportType = type"
        >
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}
        </button>
      </div>
    </div>

    <!-- 上半部 - 圖表 -->
    <div class="flex-1 bg-gray-800/50 rounded-lg p-4 shadow-lg">
      <h2 class="text-white/80 mb-4 text-lg font-semibold">Report Summary</h2>
      <component
        :is="chartComponents[selectedChart]"
        class="w-full h-[400px] bg-gray-900/20 rounded-lg p-4"
        :reportType="reportType"
        :selectedMonth="selectedMonth"
      />
    </div>

    <!-- 下半部 -->
    <div class="flex-1 bg-gray-800/50 rounded-lg p-4 shadow-lg">
      <h2 class="text-white/80 mb-4 text-lg font-semibold">Detailed Report</h2>
      <!-- 這裡可以放置下半部的詳細報表內容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ReportAuxChart from '@/components/report/chart/ReportAuxChart.vue'
import ReportAverageBarChart from '@/components/report/chart/ReportAverageBarChart.vue'
import ReportHighInputChart from '@/components/report/chart/ReportHighInputChart.vue'
import ReportHighOutputChart from '@/components/report/chart/ReportHighOutputChart.vue'
import ReportHighPowerChart from '@/components/report/chart/ReportHighPowerChart.vue'
import { ref } from 'vue'

// 當前選擇的月份
const selectedMonth = ref(new Date().toISOString().slice(0, 7))

// 當前選擇的報表類型
const reportType = ref<'monthly' | 'quarterly' | 'yearly'>('monthly')

// 可用的圖表組件
const chartComponents = {
  ReportAverageBarChart,
  ReportAuxChart,
  ReportHighOutputChart,
  ReportHighInputChart,
  ReportHighPowerChart
}

// 圖表標題對應表
const chartTitles = {
  ReportAverageBarChart: 'Average Execution Rate (%)',
  ReportAuxChart: 'Auxiliary Power Consumption (kWh)',
  ReportHighOutputChart: 'High Voltage Side Output Power (kWh)',
  ReportHighInputChart: 'High Voltage Side Input Power (kWh)',
  ReportHighPowerChart: 'High Voltage Side Power Loss (kWh)'
}

// 當前選擇的圖表，預設第一個
const selectedChart = ref<keyof typeof chartComponents>(
  Object.keys(chartComponents)[0] as keyof typeof chartComponents
)
</script>
