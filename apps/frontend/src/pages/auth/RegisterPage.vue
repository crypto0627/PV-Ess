<template>
  <div class="relative h-screen">
    <div class="absolute top-4 left-4 z-10 flex items-center">
      <h1 class="text-2xl font-bold text-gray-800">PV-ESS</h1>
    </div>

    <div class="flex h-full">
      <!-- Form section -->
      <div
        class="w-full md:w-3/10 flex items-center justify-center bg-white p-8"
      >
        <div class="w-full max-w-md mt-16">
          <h2 class="text-3xl font-bold mb-6">Create an Account</h2>

          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-700"
                >User Name</label
              >
              <input
                type="text"
                id="username"
                v-model.trim="username"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model.trim="email"
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
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="confirmPassword"
                class="block mb-2 text-sm font-medium text-gray-700"
                >Confirm Password</label
              >
              <input
                type="password"
                id="confirmPassword"
                v-model="confirmPassword"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="mb-6">
              <input
                type="checkbox"
                id="agreeTerms"
                v-model="agreeTerms"
                class="h-4 w-4 text-blue-600"
                required
              />
              <label for="agreeTerms" class="ml-2 text-sm text-gray-700">
                I agree to the
                <a href="#" class="text-blue-600 hover:text-blue-800"
                  >Terms and Conditions</a
                >
              </label>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
            >
              {{ isLoading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>

          <p class="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-blue-600 hover:text-blue-800"
              >Sign in</router-link
            >
          </p>
        </div>
      </div>

      <!-- Image section -->
      <div
        class="hidden md:flex w-7/10 bg-gray-200 items-center justify-center"
      >
        <img
          src="/red-plum.jpg"
          alt="Register background"
          class="max-w-full max-h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store/auth'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  // 確保密碼匹配
  if (password.value !== confirmPassword.value) {
    await Swal.fire({
      icon: 'warning',
      title: 'Password Mismatch',
      text: 'Passwords do not match.',
      confirmButtonText: 'OK'
    })
    return
  }

  isLoading.value = true
  try {
    // 呼叫 API 註冊
    const res = await authStore.register(
      username.value,
      email.value,
      password.value
    )

    // 確保 API 正確回應 message
    if (res?.data?.message) {
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false
      })
      router.push('/login')
    }
  } catch (error) {
    // 安全地解析錯誤信息
    const errorMessage = error.response?.data?.message || 'Something went wrong'
    await Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: errorMessage,
      confirmButtonText: 'OK'
    })
  } finally {
    isLoading.value = false
  }
}
</script>
