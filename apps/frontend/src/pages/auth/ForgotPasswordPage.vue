<template>
  <div class="relative h-screen">
    <!-- Logo and title -->
    <div class="absolute top-4 left-4 z-10 flex items-center">
      <h1 class="text-2xl font-bold text-gray-800">PV-ESS</h1>
    </div>

    <div class="flex h-full">
      <!-- Form section (3/10) -->
      <div
        class="w-full md:w-3/12 flex items-center justify-center bg-white p-8"
      >
        <div class="w-full max-w-md mt-16">
          <h2 class="text-3xl font-bold mb-6">Forgot Password</h2>
          <p class="mb-6 text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <form @submit.prevent="handleSubmit">
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                v-model="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <!-- Success message -->
            <p
              v-if="successMessage"
              class="text-green-600 text-sm text-center mb-4"
            >
              {{ successMessage }}
            </p>

            <button
              type="submit"
              class="w-full flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
              :disabled="isLoading"
            >
              <svg
                v-if="isLoading"
                class="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                ></path>
              </svg>
              {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
            </button>
          </form>

          <p class="mt-4 text-center text-sm text-gray-600">
            Remember your password?
            <a href="/login" class="text-blue-600 hover:text-blue-800"
              >Back to login</a
            >
          </p>
        </div>
      </div>

      <!-- Image section (7/10) -->
      <div class="hidden md:block w-9/12 bg-gray-200">
        <img
          src="/red-plum.jpg"
          alt="Forgot Password background"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  isLoading.value = true
  successMessage.value = '' // Clear previous messages

  try {
    const res = await authStore.forgot_password(email.value)

    if (res.data?.success) {
      successMessage.value =
        'Password reset link sent successfully! Please check your email.'
      setTimeout(() => {
        router.push('/reset-password')
      }, 1500) // Redirect after 1.5s
    } else {
      successMessage.value = 'Failed to send reset link. Please try again.'
    }
  } catch (error) {
    successMessage.value = 'An error occurred. Please try again later.'
  } finally {
    isLoading.value = false
  }
}
</script>
