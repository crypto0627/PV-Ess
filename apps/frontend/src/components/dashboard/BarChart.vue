<template>
  <Bar :data="data" :options="option" />
</template>

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
      backgroundColor: '#2b8a3e',
      borderWidth: 0,
      barPercentage: 0.7,
    },
    {
      label: 'recharged',
      data: [100, 100, 100, 100, 100, 100],
      backgroundColor: '#ffc107',
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
      font: {
        size: 18,
        color: 'black',
      },
    },
    legend: {
      labels: {
        color: 'black',
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: 'black',
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
        color: 'black',
      },
      ticks: {
        color: 'black',
      },
    },
  },
}
</script>
