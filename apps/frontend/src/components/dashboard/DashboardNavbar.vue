<template>
  <header
    class="border-b border-gray-300 p-3.5 flex items-center justify-start lg:justify-end pl-4 lg:pl-16 pr-6 bg-white"
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
          <Sun v-if="weather === 'sunny'" class="h-5 w-5 text-yellow-500" />
          <Cloud v-if="weather === 'cloudy'" class="h-5 w-5 text-gray-500" />
          <CloudRain v-if="weather === 'rainy'" class="h-5 w-5 text-blue-500" />
          <span>{{ temperature }}°C</span>
        </div>
        <div class="text-sm">
          {{ $t('main.weather.solar_energy') }}: {{ solarRadiation }} W/m²
        </div>
      </div>
      <AvatarMenu />
    </div>
  </header>
</template>

<script setup>
import { Cloud, CloudRain, Menu, Sun } from 'lucide-vue-next'
import { defineEmits, onMounted, ref } from 'vue'
import AvatarMenu from '../common/AvatarMenu.vue'

const emit = defineEmits(['toggle-sidebar'])
const currentTime = ref('')
const temperature = ref(25)
const weather = ref('sunny')
const solarRadiation = ref(800)

const toggleSidebar = () => {
  emit('toggle-sidebar')
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 60000)

  // 這裡可以加入實際的天氣API調用
  // fetchWeatherData()
})
</script>
