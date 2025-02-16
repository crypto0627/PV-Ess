<template>
  <div class="relative h-screen">
    <div class="absolute top-4 left-4 z-10 flex items-center">
      <h1 class="text-2xl font-bold text-gray-800">PV-ESS</h1>
    </div>

    <div class="flex h-full">
      <div
        class="w-full md:w-3/10 flex items-center justify-center bg-white p-8"
      >
        <div class="w-full max-w-md mt-16">
          <h2 class="text-3xl font-bold mb-6">Sign In</h2>

          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="email"
                autocomplete="user-email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-700"
                >Password</label
              >
              <input
                type="password"
                id="password"
                v-model="password"
                autocomplete="current-password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="staySignedIn"
                  v-model="staySignedIn"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="staySignedIn"
                  class="ml-2 block text-sm text-gray-700"
                  >Stay signed in</label
                >
              </div>
              <a
                href="/forgot-password"
                class="text-sm text-blue-600 hover:text-blue-800"
                >Forgot password?</a
              >
            </div>

            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isLoading || cooldown > 0"
            >
              {{
                cooldown > 0
                  ? `Please waiting for ${cooldown} seconds!`
                  : isLoading
                    ? 'Signing in...'
                    : 'Sign In'
              }}
            </button>
          </form>

          <div
            v-if="errorMessage"
            class="mt-4 text-center text-red-600 text-sm"
          >
            {{ errorMessage }}
          </div>

          <div class="mt-4 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <a href="/register" class="text-blue-600 hover:text-blue-800"
                >Sign up</a
              >
            </p>
          </div>
        </div>
      </div>

      <div class="hidden md:block w-7/10 bg-gray-200">
        <img
          src="/red-plum.jpg"
          alt="Login background"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store/auth'

const email = ref('')
const password = ref('')
const staySignedIn = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)
const cooldown = ref(0)
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  if (isLoading.value || cooldown.value > 0) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    await authStore.login(email.value, password.value)

    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Login successful',
      timer: 1500,
      showConfirmButton: false
    })

    router.push('/home')
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      // 處理 429 Too Many Requests
      const retryAfter = error.response.data.retryAfter || 30 // 預設 30 秒
      errorMessage.value = `Too many requests. Please wait ${retryAfter} seconds.`
      startCooldown(retryAfter)
    } else {
      errorMessage.value = 'Login failed. Please check your credentials.'
    }

    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage.value,
      confirmButtonText: 'OK'
    })
  } finally {
    isLoading.value = false
  }
}

const startCooldown = (seconds: number) => {
  cooldown.value = seconds
  const interval = setInterval(() => {
    cooldown.value--
    if (cooldown.value <= 0) clearInterval(interval)
  }, 1000)
}
</script>
