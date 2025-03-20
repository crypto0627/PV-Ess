<script setup>
import BarChart from '@/components/dashboard/BarChart.vue'
import DoughnutChart from '@/components/dashboard/DoughnutChart.vue'
import LineChart from '@/components/dashboard/LineChart.vue'
import Operation from '@/components/dashboard/Operation.vue'
import TheSystem from '@/components/dashboard/TheSystem.vue'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useDataStore } from '@/store/data'

const stats = [
  { title: 'today_accumulated_income', value: '$62,263' },
  { title: 'this_month_accumulated_income', value: '$2,100,000' },
  { title: 'today_generation_degree', value: '16,384,875' },
  { title: 'abandon_light', value: 'None' },
]

// 控制區域大小的狀態
const isCompact = ref(false)

// 監聽視窗大小變化
const handleResize = () => {
  isCompact.value = window.innerWidth < 1280 || window.innerHeight < 800
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// dashboard data
const dataStore = useDataStore()
const constants = ref(dataStore.constants)
const timeIntervals = ref(dataStore.timeIntervals)
const predictions = ref(dataStore.predictions)
const pcRatioDayAhead = ref(dataStore.pcRatioDayAhead)
const scheduleData = ref(dataStore.scheduleData)

// 模擬電池充電狀態
const currentTime = ref(0)
const maxTimeIndex = timeIntervals.value.length - 1

// 獲取模擬數據
const simulatedData = ref(dataStore.getSimulatedDataForDate('2023-09-30', true))

// 計算當前電池電量百分比
const currentSoCPercentage = computed(() => {
  if (currentTime.value > maxTimeIndex) return 100
  const currentSoC = simulatedData.value[currentTime.value]?.data.soc || 0
  return Math.round((currentSoC / constants.value.BSC) * 100)
})

// 模擬充電過程
let chargeInterval

onMounted(() => {
  chargeInterval = setInterval(() => {
    if (currentTime.value < maxTimeIndex) {
      currentTime.value++
    } else {
      clearInterval(chargeInterval)
    }
  }, 1000) // 每秒更新一次
})

onUnmounted(() => {
  clearInterval(chargeInterval)
})
</script>

<template>
  <div class="flex flex-col gap-2 md:gap-4 z-0">
    <!-- Stats Cards -->
    <div class="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-[#0a3726]/80 text-emerald-100 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-2 md:p-3"
      >
        <div class="text-xs">
          {{ $t(`main.dashboard.${stat.title}`) }}
        </div>
        <div class="font-bold text-xs md:text-sm lg:text-base">
          {{ stat.value }}
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 z-0">
      <!-- 系統監控區域 -->
      <div
        class="col-span-1 bg-[#0a3726]/80 backdrop-blur-[30px] rounded-2xl p-2 md:p-4"
      >
        <h1
          class="text-base md:text-xl font-medium mb-2 md:mb-4 text-emerald-100 flex items-center"
        >
          <span class="mr-2">{{
            $t('main.dashboard.real_time_monitoring')
          }}</span>
        </h1>
        <TheSystem />
      </div>

      <!-- 右側圓餅圖 -->
      <div
        class="col-span-1 bg-[#0a3726]/80 backdrop-blur-[30px] rounded-2xl p-2 md:p-4"
      >
        <!-- 能量條 -->
        <div class="mb-2 md:mb-4 bg-emerald-900/50 rounded-lg p-2 md:p-3">
          <div
            class="flex flex-col sm:flex-row justify-between text-emerald-100 text-xs md:text-sm mb-1"
          >
            <span class="mb-1 sm:mb-0"
              >{{ $t('main.dashboard.total_energy') }}:
              {{ constants.BSC }}MWh</span
            >
            <span
              >{{ $t('main.dashboard.current_charge') }}:
              {{ currentSoCPercentage }}%</span
            >
          </div>
          <div
            class="w-full bg-emerald-900 rounded-full h-3 md:h-4 overflow-hidden"
          >
            <div
              class="bg-emerald-400 h-full rounded-full transition-all duration-1000"
              :style="{ width: `${currentSoCPercentage}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-emerald-100 text-xs mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <div class="h-40 sm:h-60 md:h-72 relative">
          <h1
            class="text-base sm:text-lg md:text-xl font-medium text-emerald-100 flex flex-col sm:flex-row items-center justify-center mb-1 md:mb-2"
          >
            <span class="mb-1 sm:mb-0">{{
              $t('main.dashboard.battery_charge_capacity')
            }}</span>
            <span class="hidden sm:inline-block sm:ml-2 text-xs md:text-sm">{{
              $t(
                'main.dashboard.59_percent_represent_2_61_times_charge_capacity',
              )
            }}</span>
          </h1>
          <div
            class="text-xs text-center text-emerald-100 mb-1 md:mb-2 sm:hidden"
          >
            {{
              $t(
                'main.dashboard.59_percent_represent_2_61_times_charge_capacity',
              )
            }}
          </div>
          <div
            class="absolute inset-0 top-12 sm:top-14 md:top-16 flex items-center justify-center"
          >
            <DoughnutChart class="max-w-full h-auto" />
          </div>
        </div>
        <Operation />
      </div>

      <!-- 長條圖 -->
      <div
        class="col-span-1 bg-[#0a3726]/80 backdrop-blur-[30px] rounded-2xl p-2 md:p-4"
      >
        <h1
          class="text-base md:text-xl font-medium mb-2 md:mb-4 text-emerald-100 flex items-center"
        >
          {{ $t('main.dashboard.individual_battery_cabinet_amount') }}
        </h1>
        <div class="h-36 md:h-48 relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <BarChart />
          </div>
        </div>
      </div>

      <!-- 折線圖 -->
      <div
        class="col-span-1 bg-[#0a3726]/80 backdrop-blur-[30px] rounded-2xl p-2 md:p-4"
      >
        <h1
          class="text-base md:text-xl font-medium mb-2 md:mb-4 text-emerald-100 flex items-center"
        >
          {{ $t('main.dashboard.factory_generation_amount') }}
        </h1>
        <div class="h-36 md:h-48 relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
