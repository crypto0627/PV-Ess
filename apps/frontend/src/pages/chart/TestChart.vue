<template>
  <Doughnut :data="chartData" />
</template>

<script>
import { data } from '@/utils/DoughnutChart'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  data() {
    return {
      chartData: data
    }
  }
}
</script>
