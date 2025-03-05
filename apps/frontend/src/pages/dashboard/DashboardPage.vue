<template>
  <div class="flex flex-col gap-4">
    <!-- Stats Cards -->
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-[#0a3726]/80 text-white backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-3"
      >
        <div class="text-xs">
          {{ $t(`main.dashboard.${stat.title}`) }}
        </div>
        <div class="font-bold text-sm md:text-base">{{ stat.value }}</div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- 系統監控區域 -->
      <div
        class="lg:col-span-2 bg-gray-900/30 backdrop-blur-[30px] rounded-2xl p-4"
      >
        <h1 class="text-base mb-2">
          {{ $t('main.dashboard.real_time_monitoring') }}
        </h1>
        <TheSystem />
      </div>

      <!-- 右側圓餅圖 -->
      <div
        class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-3 border border-white/10"
      >
        <h1 class="text-base mb-2">
          {{ $t('main.dashboard.total_energy') }}: 11.5MWh
        </h1>
        <div class="h-72 relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <DoughnutChart />
          </div>
        </div>
        <div class="mt-4 p-3 bg-white/5 rounded-xl">
          <h2 class="text-sm font-medium mb-2">
            {{ $t('main.dashboard.real_time_monitoring') }}
          </h2>
          <div class="text-xs space-y-1">
            <div class="flex justify-between">
              <span>{{ $t('main.dashboard.energy_storage_system') }}</span>
              <span>{{ $t('main.dashboard.generation_amount') }} 1000 kW</span>
            </div>
            <div class="flex justify-between">
              <span>{{ $t('main.dashboard.new_pv_system') }}</span>
              <span>{{ $t('main.dashboard.generation_amount') }} 1000 kW</span>
            </div>
            <div class="flex justify-between">
              <span>{{ $t('main.dashboard.old_pv_system') }}</span>
              <span>{{ $t('main.dashboard.generation_amount') }} 1000 kW</span>
            </div>
            <div class="flex justify-between">
              <span>{{ $t('main.dashboard.grid_output') }}</span>
              <span>{{ $t('main.dashboard.frequency') }} 60 Hz</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 長條圖 -->
      <div
        class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-3 border border-white/10"
      >
        <h1 class="text-base mb-2">
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
        class="lg:col-span-2 bg-white/10 backdrop-blur-[30px] rounded-2xl p-3 border border-white/10"
      >
        <h1 class="text-base mb-2">
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

<script setup>
import BarChart from '@/components/dashboard/BarChart.vue'
import DoughnutChart from '@/components/dashboard/DoughnutChart.vue'
import LineChart from '@/components/dashboard/LineChart.vue'
import TheSystem from '@/components/dashboard/monitor/TheSystem.vue'

const stats = [
  { title: 'today_accumulated_income', value: '$62,263' },
  { title: 'this_month_accumulated_income', value: '$2,100,000' },
  { title: 'today_generation_degree', value: '16,384,875' },
  { title: 'abandon_light', value: 'None' },
]
</script>
