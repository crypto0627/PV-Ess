<template>
  <div class="flex-1 p-4">
    <div
      class="flex flex-col md:flex-row gap-4 justify-between items-center mb-4"
    >
      <div class="relative">
        <input
          type="date"
          v-model="selectedDate"
          @change="handleDateChange"
          class="bg-gray-7/50 border border-gray-600 rounded-md px-4 py-2 w-64 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <CalendarIcon
          class="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
        />
      </div>

      <button
        class="bg-gray-700/50 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center"
        @click="saveSchedule"
      >
        Save Schedule
      </button>
    </div>
    <div class="flex flex-col lg:flex-row gap-8 overflow-y-auto h-64">
      <!-- 左邊表格 -->
      <div class="flex-1">
        <table class="w-full text-white/90">
          <thead>
            <tr>
              <th class="bg-[#0a3726] p-2 text-center">Schedule Time</th>
              <th class="bg-[#0a3726] p-2 text-center">Schedule Power (kW)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="time in times" :key="time">
              <td class="bg-[#0a3726] p-2 text-center">{{ time }}</td>
              <td class="bg-gray-300 p-2">
                <input
                  type="range"
                  min="0"
                  max="4000"
                  class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 右邊表格 -->
      <div class="flex-1">
        <table class="w-full text-white/90">
          <thead>
            <tr>
              <th class="bg-[#0a3726] p-2 text-center">Schedule Time</th>
              <th class="bg-[#0a3726] p-2 text-center">Schedule Power (kW)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="time in times" :key="time">
              <td class="bg-[#0a3726] p-2 text-center">{{ time }}</td>
              <td class="bg-gray-300 p-2">
                <input
                  type="range"
                  min="0"
                  max="4000"
                  class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 使用 ref 來儲存選擇的日期
const selectedDate = ref<string>('')

// 處理日期變更事件
const handleDateChange = () => {
  console.log('選擇的日期:', selectedDate.value)
  // 這裡可以加入其他處理邏輯，例如更新圖表數據等
}

// 儲存排程功能
const saveSchedule = () => {
  if (!selectedDate.value) {
    alert('請先選擇日期')
    return
  }
  console.log('儲存排程，日期為:', selectedDate.value)
  // 這裡可以加入儲存排程的API呼叫或其他邏輯
}

const times: string[] = []
for (let hour = 0; hour < 24; hour += 1) {
  for (let minute = 0; minute < 60; minute += 15) {
    const endMinute =
      minute + 15 >= 60 ? '00' : String(minute + 15).padStart(2, '0')
    const endHour =
      minute + 15 >= 60
        ? String(hour + 1).padStart(2, '0')
        : String(hour).padStart(2, '0')
    times.push(
      `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} -> ${endHour}:${endMinute}`,
    )
  }
}
</script>
