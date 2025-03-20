<script setup lang="ts">
import { Zap } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import BatteryIcon from './monitor/icons/BatteryIcon.vue'
import SolarpanelIcon from './monitor/icons/SolarpanelIcon.vue'
import TowerIcon from './monitor/icons/TowerIcon.vue'

// 固定數據
const frequency = ref(60)
const powerM1 = ref(2016.72)
const powerM2 = ref(16.72)
const powerM3 = ref(2000)
const solarPower = ref(5000)
const batteryPower = ref(10000)
const batteryCapacity = ref(30000)
const oldPVPower = ref(3000)

// 狀態
const status = ref('normal')
const solarStatus = ref('error')
const batteryStatus = ref('warning')
const oldPVStatus = ref('normal')

// 動畫控制
const animationStep = ref(0)
const animationInterval = ref(null)

// 新增動畫觸發狀態
const animationTriggered = ref(false)
const currentAnimationSource = ref('') // 'oldPV', 'newPV', 'battery'
const animationInProgress = ref(false)

// 計算總功率
const totalPower = ref(0)
const updateTotalPower = () => {
  totalPower.value = powerM1.value + powerM2.value + powerM3.value
}

// 根據狀態獲取邊框顏色
const getBorderColor = (status: string) => {
  switch (status) {
    case 'normal':
      return 'border-green-500'
    case 'warning':
      return 'border-yellow-500'
    case 'error':
      return 'border-red-500'
    default:
      return 'border-emerald-400'
  }
}

// 控制動畫
const startAnimation = () => {
  if (animationInterval.value) clearInterval(animationInterval.value)

  animationInterval.value = setInterval(() => {
    animationStep.value = (animationStep.value + 1) % 3
  }, 500) as unknown as null
}

// 觸發特定路徑的動畫
const triggerPathAnimation = (source: string) => {
  if (animationInProgress.value) return

  animationInProgress.value = true
  currentAnimationSource.value = source
  animationTriggered.value = true

  // 5秒後重置動畫狀態
  setTimeout(() => {
    animationTriggered.value = false
    animationInProgress.value = false
    currentAnimationSource.value = ''
  }, 5000)
}

// 監聽狀態變化以觸發動畫
watch(
  [solarStatus, oldPVStatus, batteryStatus],
  ([newSolar, newOldPV, newBattery], [oldSolar, oldOldPV, oldBattery]) => {
    if (newSolar === 'normal' && oldSolar !== 'normal') {
      triggerPathAnimation('newPV')
    } else if (newOldPV === 'normal' && oldOldPV !== 'normal') {
      triggerPathAnimation('oldPV')
    } else if (newBattery === 'normal' && oldBattery !== 'normal') {
      triggerPathAnimation('battery')
    }
  },
)

onMounted(() => {
  updateTotalPower()
  watch([powerM1, powerM2, powerM3], updateTotalPower)
  startAnimation()
})
</script>

