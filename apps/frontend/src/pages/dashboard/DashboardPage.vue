<template>
  <div>
    <!-- 遮罩層 (z-40) -->
    <div
      v-if="isFullscreen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="exitFullscreen"
    ></div>

    <!-- 主要內容容器 (全屏時z-50) -->
    <div
      @click="enterFullscreen"
      class="relative md:absolute top-[102px] left-6 right-6 bottom-11 rounded-2xl bg-white/10 backdrop-blur-[30px] border border-white/10 shadow-lg p-4 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden"
      :class="{
        'fixed inset-0 m-0 p-4 md:p-6 rounded-none z-50 bg-transparent cursor-default':
          isFullscreen,
        'md:left-[290px]': !isFullscreen // Add margin on medium screens and above
      }"
    >
      <!-- 新增關閉按鈕 (僅全屏顯示) -->
      <button
        v-if="isFullscreen"
        @click.stop="exitFullscreen"
        class="absolute top-0 right-0 text-white/80 hover:text-white transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-9 gap-4 md:gap-6 h-full"
      >
        <!-- 左側區塊 -->
        <div class="grid grid-cols-1 gap-4 md:w-full lg:col-span-2">
          <div class="grid grid-cols-2 gap-1 text-center">
            <div
              class="bg-blue-700/30 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-2"
            >
              <div class="text-white/80 text-sm">
                {{ $t('main.dashboard.today_accumulated_income') }}
              </div>
              <div class="text-white font-bold text-lg">$62,263</div>
            </div>
            <div
              class="bg-blue-700/30 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-2"
            >
              <div class="text-white/80 text-sm">
                {{ $t('main.dashboard.this_month_accumulated_income') }}
              </div>
              <div class="text-white font-bold text-lg">$2,100,000</div>
            </div>
            <div
              class="bg-blue-700/30 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-2"
            >
              <div class="text-white/80 text-sm">
                {{ $t('main.dashboard.today_generation_degree') }}
              </div>
              <div class="text-white font-bold text-lg">16,384,875</div>
            </div>
            <div
              class="bg-blue-700/30 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-2"
            >
              <div class="text-white/80 text-sm">
                {{ $t('main.dashboard.abandon_light') }}
              </div>
              <div class="text-white font-bold text-lg">
                {{ $t('main.dashboard.none') }}
              </div>
            </div>
          </div>
          <div
            class="grid grid-rows-3 text-white/90 gap-1 border border-white/20 rounded-lg overflow-hidden"
          >
            <!-- 上方 1/3 區塊 -->
            <div
              class="bg-blue-500/40 flex flex-col justify-center text-center text-lg font-semibold p-2"
            >
              {{ $t('main.dashboard.today_PV_accumulated_amount_kWh') }}
            </div>
            <!-- 下方 2/3 區塊 -->
            <div class="row-span-2 grid grid-cols-2 gap-1">
              <div
                class="bg-blue-700/30 flex flex-col justify-center text-center p-2 font-medium"
              >
                {{ $t('main.dashboard.generation_amount') }}
              </div>
              <div
                class="bg-blue-700/30 flex flex-col justify-center text-center p-2 font-medium"
              >
                {{ $t('main.dashboard.grid_output') }}
              </div>
              <div
                class="bg-blue-900 flex flex-col justify-center text-center p-2"
              >
                22145.75
              </div>
              <div
                class="bg-blue-900 flex flex-col justify-center text-center p-2"
              >
                16384.875
              </div>
            </div>
          </div>
          <div
            class="grid grid-rows-3 text-white/90 gap-1 border border-white/20 rounded-lg overflow-hidden mt-4"
          >
            <!-- 上方 1/3 區塊 -->
            <div
              class="bg-blue-500/40 flex flex-col justify-center text-center text-lg font-semibold p-2"
            >
              {{ $t('main.dashboard.today_BESS_accumulated_amount_kWh') }}
            </div>
            <!-- 下方 2/3 區塊 -->
            <div class="row-span-2 grid grid-cols-3 gap-1">
              <div
                class="bg-blue-700/30 flex flex-col justify-center text-center p-2 font-medium"
              >
                {{ $t('main.dashboard.today_charging_amount') }}
              </div>
              <div
                class="bg-blue-700/30 flex flex-col justify-center text-center p-2 font-medium"
              >
                SOC
              </div>
              <div
                class="bg-blue-700/30 flex flex-col justify-center text-center p-2 font-medium"
              >
                {{ $t('main.dashboard.discharge_amount') }}
              </div>
              <div
                class="bg-blue-900 flex flex-col justify-center text-center p-2"
              >
                5760.875
              </div>
              <div
                class="bg-blue-900 flex flex-col justify-center text-center p-2"
              >
                6737
              </div>
              <div
                class="bg-blue-900 flex flex-col justify-center text-center p-2"
              >
                0
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-rows-5 gap-4 md:w-full lg:col-span-4">
          <div
            class="row-span-3 bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10"
          ></div>
          <div
            class="row-span-2 bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center"
          >
            <h1 class="h-1/5 text-xl text-white/80">
              {{ $t('main.dashboard.factory_generation_amount') }}
            </h1>
            <div class="h-4/5 w-full flex justify-center">
              <LineChart :isFullscreen="isFullscreen" />
            </div>
          </div>
        </div>

        <!-- 右側區塊 1.5份 -->
        <div class="grid grid-rows-4 gap-4 md:col-span-3">
          <div
            class="row-span-2 bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center"
          >
            <h1 class="h-1/5 text-xl text-white/80">
              {{ $t('main.dashboard.individual_battery_cabinet_amount') }}
            </h1>
            <div class="flex justify-center w-full">
              <BarChart :isFullscreen="isFullscreen" />
            </div>
          </div>
          <div
            class="row-span-2 bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center"
          >
            <h1 class="h-1/5 text-xl text-white/80">
              {{ $t('main.dashboard.total_energy') }}
            </h1>

            <div class="flex justify-center">
              <DoughnutChart :isFullscreen="isFullscreen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BarChart from '@/components/dashboard/BarChart.vue'
import DoughnutChart from '@/components/dashboard/DoughnutChart.vue'
import LineChart from '@/components/dashboard/LineChart.vue'
import { ref } from 'vue'

const isFullscreen = ref(false)

const enterFullscreen = () => {
  if (!isFullscreen.value) {
    isFullscreen.value = true
    // 鎖定頁面滾動
    document.body.classList.add('overflow-hidden')
  }
}

const exitFullscreen = () => {
  isFullscreen.value = false
  // 恢復頁面滾動
  document.body.classList.remove('overflow-hidden')
}
</script>
