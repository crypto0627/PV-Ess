<script setup lang="ts">
import { ref } from 'vue'

// 使用 ref 來儲存選擇的日期
const selectedDate = ref<string>('')

// 使用 ref 來儲存每個時段的功率值,並設定預設值為0
const powerValues = ref<{ [key: string]: number }>({})

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
  console.log('功率設定:', powerValues.value)
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
    const timeKey = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} -> ${endHour}:${endMinute}`
    times.push(timeKey)
    powerValues.value[timeKey] = 0 // 為每個時段設定預設值0
  }
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-4 justify-between items-center mb-4 bg-emerald-900/80 rounded-2xl p-4"
  >
    <div class="relative">
      <input
        type="date"
        v-model="selectedDate"
        @change="handleDateChange"
        class="bg-emerald-100 border border-emerald-300 rounded-md px-4 py-2 w-64 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
      />
      <CalendarIcon
        class="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-700 pointer-events-none"
      />
    </div>

    <button
      class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md flex items-center transition-all shadow-lg shadow-emerald-500/20"
      @click="saveSchedule"
    >
      Save Schedule
    </button>
  </div>
  <div class="flex flex-col lg:flex-row gap-8 h-[calc(100vh-12rem)]">
    <!-- 左邊表格 -->
    <div
      class="flex-1 rounded-2xl bg-emerald-900/80 backdrop-blur-sm border border-emerald-600/30 overflow-hidden"
    >
      <div
        class="max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-emerald-900/50"
      >
        <table class="w-full text-emerald-50">
          <thead class="sticky top-0 z-10">
            <tr>
              <th class="bg-emerald-950/90 p-3 text-center backdrop-blur-sm">
                Schedule Time
              </th>
              <th class="bg-emerald-950/90 p-3 text-center backdrop-blur-sm">
                Schedule Power (kW)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="time in times"
              :key="time"
              class="hover:bg-emerald-800/40 transition-colors"
            >
              <td class="p-2 text-center border-b border-emerald-600/30">
                {{ time }}
              </td>
              <td class="p-2 border-b border-emerald-600/30">
                <div class="flex items-center gap-4">
                  <input
                    type="range"
                    v-model="powerValues[time]"
                    min="0"
                    max="1000"
                    step="1"
                    class="w-full h-2 bg-emerald-800/70 rounded-lg appearance-none cursor-pointer hover:bg-emerald-700/70 transition-all"
                  />
                  <span class="min-w-[4rem] text-right"
                    >{{ powerValues[time] }} kW</span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
