<template>
  <div class="flex h-screen items-center justify-center bg-white">
    <div class="w-full max-w-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">PV-ESS</h1>
      </div>

      <h2 class="text-3xl font-bold mb-6">{{ $t('auth.forgot_password') }}</h2>
      <p class="mb-6 text-gray-600">
        {{ $t('auth.enter_email_to_reset') }}
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            {{ $t('auth.email') }}
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autocomplete="email"
          />
        </div>

        <!-- Success and Error Messages -->
        <p
          v-if="successMessage"
          class="text-green-600 text-sm text-center mb-4"
        >
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="text-red-600 text-sm text-center mb-4">
          {{ errorMessage }}
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
          {{ isLoading ? $t('auth.sending') : $t('auth.send_reset_link') }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        {{ $t('auth.remember_password') }}
        <a href="/login" class="text-blue-600 hover:text-blue-800">
          {{ $t('auth.back_to_login') }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const email = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  isLoading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const res = await authStore.forgot_password(email.value)

    if (res.data?.success) {
      successMessage.value =
        'Password reset link sent successfully! Please check your email.'
      setTimeout(() => {
        router.push('/reset-password')
      }, 2000)
    } else {
      errorMessage.value = 'Failed to send reset link. Please try again.'
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      'An error occurred. Please try again later.'
  } finally {
    isLoading.value = false
  }
}
</script>
