<template>
  <Doughnut :data="data" :options="options" />
</template>

<script>
import { data, options } from '@/utils/DoughnutChart'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  data() {
    return {
      data,
      options // 修正為 options
    }
  }
}
</script>
