<script setup lang="ts">
import { useDataStore } from '@/store/data'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type ChartData,
} from 'chart.js'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const dataStore = useDataStore()
const socData = ref<number[]>([])
const currentCharge = ref(0) // 當前充電百分比
const maxCharge = 100 // 最大充電百分比
let chargeInterval: ReturnType<typeof setInterval> | null = null // 用於存儲定時器ID
const animationSpeed = ref(0.5) // 控制動畫速度

// 獲取SOC數據並處理
onMounted(() => {
  socData.value = dataStore.getSocData()
  startCharging()
})

// 在組件卸載時清除定時器
onUnmounted(() => {
  if (chargeInterval) {
    clearInterval(chargeInterval)
  }
})

// 使用緩動函數使充電動畫更加平滑
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3)
}

// 開始充電動畫，使用緩動函數實現平滑過渡
const startCharging = () => {
  let progress = 0

  chargeInterval = setInterval(() => {
    progress += animationSpeed.value

    if (progress <= 100) {
      // 使用緩動函數計算當前充電值
      const easedProgress = easeOutCubic(progress / 100) * 100
      currentCharge.value = Number(easedProgress.toFixed(1))
    } else {
      // 完成一次充電循環後，重置並開始新一輪
      progress = 0
      currentCharge.value = 0
    }
  }, 50) // 更高的更新頻率使動畫更流暢
}

// 為每個柱子設置不同的初始值和最大值，使動畫更有變化
const batteryConfigs = [
  { initialOffset: 5, maxValue: 100 },
  { initialOffset: 0, maxValue: 95 },
  { initialOffset: 10, maxValue: 100 },
  { initialOffset: 2, maxValue: 98 },
  { initialOffset: 8, maxValue: 100 },
  { initialOffset: 3, maxValue: 97 },
]

// 計算每組的充電量，添加一些隨機變化使動畫更自然
const chargedData = computed(() => {
  return batteryConfigs.map((config, index) => {
    // 為每個柱子添加輕微的時間差和最大值差異
    const adjustedCharge = Math.min(
      currentCharge.value + config.initialOffset,
      config.maxValue,
    )

    // 添加輕微的波動效果
    const fluctuation = Math.sin(Date.now() / 1000 + index) * 0.5

    return Number(
      Math.max(0, Math.min(100, adjustedCharge + fluctuation)).toFixed(1),
    )
  })
})

const remainingData = computed(() => {
  return chargedData.value.map((charged) => {
    // 計算剩餘可充電量（100% - 已充電百分比）
    return Number((100 - charged).toFixed(1))
  })
})

// 創建圖表數據
const data = computed<ChartData<'bar'>>(() => ({
  labels: ['SOC1', 'SOC2', 'SOC3', 'SOC4', 'SOC5', 'SOC6'],
  datasets: [
    {
      label: '已充電',
      data: chargedData.value,
      backgroundColor: '#eb9234',
      borderWidth: 0,
      barPercentage: 0.7,
    },
    {
      label: '剩餘容量',
      data: remainingData.value,
      backgroundColor: '#37eb34',
      borderWidth: 1,
      barPercentage: 0.7,
    },
  ],
}))

const option = {
  responsive: true,
  maintainAspectRatio: false,
  width: 600,
  height: 400,
  plugins: {
    title: {
      display: true,
      text: '電池容量',
      color: '#d0fae5',
      font: {
        size: 18,
        color: '#d0fae5',
      },
    },
    legend: {
      labels: {
        color: '#d0fae5',
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: '#d0fae5',
      },
    },
    y: {
      beginAtZero: true,
      stacked: true,
      min: 0,
      max: 100,
      title: {
        display: true,
        text: '容量百分比(%)',
        color: '#d0fae5',
      },
      ticks: {
        color: '#d0fae5',
      },
    },
  },
}
</script>

<template>
  <Bar :data="data" :options="option" />
</template>
