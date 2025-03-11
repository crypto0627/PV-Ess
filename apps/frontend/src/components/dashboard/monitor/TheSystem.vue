<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import BatteryIcon from './icons/BatteryIcon.vue'
import SolarpanelIcon from './icons/SolarpanelIcon.vue'
import TowerIcon from './icons/TowerIcon.vue'
import UpIcon from './icons/UpIcon.vue'

type Status = 'normal' | 'warning' | 'error'

export default defineComponent({
  name: 'TheSystem',
  components: {
    TowerIcon,
    SolarpanelIcon,
    BatteryIcon,
  },
  setup() {
    // 固定數據
    const frequency = ref(60)
    const powerM1 = ref(2016.72)
    const powerM2 = ref(16.72)
    const powerM3 = ref(2000)
    const solarPower = ref(5000)
    const batteryPower = ref(10000)
    const batteryCapacity = ref(30000)
    const oldPVPower = ref(3000)
    const container = ref<HTMLElement | null>(null)

    // 狀態
    const status = ref<Status>('normal')
    const solarStatus = ref<Status>('error')
    const batteryStatus = ref<Status>('warning')
    const oldPVStatus = ref<Status>('normal')

    // Computed properties
    const totalPower = ref(0)
    const updateTotalPower = () => {
      totalPower.value = powerM1.value + powerM2.value + powerM3.value
    }
    onMounted(() => {
      updateTotalPower()
      watch([powerM1, powerM2, powerM3], updateTotalPower)
    })

    // Watchers
    watch(powerM1, (newValue, oldValue) => {
      console.log(`Power M1 changed from ${oldValue} to ${newValue}`)
    })

    return {
      frequency,
      powerM1,
      powerM2,
      powerM3,
      solarPower,
      batteryPower,
      batteryCapacity,
      oldPVPower,
      totalPower,
      container,
      status,
      solarStatus,
      batteryStatus,
      oldPVStatus,
    }
  },
})
</script>

