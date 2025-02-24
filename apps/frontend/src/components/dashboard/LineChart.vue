<template>
  <Line :data="chartData" :config="chartConfig" />
</template>

<script>
import { Pv_config, Pv_data } from '@/utils/LineChart'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'LineChart',
  components: { Line },
  data() {
    return {
      chartData: Pv_data,
      chartConfig: Pv_config
    }
  }
}
</script>
