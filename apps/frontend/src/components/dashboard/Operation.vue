<script setup lang="ts">
import weatherApi from '@/api/weatherApi'
import { ForecastType } from '@/types'
import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSun,
  Cloudy,
  Sun,
} from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// 當前天氣數據
const currentWeather = ref({
  stationName: '',
  weather: '',
  temperature: '',
  observationTime: '',
  countyName: '',
  townName: '',
})

// 天氣預報數據
const forecasts = ref<ForecastType[]>([])

// 城市資訊
const city = ref('')
const district = ref('')

// 當前日期和時間
const currentDateTime = ref(new Date())

// 定時器引用
let timer: number | null = null

// 獲取天氣圖標組件
const weatherIcon = computed(() => {
  const weather = currentWeather.value.weather
  switch (weather) {
    case '晴':
      return Sun
    case '多雲':
      return Cloudy
    case '陰':
      return Cloud
    case '雨':
      return CloudRain
    case '晴時多雲':
      return CloudSun
    case '短暫陣雨或雷雨':
      return CloudLightning
    case '短暫陣雨':
      return CloudDrizzle
    default:
      return Cloud
  }
})

// 獲取天氣圖標顏色
const weatherIconColor = computed(() => {
  const weather = currentWeather.value.weather
  switch (weather) {
    case '晴':
      return 'text-yellow-400'
    case '多雲':
      return 'text-gray-300'
    case '陰':
      return 'text-gray-300'
    case '雨':
      return 'text-blue-400'
    case '晴時多雲':
      return 'text-yellow-300'
    case '短暫陣雨或雷雨':
      return 'text-purple-400'
    case '短暫陣雨':
      return 'text-blue-300'
    default:
      return 'text-gray-300'
  }
})

// 獲取預報圖標組件
const getForecastIcon = (weather: string) => {
  switch (weather) {
    case '晴':
      return Sun
    case '多雲':
      return Cloudy
    case '陰':
      return Cloud
    case '雨':
      return CloudRain
    case '晴時多雲':
      return CloudSun
    case '短暫陣雨或雷雨':
      return CloudLightning
    case '短暫陣雨':
      return CloudDrizzle
    default:
      return Cloud
  }
}

// 獲取預報圖標顏色
const getForecastIconColor = (weather: string) => {
  switch (weather) {
    case '晴':
      return 'text-yellow-400'
    case '多雲':
      return 'text-gray-300'
    case '陰':
      return 'text-gray-300'
    case '雨':
      return 'text-blue-400'
    case '晴時多雲':
      return 'text-yellow-300'
    case '短暫陣雨或雷雨':
      return 'text-purple-400'
    case '短暫陣雨':
      return 'text-blue-300'
    default:
      return 'text-gray-300'
  }
}

// 格式化時間為"上午/下午 HH:MM"格式
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 獲取未來3小時間隔的時間點
const getFutureTimePoints = () => {
  const timePoints = []
  const now = new Date()

  // 當前時間
  timePoints.push(new Date(now))

  // 往後3小時、6小時、9小時、12小時
  for (let i = 1; i <= 4; i++) {
    const futureTime = new Date(now)
    futureTime.setHours(now.getHours() + i * 3)
    timePoints.push(futureTime)
  }

  return timePoints
}

// 更新當前時間
const updateCurrentTime = () => {
  currentDateTime.value = new Date()
}

