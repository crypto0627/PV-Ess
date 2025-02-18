<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <span class="text-2xl font-bold text-blue-600">PV-ESS</span>
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" class="text-gray-700 hover:text-blue-600">Products</a>
            <a href="#" class="text-gray-700 hover:text-blue-600">Solutions</a>
            <a href="#" class="text-gray-700 hover:text-blue-600">Contact</a>
            <button
              type="submit"
              @click="handleSubmit"
              class="text-gray-700 hover:text-blue-600"
            >
              Logout
            </button>
          </div>
          <div class="md:hidden">
            <button
              @click="toggleMenu"
              class="text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Mobile menu -->
      <div
        :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
        class="md:hidden"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >Home</a
          >
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >Products</a
          >
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >Solutions</a
          >
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >Contact</a
          >
          <button
            type="submit"
            @click="handleSubmit"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div
          class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32"
        >
          <main
            class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28"
          >
            <div class="text-center">
              <h1
                class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span class="block">Smart Energy Storage</span>
                <span class="block text-blue-600">For Your Future</span>
              </h1>
              <p
                class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl"
              >
                Optimize your energy consumption with our advanced energy
                storage solutions.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
                <div class="rounded-md shadow">
                  <a
                    href="#"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-blue-600 text-4xl mb-4">
              <i class="fas fa-solar-panel"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Solar Integration</h3>
            <p class="mt-2 text-gray-600">
              Seamlessly integrate with your existing solar system for maximum
              efficiency.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-blue-600 text-4xl mb-4">
              <i class="fas fa-battery-full"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Battery Storage</h3>
            <p class="mt-2 text-gray-600">
              Advanced lithium battery technology for reliable energy storage.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-blue-600 text-4xl mb-4">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Smart Management</h3>
            <p class="mt-2 text-gray-600">
              Intelligent energy management system for optimal power
              distribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store/auth'

const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await authStore.logout()
    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: `Logout successful!`,
      timer: 1500,
      showConfirmButton: false
    })
    router.push('/login')
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: (error as Error).message,
      confirmButtonText: 'OK'
    })
  } finally {
    isLoading.value = false
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
