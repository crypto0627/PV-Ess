<template>
  <Bar :data="chartData" :config="chartConfig" />
</template>

<script>
import { Pv_config, Pv_data } from '@/utils/BarChart' // 修改為正確的數據來源
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale, // 使用BarElement
  Title,
  Tooltip
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // 註冊BarElement
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: Pv_data,
      chartConfig: Pv_config
    }
  }
}
</script>
