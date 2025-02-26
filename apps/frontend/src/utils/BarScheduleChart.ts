import { ChartData, ChartOptions } from 'chart.js'

export const chartData: ChartData<'bar' | 'line'> = {
  labels: Array.from({ length: 96 }, (_, i) => {
    const hours = String(Math.floor(i / 4)).padStart(2, '0')
    const minutes = String((i % 4) * 15).padStart(2, '0')
    return `${hours}:${minutes}`
  }),
  datasets: [
    {
      label: 'PV Power Generation',
      type: 'line',
      borderColor: '#ffc107',
      backgroundColor: 'rgba(255, 193, 7, 0.3)',
      borderWidth: 2,
      pointRadius: 0,
      yAxisID: 'y',
      data: Array.from({ length: 96 }, () => Math.random() * 100)
    },
    {
      label: 'PV Power Prediction',
      type: 'line',
      borderColor: '#ffc107',
      borderDash: [5, 5],
      borderWidth: 2,
      pointRadius: 0,
      yAxisID: 'y',
      data: Array.from({ length: 96 }, () => Math.random() * 100)
    },
    {
      label: 'Battery Charged Power',
      type: 'line',
      borderColor: '#1864ab',
      borderDash: [5, 5],
      borderWidth: 2,
      pointRadius: 0,
      yAxisID: 'y',
      data: Array.from({ length: 96 }, () => Math.random() * 100)
    },
    {
      label: 'Schedule',
      type: 'bar',
      backgroundColor: 'rgba(43, 138, 62, 0.7)',
      borderColor: '#2b8a3e',
      borderWidth: 1,
      hoverBorderWidth: 2,
      yAxisID: 'y',
      data: Array.from({ length: 96 }, () => Math.random() * 100)
    }
  ]
}

export const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: 'Sales & Revenue Report'
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff'
      }
    },
    y: {
      beginAtZero: true
    }
  }
}
