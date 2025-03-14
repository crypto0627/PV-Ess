<script setup>
import BarChart from '@/components/dashboard/BarChart.vue'
import DoughnutChart from '@/components/dashboard/DoughnutChart.vue'
import LineChart from '@/components/dashboard/LineChart.vue'
import TheSystem from '@/components/dashboard/monitor/TheSystem.vue'
import Operation from '@/components/dashboard/Operation.vue'

const stats = [
  { title: 'today_accumulated_income', value: '$62,263' },
  { title: 'this_month_accumulated_income', value: '$2,100,000' },
  { title: 'today_generation_degree', value: '16,384,875' },
  { title: 'abandon_light', value: 'None' },
]
</script>

<template>
  <div class="flex flex-col gap-4 z-0">
    <!-- Stats Cards -->
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-[#0a3726]/80 text-emerald-100 backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-3"
      >
        <div class="text-xs">
          {{ $t(`main.dashboard.${stat.title}`) }}
        </div>
        <div class="font-bold text-sm md:text-base">{{ stat.value }}</div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 z-0">
      <!-- 系統監控區域 -->
      <div
        class="col-span-1 bg-[#0a3726]/80 backdrop-blur-[30px] rounded-2xl p-4"
      >
        <h1 class="text-xl font-medium mb-4 text-emerald-100 flex items-center">
          <span class="mr-2">{{
            $t('main.dashboard.real_time_monitoring')
          }}</span>
        </h1>
        <TheSystem />
      </div>

      <!-- 右側圓餅圖 -->
      <div
        class="col-span-1 bg-[#0a3726]/80 backdrop-blur-[30px] rounded-2xl p-4"
      >
        <!-- 能量條 -->
        <div class="mb-4 bg-emerald-900/50 rounded-lg p-3">
          <div class="flex justify-between text-emerald-100 text-sm mb-1">
            <span>{{ $t('main.dashboard.total_energy') }}: 11.5MWh</span>
            <span>{{ $t('main.dashboard.current_charge') }}: 59%</span>
          </div>
          <div class="w-full bg-emerald-900 rounded-full h-4 overflow-hidden">
            <div
              class="bg-emerald-400 h-full rounded-full"
              style="width: 59%"
            ></div>
          </div>
          <div class="flex justify-between text-emerald-100 text-xs mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <div class="h-72 relative">
          <h1
            class="text-xl font-medium text-emerald-100 flex items-center justify-center mb-4 md:mb-2"
          >
            {{ $t('main.dashboard.battery_charge_capacity') }}
            <span class="hidden md:inline-block md:ml-2">{{
              $t(
                'main.dashboard.59_percent_represent_2_61_times_charge_capacity',
              )
            }}</span>
          </h1>
          <div class="text-sm text-center text-emerald-100 mb-2 md:hidden">
            {{
              $t(
                'main.dashboard.59_percent_represent_2_61_times_charge_capacity',
              )
            }}
          </div>
          <div
            class="absolute inset-0 top-12 md:top-10 flex items-center justify-center"
          >
            <DoughnutChart />
          </div>
        </div>
        <Operation />
      </div>

      <!-- 長條圖 -->
      <div
        class="col-span-1 bg-[#0a3726]/80 backdrop-blur-[30px] rounded-2xl p-4"
      >
        <h1 class="text-xl font-medium mb-4 text-emerald-100 flex items-center">
          {{ $t('main.dashboard.individual_battery_cabinet_amount') }}
        </h1>
        <div class="h-48 relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <BarChart />
          </div>
        </div>
      </div>

      <!-- 折線圖 -->
      <div
        class="col-span-1 bg-[#0a3726]/80 backdrop-blur-[30px] rounded-2xl p-4"
      >
        <h1 class="text-xl font-medium mb-4 text-emerald-100 flex items-center">
          {{ $t('main.dashboard.factory_generation_amount') }}
        </h1>
        <div class="h-48 relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