onMounted(async () => {
  try {
    const response = await weatherApi.getWeather()

    if (response.data.success) {
      const location = response.data.records.Locations[0].Location[0]
      city.value = response.data.records.Locations[0].LocationsName
      district.value = location.LocationName

      // 獲取天氣現象、溫度和降雨機率數據
      const weatherData = location.WeatherElement.find(
        (el: any) => el.ElementName === '天氣現象',
      )
      const tempData = location.WeatherElement.find(
        (el: any) => el.ElementName === '溫度',
      )
      const rainData = location.WeatherElement.find(
        (el: any) => el.ElementName === '3小時降雨機率',
      )

      // 設置當前天氣
      if (weatherData) {
        currentWeather.value = {
          stationName: location.LocationName,
          weather: weatherData.Time[0].ElementValue[0].Weather,
          temperature: `${tempData.Time[0].ElementValue[0].Temperature}°C`,
          observationTime: weatherData.Time[0].StartTime,
          countyName: city.value,
          townName: district.value,
        }
      }

      // 獲取未來時間點
      const timePoints = getFutureTimePoints()

      // 設置預報數據 - 顯示5個時間點
      forecasts.value = timePoints.map((time, index) => {
        // 使用API數據中最接近的時間點數據
        const apiTimeIndex = Math.min(index, weatherData.Time.length - 1)

        return {
          time: formatTime(time),
          icon: weatherData.Time[apiTimeIndex].ElementValue[0].Weather,
          temperature: `${tempData.Time[apiTimeIndex].ElementValue[0].Temperature}°C`,
          precipitation: `降雨機率 ${rainData.Time[apiTimeIndex].ElementValue[0].ProbabilityOfPrecipitation}%`,
        }
      })
    }
  } catch (error) {
    console.error('獲取天氣數據失敗:', error)
  }

  // 設置定時器，每秒更新一次時間
  updateCurrentTime()
  timer = window.setInterval(updateCurrentTime, 1000)
})

onBeforeUnmount(() => {
  // 組件銷毀前清除定時器
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <div
    class="mt-4 p-4 bg-[#0a3726]/80 backdrop-blur-sm rounded-2xl border border-emerald-500/30"
  >
    <h2
      class="text-xl font-medium mb-4 text-emerald-100 flex items-center justify-between"
    >
      <span class="mr-2">{{ $t('main.dashboard.weather_forecast') }}</span>
      <span class="text-sm text-emerald-100">
        {{ currentDateTime.toLocaleDateString() }}
        {{ currentDateTime.toLocaleTimeString() }}
      </span>
    </h2>

    <!-- 當前天氣信息 -->
    <div class="mb-4 p-3 bg-emerald-800/50 rounded-xl">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-lg font-bold text-emerald-100">
            {{ city }} {{ district }}
          </div>
          <div class="text-sm text-emerald-100">
            {{ currentDateTime.toLocaleDateString() }}
            {{ currentDateTime.toLocaleTimeString() }}
          </div>
        </div>
        <div class="flex items-center">
          <div class="mr-3">
            <div class="text-3xl font-bold text-emerald-100">
              {{ currentWeather.temperature }}
            </div>
            <div class="text-sm text-emerald-100">
              {{ currentWeather.weather }}
            </div>
          </div>
          <div class="text-3xl" v-if="currentWeather.weather">
            <component :is="weatherIcon" :class="weatherIconColor" />
          </div>
        </div>
      </div>
    </div>

    <!-- 天氣預報 -->
    <div class="grid grid-cols-5 gap-2" v-if="forecasts.length > 0">
      <div
        v-for="(forecast, index) in forecasts"
        :key="index"
        class="flex flex-col items-center bg-emerald-800/80 p-3 rounded-xl hover:bg-emerald-800/30 transition-all"
      >
        <div class="text-sm text-emerald-100 font-medium mb-2">
          {{ forecast.time }}
        </div>
        <div class="text-2xl mb-2">
          <component
            :is="getForecastIcon(forecast.icon)"
            :class="getForecastIconColor(forecast.icon)"
          />
        </div>
        <div class="text-base text-emerald-100 font-bold">
          {{ forecast.temperature }}
        </div>
        <div class="text-xs text-emerald-100 mt-1">
          {{ forecast.precipitation }}
        </div>
      </div>
    </div>
    <div v-else class="text-center text-emerald-100 py-4">
      正在加載天氣預報數據...
    </div>
  </div>
</template>
