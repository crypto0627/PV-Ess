<script setup lang="ts">
import { useDataStore } from '@/store/data'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { computed, onMounted, ref, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'

// 獲取數據存儲
const dataStore = useDataStore()

// 當前SOC百分比
const currentSocPercentage = ref(0)
const targetSocPercentage = ref(0)
const animationSpeed = ref(1) // 動畫速度控制

// 計算SOC百分比
const calculateSocPercentage = () => {
  const socData = dataStore.getSocData()
  if (socData.length > 0) {
    const latestSoc = socData[socData.length - 1]
    const maxSoc = dataStore.constants.BSC
    return Math.round((latestSoc / maxSoc) * 100)
  }
  return 0
}

// 初始化目標SOC
onMounted(() => {
  targetSocPercentage.value = calculateSocPercentage()
  // 啟動動畫
  animateSoc()
})

// 動畫函數
const animateSoc = () => {
  const animate = () => {
    if (currentSocPercentage.value < targetSocPercentage.value) {
      currentSocPercentage.value += animationSpeed.value
      if (currentSocPercentage.value > targetSocPercentage.value) {
        currentSocPercentage.value = targetSocPercentage.value
      }
      requestAnimationFrame(animate)
    }
  }
  animate()
}

// 監聽數據變化
watch(
  () => dataStore.scheduleData,
  () => {
    targetSocPercentage.value = calculateSocPercentage()
    animateSoc()
  },
  { deep: true },
)

// 圖表數據
const data = computed(() => ({
  labels: ['已充電', '未充電'],
  datasets: [
    {
      backgroundColor: ['#eb9234', '#37eb34'],
      borderWidth: 1,
      borderColor: '#ffffff',
      data: [currentSocPercentage.value, 100 - currentSocPercentage.value],
    },
  ],
}))

// 圖表選項
const option = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '50%',
  plugins: {
    legend: {
      labels: {
        color: '#d0fae5',
        display: true,
        position: 'top',
      },
    },
    centerText: {
      text: `${currentSocPercentage.value}%`,
      color: '#d0fae5',
      font: {
        size: '18',
        weight: 'bold',
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 2,
    },
  },
  animation: {
    duration: 500,
  },
}))

// 自定義插件，在中心繪製文字
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart: { options?: any; width?: any; height?: any; ctx?: any }) {
    const { width, height, ctx } = chart
    ctx.save()

    // 根據視窗寬度調整字型大小
    const minFontSize = 12 // 最小字型大小
    const maxFontSize = (height / 8).toFixed(2) // 最大字型大小
    const fontSize = Math.max(minFontSize, Number(maxFontSize))

    ctx.font = `${fontSize}px Arial`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'

    const text = chart.options.plugins.centerText.text || ''
    const textX = width / 2
    const textY = height / 2

    ctx.fillStyle = chart.options.plugins.centerText.color
    ctx.fillText(text, textX, textY)
    ctx.restore()
  },
}

ChartJS.register(ArcElement, Tooltip, Legend, centerTextPlugin)
</script>

<template>
  <div class="chart-container">
    <Doughnut :data="data" :options="option" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
