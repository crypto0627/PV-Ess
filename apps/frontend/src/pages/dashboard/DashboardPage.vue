<template>
  <!-- 主網格容器：適應不同螢幕尺寸 -->
  <div class="container mx-auto px-2 py-4">
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- 左側區塊：在小螢幕上全寬，大螢幕保持為第一欄 -->
      <div class="flex flex-col gap-4">
        <!-- 統計數據卡片：小螢幕單欄，中等螢幕雙欄 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            class="bg-blue-700/30 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-4"
          >
            <div class="text-white/80 text-xs sm:text-sm">
              {{ $t('main.dashboard.today_accumulated_income') }}
            </div>
            <div class="text-white font-bold text-base md:text-lg">$62,263</div>
          </div>
          <div
            class="bg-blue-700/30 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-4"
          >
            <div class="text-white/80 text-xs sm:text-sm">
              {{ $t('main.dashboard.this_month_accumulated_income') }}
            </div>
            <div class="text-white font-bold text-base md:text-lg">
              $2,100,000
            </div>
          </div>
          <div
            class="bg-blue-700/30 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-4"
          >
            <div class="text-white/80 text-xs sm:text-sm">
              {{ $t('main.dashboard.today_generation_degree') }}
            </div>
            <div class="text-white font-bold text-base md:text-lg">
              16,384,875
            </div>
          </div>
          <div
            class="bg-blue-700/30 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-4"
          >
            <div class="text-white/80 text-xs sm:text-sm">
              {{ $t('main.dashboard.abandon_light') }}
            </div>
            <div class="text-white font-bold text-base md:text-lg">
              {{ $t('main.dashboard.none') }}
            </div>
          </div>
        </div>

        <!-- 第一個資訊區塊：優化在小螢幕上的顯示 -->
        <div
          class="grid grid-rows-3 text-white/90 gap-1 border border-white/20 rounded-lg overflow-hidden"
        >
          <!-- 上方 1/3 區塊 -->
          <div
            class="bg-blue-500/40 flex flex-col justify-center text-center text-base sm:text-lg font-semibold p-2"
          >
            {{ $t('main.dashboard.today_PV_accumulated_amount_kWh') }}
          </div>
          <!-- 下方 2/3 區塊 -->
          <div class="row-span-2 grid grid-cols-2 gap-1">
            <div
              class="bg-blue-700/30 flex flex-col justify-center text-center p-2 text-sm md:text-base font-medium"
            >
              {{ $t('main.dashboard.generation_amount') }}
            </div>
            <div
              class="bg-blue-700/30 flex flex-col justify-center text-center p-2 text-sm md:text-base font-medium"
            >
              {{ $t('main.dashboard.grid_output') }}
            </div>
            <div
              class="bg-blue-900 flex flex-col justify-center text-center p-2 text-sm md:text-base"
            >
              22145.75
            </div>
            <div
              class="bg-blue-900 flex flex-col justify-center text-center p-2 text-sm md:text-base"
            >
              16384.875
            </div>
          </div>
        </div>

        <!-- 第二個資訊區塊：優化在小螢幕上的顯示 -->
        <div
          class="grid grid-rows-3 text-white/90 gap-1 border border-white/20 rounded-lg overflow-hidden"
        >
          <!-- 上方 1/3 區塊 -->
          <div
            class="bg-blue-500/40 flex flex-col justify-center text-center text-base sm:text-lg font-semibold p-2"
          >
            {{ $t('main.dashboard.today_BESS_accumulated_amount_kWh') }}
          </div>
          <!-- 下方 2/3 區塊：在小螢幕上調整為更合適的排列 -->
          <div class="row-span-2 grid grid-cols-2 gap-1">
            <div
              class="bg-blue-700/30 flex flex-col justify-center text-center p-2 text-sm md:text-base font-medium"
            >
              {{ $t('main.dashboard.today_charging_amount') }}
            </div>
            <div
              class="bg-blue-700/30 flex flex-col justify-center text-center p-2 text-sm md:text-base font-medium"
            >
              SOC
            </div>
            <div
              class="bg-blue-700/30 flex flex-col justify-center text-center p-2 text-sm md:text-base font-medium"
            >
              {{ $t('main.dashboard.discharge_amount') }}
            </div>
            <div
              class="bg-blue-900 flex flex-col justify-center text-center p-2 text-sm md:text-base"
            >
              5760.875
            </div>
            <div
              class="bg-blue-900 flex flex-col justify-center text-center p-2 text-sm md:text-base"
            >
              6737
            </div>
            <div
              class="bg-blue-900 flex flex-col justify-center text-center p-2 text-sm md:text-base"
            >
              0
            </div>
          </div>
        </div>
      </div>

      <!-- 中間區塊：在小螢幕上全寬，xl以上成為中間列 -->
      <div class="flex flex-col gap-4">
        <!-- 上方內容區，可依需求放置其他資訊 -->
        <div
          class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10 flex-1 min-h-40"
        ></div>
        <!-- 下方圖表區塊，置中顯示 LineChart -->
        <div
          class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10 flex flex-col items-center flex-1"
        >
          <h1 class="text-lg sm:text-xl text-white/80 mb-4">
            {{ $t('main.dashboard.factory_generation_amount') }}
          </h1>
          <div class="w-full h-64 md:h-72 relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-full h-full flex items-center justify-center">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側區塊：在小螢幕上全寬，xl以上成為第三列 -->
      <div class="flex flex-col gap-4">
        <!-- 上方圖表區塊，置中顯示 BarChart -->
        <div
          class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10 flex flex-col items-center flex-1"
        >
          <h1 class="text-lg sm:text-xl text-white/80 mb-4">
            {{ $t('main.dashboard.individual_battery_cabinet_amount') }}
          </h1>
          <div class="w-full h-64 md:h-72 relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-full h-full flex items-center justify-center">
                <BarChart />
              </div>
            </div>
          </div>
        </div>
        <!-- 下方圖表區塊，置中顯示 DoughnutChart -->
        <div
          class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10 flex flex-col items-center flex-1"
        >
          <h1 class="text-lg sm:text-xl text-white/80 mb-4">
            {{ $t('main.dashboard.total_energy') }}
          </h1>
          <div class="w-full h-64 md:h-72 relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-full h-full flex items-center justify-center">
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BarChart from '@/components/dashboard/BarChart.vue'
import DoughnutChart from '@/components/dashboard/DoughnutChart.vue'
import LineChart from '@/components/dashboard/LineChart.vue'
</script>
