export const data = {
  labels: ['charged', 'remain'],
  datasets: [
    {
      backgroundColor: ['#2b8a3e', '#495057'],
      borderWidth: 1,
      borderColor: '#ffffff',
      data: [60, 40]
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxRotation: 45,
        minRotation: 0
      }
    },
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#ffffff',
        display: true,
        position: 'top'
      }
    }
  },
  elements: {
    arc: {
      borderWidth: 2 // 確保邊框寬度設置正確
    }
  }
}
