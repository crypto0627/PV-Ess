<template>
  <div class="flex flex-col h-full gap-6 p-6 bg-white">
    <!-- 控制區 -->
    <div
      class="flex justify-between items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200"
    >
      <div class="flex flex-col md:flex-row items-center gap-4">
        <!-- 日期選擇 -->
        <input
          type="month"
          v-model="selectedMonth"
          class="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-md cursor-pointer focus:outline-none transition-all"
        />

        <!-- 圖表選擇 -->
        <div class="relative w-full md:w-64">
          <button
            @click="toggleMenu"
            class="w-full px-4 py-3 text-sm md:text-base bg-gray-100 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 transition-colors flex justify-between items-center"
          >
            <span>{{ chartTitles[selectedChart] || 'Select a chart...' }}</span>
            <svg
              class="w-5 h-5 transform transition-transform"
              :class="{ 'rotate-180': isMenuOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            v-if="isMenuOpen"
            class="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div
              v-for="(title, key) in chartTitles"
              :key="key"
              @click="handleSelectedChart(key)"
              class="px-4 py-2 text-sm md:text-base text-black hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {{ title }}
            </div>
          </div>
        </div>
      </div>

      <!-- 報表類型選擇 -->
      <div class="flex flex-col md:flex-row items-center gap-4">
        <button
          v-for="type in ['yearly', 'quarterly', 'monthly']"
          :key="type"
          class="text-black px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-500 focus:outline-none transition-all"
          :class="{
            'bg-blue-500 hover:bg-blue-600 text-white': reportType === type,
          }"
          @click="reportType = type as 'monthly' | 'quarterly' | 'yearly'"
        >
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-4 border border-gray-200">
      <h2 class="text-black mb-4 text-lg font-semibold">Report Summary</h2>
      <div class="w-full h-[400px] relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <component
            :is="chartComponents[selectedChart]"
            :reportType="reportType"
            :selectedMonth="selectedMonth"
          />
        </div>
      </div>
    </div>

    <!-- 下半部 -->
    <div class="bg-white rounded-2xl p-4 border border-gray-200">
      <h2 class="text-black mb-4 text-lg font-semibold">Detailed Report</h2>
      <div class="overflow-y-auto max-h-[400px]">
        <table class="w-full text-black">
          <thead class="relative top-0 bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left">Date</th>
              <th class="px-4 py-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in tableData"
              :key="index"
              class="hover:bg-gray-100 transition-colors"
            >
              <td class="px-4 py-2">{{ item.date }}</td>
              <td class="px-4 py-2">{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReportAuxChart from '@/components/report/chart/ReportAuxChart.vue'
import ReportAverageBarChart from '@/components/report/chart/ReportAverageBarChart.vue'
import ReportHighInputChart from '@/components/report/chart/ReportHighInputChart.vue'
import ReportHighOutputChart from '@/components/report/chart/ReportHighOutputChart.vue'
import ReportHighPowerChart from '@/components/report/chart/ReportHighPowerChart.vue'
import { computed, ref } from 'vue'

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
  ReportHighPowerChart,
}

// 圖表標題對應表
const chartTitles = {
  ReportAverageBarChart: 'Average Execution Rate (%)',
  ReportAuxChart: 'Auxiliary Power Consumption (kWh)',
  ReportHighOutputChart: 'High Voltage Side Output Power (kWh)',
  ReportHighInputChart: 'High Voltage Side Input Power (kWh)',
  ReportHighPowerChart: 'High Voltage Side Power Loss (kWh)',
}

// 當前選擇的圖表，預設第一個
const selectedChart = ref<keyof typeof chartComponents>(
  Object.keys(chartComponents)[0] as keyof typeof chartComponents,
)

// 控制選單開關
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 處理圖表選擇
const handleSelectedChart = (key: keyof typeof chartComponents) => {
  selectedChart.value = key
  isMenuOpen.value = false
}

// 計算表格數據
const tableData = computed(() => {
  const data = []
  if (reportType.value === 'monthly') {
    for (let day = 1; day <= 30; day += 1) {
      data.push({ date: `Day ${day}`, value: 'Sample Data' })
    }
  } else if (reportType.value === 'quarterly') {
    for (let month = 1; month <= 4; month += 1) {
      data.push({ date: `Q${month}`, value: 'Sample Data' })
    }
  } else {
    for (let month = 1; month <= 12; month += 1) {
      data.push({ date: `Month ${month}`, value: 'Sample Data' })
    }
  }
  return data
})
</script>