<template>
  <div
    class="p-4 rounded-xl hover:bg-emerald-800/30 transition-all duration-300 text-emerald-50 flex justify-center items-center"
  >
    <div class="w-full max-w-xl flex flex-col gap-8 system-container">
      <!-- Top Section: Grid and Frequency -->
      <div class="flex justify-between items-start w-full gap-4">
        <!-- Left Side -->
        <div class="flex flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div
            :class="[
              'border-2 rounded-lg p-4 flex items-center space-x-2 shadow-lg backdrop-blur-sm bg-emerald-900/30 relative',
              oldPVStatus === 'normal'
                ? 'border-emerald-400 shadow-emerald-500/50'
                : '',
              oldPVStatus === 'warning'
                ? 'border-amber-400 shadow-amber-500/50 bg-amber-100/10'
                : '',
              oldPVStatus === 'error'
                ? 'border-rose-400 shadow-rose-500/50 bg-rose-100/10'
                : '',
            ]"
          >
            <div class="wire-to-center wire-top"></div>
            <component
              :is="'SolarpanelIcon'"
              :class="[
                'h-8 w-8 text-emerald-100',
                oldPVStatus === 'normal' ? 'text-emerald-400' : '',
                oldPVStatus === 'warning' ? 'text-amber-400' : '',
                oldPVStatus === 'error' ? 'text-rose-400' : '',
              ]"
            />
            <div class="flex flex-col">
              <span class="text-base font-medium">{{
                $t('main.dashboard.old_pv_system')
              }}</span>
              <span class="text-base font-bold text-emerald-300"
                >{{ oldPVPower }} kWp</span
              >
              <span class="text-xs">{{
                oldPVStatus === 'normal'
                  ? $t('main.dashboard.normal')
                  : oldPVStatus === 'warning'
                    ? $t('main.dashboard.warning')
                    : $t('main.dashboard.error')
              }}</span>
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div
          class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
        >
          <div
            :class="[
              'border-2 rounded-lg p-2 flex items-center space-x-2 shadow-lg backdrop-blur-sm bg-emerald-900/30 relative',
              status === 'normal'
                ? 'border-emerald-400 shadow-emerald-500/50'
                : '',
              status === 'warning'
                ? 'border-amber-400 shadow-amber-500/50 bg-amber-100/10'
                : '',
              status === 'error'
                ? 'border-rose-400 shadow-rose-500/50 bg-rose-100/10'
                : '',
            ]"
          >
            <div class="wire-to-center wire-top"></div>
            <component
              :is="'TowerIcon'"
              :class="[
                'h-6 w-6 text-emerald-100',
                status === 'normal' ? 'text-emerald-400' : '',
                status === 'warning' ? 'text-amber-400' : '',
                status === 'error' ? 'text-rose-400' : '',
              ]"
            />
            <div class="flex flex-col">
              <span class="text-base font-medium">{{
                $t('main.dashboard.frequency')
              }}</span>
              <span class="text-base font-bold text-emerald-300"
                >{{ frequency }} Hz</span
              >
              <span class="text-xs">{{
                status === 'normal'
                  ? $t('main.dashboard.normal')
                  : status === 'warning'
                    ? $t('main.dashboard.warning')
                    : $t('main.dashboard.error')
              }}</span>
            </div>
          </div>
          <div class="p-2">
            <span class="text-base font-bold text-emerald-100"
              >{{ powerM1.toFixed(2) }} kW</span
            >
          </div>
        </div>
      </div>

      <!-- Middle Section: Nodes -->
      <div
        class="w-full h-60 flex justify-center items-center relative"
        ref="container"
      >
        <!-- Operation Status Box -->
        <div class="absolute inset-0 flex items-center justify-center z-10">
          <div
            class="border-2 border-emerald-400 rounded-xl p-4 bg-emerald-900 backdrop-blur-sm shadow-lg shadow-emerald-500/50 relative w-full h-32 flex flex-col items-center justify-center"
          >
            <span class="text-lg font-bold text-emerald-400 mb-2"
              >OPERATION</span
            >
            <span class="text-3xl font-bold text-emerald-300">{{
              totalPower.toFixed(2)
            }}</span>
            <span class="text-sm text-emerald-400">kW TOTAL</span>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Solar and Battery -->
      <div
        class="flex flex-col lg:flex-row justify-center items-stretch gap-4 lg:gap-8"
      >
        <div
          :class="[
            'flex-1 border-2 rounded-lg p-4 flex items-center space-x-2 shadow-lg backdrop-blur-sm bg-emerald-900/30 relative',
            solarStatus === 'normal'
              ? 'border-emerald-400 shadow-emerald-500/50'
              : '',
            solarStatus === 'warning'
              ? 'border-amber-400 shadow-amber-500/50 bg-amber-100/10'
              : '',
            solarStatus === 'error'
              ? 'border-rose-400 shadow-rose-500/50 bg-rose-100/10'
              : '',
          ]"
        >
          <div class="wire-to-center wire-bottom"></div>
          <component
            :is="'SolarpanelIcon'"
            :class="[
              'h-8 w-8 text-emerald-100',
              solarStatus === 'normal' ? 'text-emerald-400' : '',
              solarStatus === 'warning' ? 'text-amber-400' : '',
              solarStatus === 'error' ? 'text-rose-400' : '',
            ]"
          />
          <div class="flex flex-col">
            <span class="text-base font-medium">{{
              $t('main.dashboard.new_pv_system')
            }}</span>
            <span class="text-base font-bold text-emerald-300"
              >{{ solarPower }} kWp</span
            >
            <span class="text-xs">{{
              solarStatus === 'normal'
                ? $t('main.dashboard.normal')
                : solarStatus === 'warning'
                  ? $t('main.dashboard.warning')
                  : $t('main.dashboard.error')
            }}</span>
          </div>
        </div>
        <div
          :class="[
            'flex-1 border-2 rounded-lg p-4 flex items-center space-x-2 shadow-lg backdrop-blur-sm bg-emerald-900/30 relative',
            batteryStatus === 'normal'
              ? 'border-emerald-400 shadow-emerald-500/50'
              : '',
            batteryStatus === 'warning'
              ? 'border-amber-400 shadow-amber-500/50 bg-amber-100/10'
              : '',
            batteryStatus === 'error'
              ? 'border-rose-400 shadow-rose-500/50 bg-rose-100/10'
              : '',
          ]"
        >
          <div class="wire-to-center wire-bottom"></div>
          <component
            :is="'BatteryIcon'"
            :class="[
              'h-8 w-8 text-emerald-100',
              batteryStatus === 'normal' ? 'text-emerald-400' : '',
              batteryStatus === 'warning' ? 'text-amber-400' : '',
              batteryStatus === 'error' ? 'text-rose-400' : '',
            ]"
          />
          <div class="flex flex-col">
            <span class="text-base font-medium">{{
              $t('main.dashboard.energy_storage_system')
            }}</span>
            <span class="text-base font-bold text-emerald-300"
              >{{ batteryPower }} kW / {{ batteryCapacity }} kWh</span
            >
            <span class="text-xs">{{
              batteryStatus === 'normal'
                ? $t('main.dashboard.normal')
                : batteryStatus === 'warning'
                  ? $t('main.dashboard.warning')
                  : $t('main.dashboard.error')
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-emerald-900\/30 {
  background-color: rgba(6, 78, 59, 0.3);
  transition: all 0.3s ease;
}

.bg-emerald-900\/30:hover {
  background-color: rgba(6, 78, 59, 0.4);
  transform: translateY(-2px);
}

.border-emerald-400,
.border-amber-400,
.border-rose-400 {
  transition: all 0.3s ease;
}

.border-emerald-400:hover,
.border-amber-400:hover,
.border-rose-400:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.text-emerald-300 {
  text-shadow: 0 0 10px rgba(110, 231, 183, 0.3);
}

/* 導線樣式 */
.wire-to-center,
.wire-top,
.wire-bottom {
  position: absolute;
  background-color: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  overflow: hidden;
  z-index: 1;
}

/* 桌面版導線樣式 */
@media (min-width: 1024px) {
  .wire-top {
    width: 2px;
    height: 120px;
    bottom: -120px;
    left: 50%;
    transform: translateX(-50%);
  }

  .wire-bottom {
    width: 2px;
    height: 120px;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
  }
}

/* 手機版導線樣式 */
@media (max-width: 1023px) {
  .wire-top {
    width: 2px;
    height: 30px;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
  }

  .wire-bottom {
    width: 2px;
    height: 30px;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.system-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wire-vertical {
  position: absolute;
  width: 4px;
  height: 200px;
  background: linear-gradient(
    to top,
    rgba(16, 185, 129, 0.5),
    rgba(16, 185, 129, 1)
  );
  background-size: 100% 200%;
  animation: flow-up 2s linear infinite;
  z-index: 1;
}
</style>
