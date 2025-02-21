<template>
  <!-- Entry Buttons Section -->
  <div class="py-12 bg-gradient-to-b from-gray-800 to-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-cyan-300 sm:text-4xl">
          {{ $t('home.features.monitoring.title') }}
        </h2>
        <p class="mt-4 text-xl text-cyan-100">
          {{ $t('home.features.monitoring.description') }}
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          class="animated-border bg-gray-800 backdrop-blur-lg p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
        >
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <h3 class="text-lg font-medium text-cyan-300">
            {{ $t('home.features.monitoring.title') }}
          </h3>
          <p class="mt-2 text-cyan-100">
            {{ $t('home.features.monitoring.description') }}
          </p>
          <a
            href="#"
            class="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            {{ $t('home.features.monitoring.button') }}
          </a>
        </div>

        <div
          class="animated-border bg-gray-800 backdrop-blur-lg p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
        >
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <h3 class="text-lg font-medium text-cyan-300">
            {{ $t('home.features.analytics.title') }}
          </h3>
          <p class="mt-2 text-cyan-100">
            {{ $t('home.features.analytics.description') }}
          </p>
          <a
            href="#"
            class="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            {{ $t('home.features.analytics.button') }}
          </a>
        </div>

        <div
          class="animated-border bg-gray-800 backdrop-blur-lg p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
        >
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <h3 class="text-lg font-medium text-cyan-300">
            {{ $t('home.features.scheduling.title') }}
          </h3>
          <p class="mt-2 text-cyan-100">
            {{ $t('home.features.scheduling.description') }}
          </p>
          <a
            href="#"
            class="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            {{ $t('home.features.scheduling.button') }}
          </a>
        </div>

        <div
          class="animated-border bg-gray-800 backdrop-blur-lg p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
        >
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <h3 class="text-lg font-medium text-cyan-300">
            {{ $t('home.features.system_monitoring.title') }}
          </h3>
          <p class="mt-2 text-cyan-100">
            {{ $t('home.features.system_monitoring.description') }}
          </p>
          <a
            href="#"
            class="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            {{ $t('home.features.system_monitoring.button') }}
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="py-12 bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div
          class="animated-border bg-gray-800 p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <h3 class="text-lg font-medium text-cyan-300">
            {{ $t('home.features.solar_panel.title') }}
          </h3>
          <p class="mt-2 text-cyan-100">
            {{ $t('home.features.solar_panel.description') }}
          </p>
        </div>

        <div
          class="animated-border bg-gray-800 p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <h3 class="text-lg font-medium text-cyan-300">
            {{ $t('home.features.energy_storage.title') }}
          </h3>
          <p class="mt-2 text-cyan-100">
            {{ $t('home.features.energy_storage.description') }}
          </p>
        </div>

        <div
          class="animated-border bg-gray-800 p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>
          <span class="border-animate"></span>

          <h3 class="text-lg font-medium text-cyan-300">
            {{ $t('home.features.energy_consumption.title') }}
          </h3>
          <p class="mt-2 text-cyan-100">
            {{ $t('home.features.energy_consumption.description') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.animate-bounce-slow {
  animation: bounce 2s forwards;
}

.animated-border {
  position: relative;
  min-width: 200px;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s ease;
}

.animated-border:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 255, 255, 0.2);
}

.animated-border span {
  position: absolute;
  background-color: #ffffff;
}

.animated-border span:nth-child(1) {
  width: 1px;
  left: 0;
  bottom: 0;
}

.animated-border span:nth-child(2) {
  height: 1px;
  left: 0;
  top: 0;
}

.animated-border span:nth-child(3) {
  width: 1px;
  right: 0;
  top: 0;
}

.animated-border span:nth-child(4) {
  height: 1px;
  right: 0;
  bottom: 0;
}

.animated-border:hover span:nth-child(1) {
  animation: move1 1500ms infinite ease;
}
.animated-border:hover span:nth-child(2) {
  animation: move2 1500ms infinite ease;
}
.animated-border:hover span:nth-child(3) {
  animation: move3 1500ms infinite ease;
}
.animated-border:hover span:nth-child(4) {
  animation: move4 1500ms infinite ease;
}

@keyframes move1 {
  0% {
    height: 100%;
    bottom: 0;
  }
  54% {
    height: 0;
    bottom: 100%;
  }
  55% {
    height: 0;
    bottom: 0;
  }
  100% {
    height: 100%;
    bottom: 0;
  }
}
@keyframes move2 {
  0% {
    width: 0;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0;
    left: 100%;
  }
}
@keyframes move3 {
  0% {
    height: 100%;
    top: 0;
  }
  54% {
    height: 0;
    top: 100%;
  }
  55% {
    height: 0;
    top: 0;
  }
  100% {
    height: 100%;
    top: 0;
  }
}
@keyframes move4 {
  0% {
    width: 0;
    right: 0;
  }
  55% {
    width: 100%;
    right: 0;
  }
  100% {
    width: 0;
    right: 100%;
  }
}
</style>
