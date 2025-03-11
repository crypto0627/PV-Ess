<template>
  <div
    class="mt-4 p-4 bg-[#0a3726]/80 backdrop-blur-sm rounded-2xl border border-emerald-500/30"
  >
    <h2 class="text-xl font-medium mb-4 text-emerald-100 flex items-center">
      <span class="mr-2">{{ $t('main.dashboard.operation_status') }}</span>
      <div class="h-1 flex-1 bg-emerald-500/50 rounded overflow-hidden">
        <div
          class="h-full w-[30%] bg-emerald-400 animate-[energyBar_2s_ease-in-out_infinite] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-emerald-300/50 before:to-transparent before:animate-[energyPulse_1.5s_ease-in-out_infinite]"
        ></div>
      </div>
    </h2>
    <div class="grid grid-cols-2 gap-6">
      <div
        class="flex flex-col items-center bg-emerald-800/80 p-3 rounded-xl hover:bg-emerald-800/30 transition-all"
      >
        <div class="text-sm text-emerald-100 font-medium mb-2">
          {{ $t('main.dashboard.charge') }}
        </div>
        <div
          class="w-5 h-5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse"
        ></div>
      </div>
      <div
        class="flex flex-col items-center bg-emerald-800/80 p-3 rounded-xl hover:bg-emerald-800/30 transition-all"
      >
        <div class="text-sm text-emerald-100 font-medium mb-2">
          {{ $t('main.dashboard.standby') }}
        </div>
        <div
          class="w-5 h-5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50 animate-pulse"
        ></div>
      </div>
      <div
        class="text-base text-emerald-100 font-bold text-center col-span-2 my-2 bg-emerald-800/40 py-2 rounded-lg mx-auto p-4"
      >
        {{ $t('main.dashboard.operation_status') }}
      </div>
      <div
        class="flex flex-col items-center bg-emerald-800/80 p-3 rounded-xl hover:bg-emerald-800/30 transition-all"
      >
        <div class="text-sm text-emerald-100 font-medium mb-2">
          {{ $t('main.dashboard.discharge') }}
        </div>
        <div
          class="w-5 h-5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse"
        ></div>
      </div>
      <div
        class="flex flex-col items-center bg-emerald-800/80 p-3 rounded-xl hover:bg-emerald-800/30 transition-all"
      >
        <div class="text-sm text-emerald-100 font-medium mb-2">
          {{ $t('main.dashboard.shutdown') }}
        </div>
        <div
          class="w-5 h-5 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50 animate-pulse"
        ></div>
      </div>
    </div>
  </div>
</template>
