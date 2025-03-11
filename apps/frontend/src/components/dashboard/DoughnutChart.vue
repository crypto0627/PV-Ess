<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

const data = {
  labels: ['charged', 'recharged'],
  datasets: [
    {
      backgroundColor: ['#eb9234', '#37eb34'],
      borderWidth: 1,
      borderColor: '#ffffff',
      data: [60, 40],
    },
  ],
}

const option = {
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
      text: '59%',
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
}

// Custom plugin to draw text in the center
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
  <Doughnut :data="data" :options="option" />
</template>
