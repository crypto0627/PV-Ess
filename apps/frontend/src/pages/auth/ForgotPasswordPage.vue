<template>
  <div
    class="flex h-screen items-center justify-center bg-gradient-to-br from-green-400 to-green-100"
  >
    <BackgroundElemt />
    <div
      class="relative z-[2] w-full max-w-sm p-6 bg-white bg-opacity-90 rounded-lg shadow-xl"
    >
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-green-800">PV-ESS</h1>
      </div>

      <h2 class="text-xl font-bold mb-4 text-green-700">
        {{ $t('auth.forgot_password') }}
      </h2>
      <p class="mb-4 text-sm text-green-600">
        {{ $t('auth.enter_email_to_reset') }}
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-green-700"
          >
            {{ $t('auth.email') }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-3 py-1.5 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
            required
            autocomplete="email"
          />
        </div>

        <!-- Success and Error Messages -->
        <p
          v-if="successMessage"
          class="text-green-600 text-xs text-center mb-3"
        >
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="text-red-600 text-xs text-center mb-3">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white py-1.5 px-3 rounded-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          :disabled="isLoading"
        >
          <svg
            v-if="isLoading"
            class="animate-spin h-4 w-4 mr-2 text-white"
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
          {{
            isLoading
              ? $t('auth.sending_reset_link')
              : $t('auth.send_reset_link')
          }}
        </button>
      </form>

      <p class="mt-3 text-center text-xs text-green-600">
        {{ $t('auth.remember_password') }}
        <router-link
          to="/login"
          class="text-green-700 hover:text-green-900 font-medium"
        >
          {{ $t('auth.back_to_login') }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import BackgroundElemt from '@/components/common/BackgroundElemt.vue'

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
