<template>
  <!-- Entry Buttons Section -->
  <div class="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2
          class="text-4xl font-bold text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
        >
          {{ $t('home.features.monitoring.title') }}
        </h2>
        <p class="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
          {{ $t('home.features.monitoring.description') }}
        </p>
      </div>
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div
          class="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
        >
          <div
            class="h-12 w-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl mb-6 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">
            {{ $t('home.features.monitoring.title') }}
          </h3>
          <p class="text-gray-400 mb-6 line-clamp-3">
            {{ $t('home.features.monitoring.description') }}
          </p>
          <a
            href="#"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
          >
            {{ $t('home.features.monitoring.button') }}
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div
          class="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
        >
          <div
            class="h-12 w-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl mb-6 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">
            {{ $t('home.features.analytics.title') }}
          </h3>
          <p class="text-gray-400 mb-6 line-clamp-3">
            {{ $t('home.features.analytics.description') }}
          </p>
          <a
            href="#"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
          >
            {{ $t('home.features.analytics.button') }}
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div
          class="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
        >
          <div
            class="h-12 w-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl mb-6 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">
            {{ $t('home.features.scheduling.title') }}
          </h3>
          <p class="text-gray-400 mb-6 line-clamp-3">
            {{ $t('home.features.scheduling.description') }}
          </p>
          <a
            href="#"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
          >
            {{ $t('home.features.scheduling.button') }}
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div
          class="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
        >
          <div
            class="h-12 w-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl mb-6 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">
            {{ $t('home.features.system_monitoring.title') }}
          </h3>
          <p class="text-gray-400 mb-6 line-clamp-3">
            {{ $t('home.features.system_monitoring.description') }}
          </p>
          <a
            href="#"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
          >
            {{ $t('home.features.system_monitoring.button') }}
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="py-16 bg-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div
          class="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
        >
          <div
            class="h-12 w-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl mb-6 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">
            {{ $t('home.features.solar_panel.title') }}
          </h3>
          <p class="text-gray-400">
            {{ $t('home.features.solar_panel.description') }}
          </p>
        </div>

        <div
          class="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
        >
          <div
            class="h-12 w-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl mb-6 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">
            {{ $t('home.features.energy_storage.title') }}
          </h3>
          <p class="text-gray-400">
            {{ $t('home.features.energy_storage.description') }}
          </p>
        </div>

        <div
          class="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
        >
          <div
            class="h-12 w-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl mb-6 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">
            {{ $t('home.features.energy_consumption.title') }}
          </h3>
          <p class="text-gray-400">
            {{ $t('home.features.energy_consumption.description') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover {
  transform: translateY(-8px);
}
</style>
