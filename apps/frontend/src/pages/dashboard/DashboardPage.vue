<template>
  <!-- Stats Cards -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="stat in stats"
      :key="stat.title"
      class="bg-[#0a3726]/80 text-white backdrop-blur-[30px] rounded-xl border border-white/10 flex flex-col justify-center p-4"
    >
      <div class="text-xs sm:text-sm">
        {{ $t(`main.dashboard.${stat.title}`) }}
      </div>
      <div class="font-bold text-base md:text-lg">{{ stat.value }}</div>
    </div>
  </div>

  <!-- Charts Section -->
  <div class="mt-6 grid gap-6 md:grid-cols-3">
    <!-- Doughnut Chart -->
    <div
      class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10"
    >
      <h1 class="text-lg sm:text-xl mb-4">Total Energy</h1>
      <div class="w-full h-64 md:h-72 relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <DoughnutChart />
        </div>
      </div>
    </div>

    <!-- Line Chart -->
    <div
      class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10 col-span-2"
    >
      <h1 class="text-lg sm:text-xl mb-4">Factory Generation Amount</h1>
      <div class="w-full h-64 md:h-72 relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <BarChart />
        </div>
      </div>
    </div>

    <!-- Bar Chart -->
    <div
      class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 border border-white/10 col-span-3"
    >
      <h1 class="text-lg sm:text-xl mb-4">Individual Battery Cabinet Amount</h1>
      <div class="w-full h-64 md:h-72 relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <LineChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BarChart from '@/components/dashboard/BarChart.vue'
import DoughnutChart from '@/components/dashboard/DoughnutChart.vue'
import LineChart from '@/components/dashboard/LineChart.vue'

const stats = [
  { title: 'today_accumulated_income', value: '$62,263' },
  { title: 'this_month_accumulated_income', value: '$2,100,000' },
  { title: 'today_generation_degree', value: '16,384,875' },
  { title: 'abandon_light', value: 'None' }
]
</script>
