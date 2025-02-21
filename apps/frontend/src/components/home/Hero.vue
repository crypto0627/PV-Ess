<template>
  <div
    class="relative bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 overflow-hidden"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0 }"
    :visible="{ once: true, amount: 0.2 }"
  >
    <div class="absolute inset-0">
      <div class="animate-pulse-slow opacity-30">
        <div
          class="absolute inset-0 bg-[url('/src/assets/circuit-pattern.svg')] bg-repeat"
        ></div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        <main
          class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28"
        >
          <div class="text-center">
            <h1
              class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
            >
              <span
                class="block bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300"
              >
                {{ $t('home.hero.title') }}
              </span>
              <span class="block text-cyan-300 mt-2">
                {{ $t('home.hero.subtitle') }}
              </span>
            </h1>
            <p
              class="mt-3 text-base text-cyan-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :enter="{
                opacity: 1,
                y: 0,
                transition: { duration: 800, delay: 200 }
              }"
            >
              {{ $t('home.hero.description') }}
            </p>
            <div
              class="mt-5 sm:mt-8 sm:flex sm:justify-center"
              v-motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :enter="{
                opacity: 1,
                scale: 1,
                transition: { duration: 500, delay: 400 }
              }"
            >
              <div class="rounded-md shadow">
                <router-link
                  to="/dashboard"
                  class="animated-border w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 md:py-4 md:text-lg md:px-10 relative overflow-hidden"
                />
                <span class="border-animate"></span>
                <span class="border-animate"></span>
                <span class="border-animate"></span>
                <span class="border-animate"></span>
                <i class="fas fa-rocket mr-2"></i>
                {{ $t('home.hero.button') }}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animated-border {
  position: relative;
}

.animated-border span {
  position: absolute;
  background: linear-gradient(90deg, transparent, #00f7ff);
}

.animated-border span:nth-child(1) {
  width: 100%;
  height: 2px;
  top: 0;
  left: -100%;
  animation: animate1 3s linear infinite;
}

.animated-border span:nth-child(2) {
  width: 2px;
  height: 100%;
  top: -100%;
  right: 0;
  animation: animate2 3s linear infinite;
}

.animated-border span:nth-child(3) {
  width: 100%;
  height: 2px;
  bottom: 0;
  right: -100%;
  animation: animate3 3s linear infinite;
}

.animated-border span:nth-child(4) {
  width: 2px;
  height: 100%;
  bottom: -100%;
  left: 0;
  animation: animate4 3s linear infinite;
}

@keyframes animate1 {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes animate2 {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

@keyframes animate3 {
  0% {
    right: -100%;
  }
  100% {
    right: 100%;
  }
}

@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 100%;
  }
}
</style>
