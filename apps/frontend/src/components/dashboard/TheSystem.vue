<template>
  <div
    class="grid grid-cols-2 gap-4 sm:gap-8 p-2 sm:p-4 md:p-12 min-h-[300px] sm:min-h-[400px] bg-gray-500 rounded-xl sm:rounded-2xl relative"
  >
    <!-- 左上 Old PV System -->
    <div
      class="relative flex justify-center text-center mx-4 sm:mx-16 md:mx-32 p-3 sm:p-5 rounded-lg sm:rounded-xl text-white"
    >
      <div class="w-full mx-auto">
        <svg class="w-8 h-8 sm:w-12 sm:h-12 mx-auto" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2L1 21h22L12 2zm0 3.84l6.16 11.16H5.84L12 5.84z"
          />
        </svg>
        <p class="mt-1 sm:mt-2 text-sm sm:text-base">Old PV System</p>
        <p class="text-green-400 text-sm sm:text-base">Status: Running</p>
      </div>
    </div>

    <!-- 右上 Electrical Grid -->
    <div
      class="relative flex justify-center text-center mx-4 sm:mx-16 md:mx-32 p-3 sm:p-5 rounded-lg sm:rounded-xl text-white"
    >
      <div class="w-full">
        <svg class="w-8 h-8 sm:w-12 sm:h-12 mx-auto" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5 3h14v2H5V3zm2 4h10v2H7V7zm-2 4h14v2H5v-2zm2 4h10v2H7v-2z"
          />
        </svg>
        <p class="mt-1 sm:mt-2 text-sm sm:text-base">Electrical Grid</p>
        <p class="text-sm sm:text-base">Frequency: 60Hz</p>
      </div>
    </div>

    <!-- 左下 New PV System -->
    <div
      class="relative flex justify-center text-center mx-4 sm:mx-16 md:mx-32 p-3 sm:p-5 rounded-lg sm:rounded-xl text-white mt-8"
    >
      <div class="w-full">
        <svg class="w-8 h-8 sm:w-12 sm:h-12 mx-auto" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2L1 21h22L12 2zm0 3.84l6.16 11.16H5.84L12 5.84z"
          />
        </svg>
        <p class="mt-1 sm:mt-2 text-sm sm:text-base">New PV System</p>
        <p class="text-yellow-400 text-sm sm:text-base">
          Status: Shutting Down
        </p>
      </div>
    </div>

    <!-- 連接線容器 -->
    <div class="absolute inset-0">
      <!-- 上方連接線 -->
      <div class="absolute top-[25%] left-[25%] right-[25%] h-0.5">
        <canvas ref="topLineCanvas" class="w-full h-full"></canvas>
        <Zap
          class="absolute text-yellow-400 top-1/2 -translate-y-1/2 w-4 sm:w-6"
          :style="{ left: zapPosition.top + '%' }"
        />
      </div>

      <!-- 中間連接線 -->
      <div
        class="absolute left-1/2 -translate-x-1/2 top-[25%] bottom-[25%] w-0.5"
      >
        <canvas ref="middleLineCanvas" class="w-full h-full"></canvas>
        <Zap
          class="absolute text-yellow-400 left-1/2 -translate-x-1/2 w-4 sm:w-6"
          :style="{ top: zapPosition.middle + '%' }"
        />
      </div>

      <!-- 下方連接線 -->
      <div class="absolute bottom-[25%] left-[25%] right-[25%] h-0.5">
        <canvas ref="bottomLineCanvas" class="w-full h-full"></canvas>
        <Zap
          class="absolute text-yellow-400 top-1/2 -translate-y-1/2 w-4 sm:w-6"
          :style="{ left: zapPosition.bottom + '%' }"
        />
      </div>
    </div>

    <!-- 右下 Energy Storage System -->
    <div
      class="relative flex justify-center text-center mx-4 sm:mx-16 md:mx-32 p-3 sm:p-5 rounded-lg sm:rounded-xl text-white mt-8"
    >
      <div class="w-full">
        <svg class="w-8 h-8 sm:w-12 sm:h-12 mx-auto" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2L1 21h22L12 2zm0 3.84l6.16 11.16H5.84L12 5.84z"
          />
        </svg>
        <p class="mt-1 sm:mt-2 text-sm sm:text-base">Energy Storage System</p>
        <p class="text-red-400 text-sm sm:text-base">Status: Error</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Zap } from 'lucide-vue-next'
import { onMounted, reactive, ref } from 'vue'

const topLineCanvas = ref(null)
const middleLineCanvas = ref(null)
const bottomLineCanvas = ref(null)

const zapPosition = reactive({
  oldPV: 0,
  top: 0,
  middle: 0,
  bottom: 0
})

function drawDashedLine(canvas, isHorizontal = true, name) {
  const ctx = canvas.getContext('2d')

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  let offset = 0

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.setLineDash([20, 10])

    if (isHorizontal) {
      ctx.moveTo(0, canvas.height / 2)
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.lineDashOffset = -offset
      zapPosition[name] = offset % 100
    } else {
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.lineDashOffset = offset
      zapPosition[name] = 100 - (offset % 100)
    }

    ctx.stroke()
    offset++
    requestAnimationFrame(draw)
  }

  draw()
}

onMounted(() => {
  drawDashedLine(topLineCanvas.value, true, 'top')
  drawDashedLine(middleLineCanvas.value, false, 'middle')
  drawDashedLine(bottomLineCanvas.value, true, 'bottom')
})
</script>
