<script setup>
import { Cloud, CloudRain, CloudSun, Menu, Sun } from 'lucide-vue-next'
import { defineEmits, onMounted, ref, computed } from 'vue'
import AvatarMenu from '../common/AvatarMenu.vue'
import weatherApi from '@/api/weatherApi'

const emit = defineEmits(['toggle-sidebar'])
const currentTime = ref('')
const currentWeather = ref({
  weather: '',
  temperature: '',
})

const toggleSidebar = () => {
  emit('toggle-sidebar')
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 獲取天氣圖標組件
const weatherIcon = computed(() => {
  const weather = currentWeather.value.weather
  switch (weather) {
    case '晴':
      return Sun
    case '多雲':
      return Cloud
    case '陰':
      return Cloud
    case '雨':
      return CloudRain
    case '晴時多雲':
      return CloudSun
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
    default:
      return 'text-gray-300'
  }
})

const fetchWeatherData = async () => {
  try {
    const response = await weatherApi.getWeather()

    if (response.data.success) {
      const location = response.data.records.Locations[0].Location[0]

      // 獲取天氣現象和溫度數據
      const weatherData = location.WeatherElement.find(
        (el) => el.ElementName === '天氣現象',
      )
      const tempData = location.WeatherElement.find(
        (el) => el.ElementName === '溫度',
      )

      // 設置當前天氣
      if (weatherData && tempData) {
        currentWeather.value = {
          weather: weatherData.Time[0].ElementValue[0].Weather,
          temperature: `${tempData.Time[0].ElementValue[0].Temperature}°C`,
        }
      }
    }
  } catch (error) {
    console.error('獲取天氣數據失敗:', error)
  }
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 60000)

  // 獲取實際天氣數據
  fetchWeatherData()
})
</script>

<template>
  <header
    class="border-b border-gray-300 p-3.5 flex items-center justify-start lg:justify-end pl-4 lg:pl-16 pr-6 bg-white/30 backdrop-blur-[30px]"
  >
    <!-- Mobile Menu Button -->
    <button
      @click="toggleSidebar"
      class="lg:hidden p-2 rounded-md hover:bg-gray-100"
    >
      <Menu class="h-5 w-5 text-gray-500" />
    </button>

    <div class="hidden lg:flex items-center gap-8">
      <!-- Weather Info -->
      <div class="flex items-center gap-4 text-gray-600">
        <div class="text-sm">
          {{ currentTime }}
        </div>
        <div class="flex items-center gap-2">
          <component
            v-if="currentWeather.weather"
            :is="weatherIcon"
            class="h-5 w-5"
            :class="weatherIconColor"
          />
          <span>{{ currentWeather.temperature }}</span>
        </div>
      </div>
      <AvatarMenu />
    </div>
  </header>
</template>