<template>
  <div
    class="w-full h-full rounded-xl text-emerald-50 flex justify-center items-center p-4"
  >
    <div class="w-full h-full p-5 grid grid-cols-2 gap-4 relative">
      <!-- 第一格 - 左上 - Old PV System -->
      <div class="bg-emerald-900/30 rounded-lg p-3 flex flex-col relative">
        <h3 class="text-emerald-100 text-sm font-medium mb-2">
          {{ $t('main.dashboard.old_pv_system') }}
        </h3>
        <div class="flex items-center justify-center flex-1">
          <div
            :class="[
              'border-2 border-dashed rounded-xl p-2 relative z-10',
              getBorderColor(oldPVStatus),
            ]"
          >
            <SolarpanelIcon :status="oldPVStatus" class="w-16 h-16" />
          </div>
        </div>
        <div
          class="text-center text-xs mt-1 font-medium"
          :class="{
            'text-green-500': oldPVStatus === 'normal',
            'text-yellow-500': oldPVStatus === 'warning',
            'text-red-500': oldPVStatus === 'error',
          }"
        >
          {{ $t(`main.dashboard.${oldPVStatus}`) }}
        </div>
        <div class="text-emerald-100 text-xs mt-2">
          {{ $t('main.dashboard.generation_amount') }}: {{ oldPVPower }}kWp
        </div>
      </div>

      <!-- 第二格 - 右上 - 電網 -->
      <div class="bg-emerald-900/30 rounded-lg p-3 flex flex-col relative">
        <h3 class="text-emerald-100 text-sm font-medium mb-2">
          {{ $t('main.dashboard.grid_output') }}
        </h3>
        <div class="flex items-center justify-center flex-1">
          <div
            :class="[
              'p-2 relative z-10 border-2 border-dashed rounded-xl',
              getBorderColor(status),
            ]"
          >
            <TowerIcon :status="status" class="w-16 h-16" />
          </div>
        </div>
        <div
          class="text-center text-xs mt-1 font-medium"
          :class="{
            'text-green-500': status === 'normal',
            'text-yellow-500': status === 'warning',
            'text-red-500': status === 'error',
          }"
        >
          {{ $t(`main.dashboard.${status}`) }}
        </div>
        <div class="text-emerald-100 text-xs mt-2">
          {{ $t('main.dashboard.frequency') }}: {{ frequency }}Hz |
          {{ $t('main.dashboard.generation_amount') }}:
          {{ totalPower.toFixed(2) }}kW
        </div>
      </div>

      <!-- 第三格 - 左下 - New PV System -->
      <div class="bg-emerald-900/30 rounded-lg p-3 flex flex-col relative">
        <h3 class="text-emerald-100 text-sm font-medium mb-2">
          {{ $t('main.dashboard.new_pv_system') }}
        </h3>
        <div class="flex items-center justify-center flex-1">
          <div
            :class="[
              'border-2 border-dashed rounded-xl p-2 relative z-10',
              getBorderColor(solarStatus),
            ]"
          >
            <SolarpanelIcon :status="solarStatus" class="w-16 h-16" />
          </div>
        </div>
        <div
          class="text-center text-xs mt-1 font-medium"
          :class="{
            'text-green-500': solarStatus === 'normal',
            'text-yellow-500': solarStatus === 'warning',
            'text-red-500': solarStatus === 'error',
          }"
        >
          {{ $t(`main.dashboard.${solarStatus}`) }}
        </div>
        <div class="text-emerald-100 text-xs mt-2">
          {{ $t('main.dashboard.generation_amount') }}: {{ solarPower }}kWp
        </div>
      </div>

      <!-- 第四格 - 右下 - Battery System -->
      <div class="bg-emerald-900/30 rounded-lg p-3 flex flex-col relative">
        <h3 class="text-emerald-100 text-sm font-medium mb-2">
          {{ $t('main.dashboard.energy_storage_system') }}
        </h3>
        <div class="flex items-center justify-center flex-1">
          <div
            :class="[
              'border-2 border-dashed rounded-xl p-2 relative z-10',
              getBorderColor(batteryStatus),
            ]"
          >
            <BatteryIcon :status="batteryStatus" class="w-16 h-16" />
          </div>
        </div>
        <div
          class="text-center text-xs mt-1 font-medium"
          :class="{
            'text-green-500': batteryStatus === 'normal',
            'text-yellow-500': batteryStatus === 'warning',
            'text-red-500': batteryStatus === 'error',
          }"
        >
          {{ $t(`main.dashboard.${batteryStatus}`) }}
        </div>
        <div class="text-emerald-100 text-xs mt-2">
          功率: {{ batteryPower }}kW / 容量: {{ batteryCapacity }}kWh
        </div>
      </div>

      <!-- 連接線 -->
      <!--Old PV System to middle-->
      <div
        class="absolute top-[25%] left-[32%] w-[18%] h-[2px] border-t-2 border-dashed border-gray-500 z-0"
      ></div>
      <!--middle to Grid Output-->
      <div
        class="absolute top-[25%] right-[32%] w-[18%] h-[2px] border-t-2 border-dashed border-gray-500 z-0"
      ></div>

      <!--New PV System to middle-->
      <div
        class="absolute top-[73%] left-[32%] w-[18%] h-[2px] border-t-2 border-dashed border-gray-500 z-0"
      ></div>

      <!--Battery System to middle-->
      <div
        class="absolute top-[73%] right-[32%] w-[18%] h-[2px] border-t-2 border-dashed border-gray-500 z-0"
      ></div>

      <!--Middle bottom to Middle top-->
      <div
        class="absolute top-[25%] left-[50%] w-[2px] h-[48%] border-l-2 border-dashed border-gray-500 z-0 transform -translate-x-1/2"
      ></div>

      <!-- 動畫圖標群組 -->
      <!-- Old PV System to middle -->
      <div
        v-if="
          oldPVStatus === 'normal' &&
          (!animationTriggered || currentAnimationSource === 'oldPV')
        "
        class="absolute top-[25%] left-[32%] w-[18%] z-20"
      >
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2"
          :style="{
            left:
              animationStep === 0 ? '10%' : animationStep === 1 ? '40%' : '70%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-70"
          :style="{
            left:
              animationStep === 0 ? '70%' : animationStep === 1 ? '10%' : '40%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-40"
          :style="{
            left:
              animationStep === 0 ? '40%' : animationStep === 1 ? '70%' : '10%',
          }"
        />
      </div>

      <!-- middle to Grid Output -->
      <div
        v-if="
          status === 'normal' &&
          animationTriggered &&
          (currentAnimationSource === 'oldPV' ||
            currentAnimationSource === 'newPV')
        "
        class="absolute top-[25%] right-[32%] w-[18%] z-20"
      >
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2"
          :style="{
            right:
              animationStep === 0 ? '70%' : animationStep === 1 ? '40%' : '10%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-70"
          :style="{
            right:
              animationStep === 0 ? '40%' : animationStep === 1 ? '10%' : '70%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-40"
          :style="{
            right:
              animationStep === 0 ? '10%' : animationStep === 1 ? '70%' : '40%',
          }"
        />
      </div>

      <!-- New PV System to middle -->
      <div
        v-if="
          solarStatus === 'normal' &&
          (!animationTriggered || currentAnimationSource === 'newPV')
        "
        class="absolute top-[73%] left-[32%] w-[18%] z-20"
      >
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2"
          :style="{
            left:
              animationStep === 0 ? '10%' : animationStep === 1 ? '40%' : '70%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-70"
          :style="{
            left:
              animationStep === 0 ? '70%' : animationStep === 1 ? '10%' : '40%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-40"
          :style="{
            left:
              animationStep === 0 ? '40%' : animationStep === 1 ? '70%' : '10%',
          }"
        />
      </div>

      <div
        v-if="
          solarStatus === 'error' &&
          (!animationTriggered || currentAnimationSource === 'newPV')
        "
        class="absolute top-[73%] left-[32%] w-[18%] z-20"
      >
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2"
          :style="{
            left:
              animationStep === 0 ? '70%' : animationStep === 1 ? '40%' : '10%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-70"
          :style="{
            left:
              animationStep === 0 ? '40%' : animationStep === 1 ? '10%' : '70%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-40"
          :style="{
            left:
              animationStep === 0 ? '10%' : animationStep === 1 ? '70%' : '40%',
          }"
        />
      </div>

      <!-- Battery System to middle -->
      <div
        v-if="
          batteryStatus === 'normal' &&
          (!animationTriggered || currentAnimationSource === 'battery')
        "
        class="absolute top-[73%] right-[32%] w-[18%] z-20"
      >
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2"
          :style="{
            right:
              animationStep === 0 ? '10%' : animationStep === 1 ? '40%' : '70%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-70"
          :style="{
            right:
              animationStep === 0 ? '70%' : animationStep === 1 ? '10%' : '40%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-40"
          :style="{
            right:
              animationStep === 0 ? '40%' : animationStep === 1 ? '70%' : '10%',
          }"
        />
      </div>

      <div
        v-if="
          batteryStatus === 'warning' &&
          (!animationTriggered || currentAnimationSource === 'battery')
        "
        class="absolute top-[73%] right-[32%] w-[18%] z-20"
      >
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2"
          :style="{
            right:
              animationStep === 0 ? '70%' : animationStep === 1 ? '40%' : '10%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-70"
          :style="{
            right:
              animationStep === 0 ? '40%' : animationStep === 1 ? '10%' : '70%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-y-1/2 opacity-40"
          :style="{
            right:
              animationStep === 0 ? '10%' : animationStep === 1 ? '70%' : '40%',
          }"
        />
      </div>

      <!-- Middle bottom to Middle top -->
      <div
        v-if="
          animationTriggered &&
          (currentAnimationSource === 'newPV' ||
            currentAnimationSource === 'oldPV')
        "
        class="absolute top-[25%] left-[50%] h-[48%] z-20 transform -translate-x-1/2"
      >
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-x-1/2"
          :style="{
            top:
              currentAnimationSource === 'newPV'
                ? animationStep === 0
                  ? '70%'
                  : animationStep === 1
                    ? '40%'
                    : '10%'
                : animationStep === 0
                  ? '10%'
                  : animationStep === 1
                    ? '40%'
                    : '70%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-x-1/2 opacity-70"
          :style="{
            top:
              currentAnimationSource === 'newPV'
                ? animationStep === 0
                  ? '40%'
                  : animationStep === 1
                    ? '10%'
                    : '70%'
                : animationStep === 0
                  ? '70%'
                  : animationStep === 1
                    ? '10%'
                    : '40%',
          }"
        />
        <Zap
          class="w-4 h-4 text-blue-500 absolute transform -translate-x-1/2 opacity-40"
          :style="{
            top:
              currentAnimationSource === 'newPV'
                ? animationStep === 0
                  ? '10%'
                  : animationStep === 1
                    ? '70%'
                    : '40%'
                : animationStep === 0
                  ? '40%'
                  : animationStep === 1
                    ? '70%'
                    : '10%',
          }"
        />
      </div>
    </div>
  </div>
</template>
