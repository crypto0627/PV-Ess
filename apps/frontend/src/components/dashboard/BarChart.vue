<script setup lang="ts">
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
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data: ChartData<'bar'> = {
  labels: ['SOC 1', 'SOC 2', 'SOC 3', 'SOC 4', 'SOC 5', 'SOC 6'],
  datasets: [
    {
      label: 'charged',
      data: [50, 50, 50, 50, 50, 50],
      backgroundColor: '#eb9234',
      borderWidth: 0,
      barPercentage: 0.7,
    },
    {
      label: 'recharged',
      data: [100, 100, 100, 100, 100, 100],
      backgroundColor: '#37eb34',
      borderWidth: 1,
      barPercentage: 0.7,
    },
  ],
}

const option = {
  responsive: true,
  maintainAspectRatio: false,
  width: 600,
  height: 400,
  plugins: {
    title: {
      display: true,
      text: 'capacity',
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
        text: 'Capacity',
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
