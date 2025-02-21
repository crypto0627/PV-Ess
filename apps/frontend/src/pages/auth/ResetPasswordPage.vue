<template>
  <div
    class="flex h-screen items-center justify-center bg-gradient-to-br from-green-400 to-green-100"
  >
    <div
      class="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-xl"
    >
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">PV-ESS</h1>
      </div>

      <h2 class="text-2xl font-bold mb-6 text-green-700">{{ pageTitle }}</h2>
      <p class="mb-6 text-green-600">{{ pageDescription }}</p>

      <form @submit.prevent="handleSubmit">
        <div v-if="!hasResetToken">
          <!-- Email input -->
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-green-700"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
              required
            />
          </div>
        </div>

        <div v-else>
          <!-- New Password input -->
          <div class="mb-4">
            <label
              for="newPassword"
              class="block mb-2 text-sm font-medium text-green-700"
              >New Password</label
            >
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              class="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
              required
            />
          </div>

          <!-- Confirm Password input -->
          <div class="mb-6">
            <label
              for="confirmPassword"
              class="block mb-2 text-sm font-medium text-green-700"
              >Confirm New Password</label
            >
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
              required
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          :disabled="loading"
        >
          {{ submitButtonText }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-green-600">
        Remember your password?
        <a
          href="#"
          @click.prevent="switchToLogin"
          class="text-green-700 hover:text-green-900 font-medium"
          >Back to login</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const router = useRouter()

const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const resetToken = ref('')
const loading = ref(false)
const authStore = useAuthStore()

// 1. Validate token on component load
onMounted(async () => {
  resetToken.value = (route.query.token as string) || ''
  try {
    // Verify Token request
    const res = await authStore.verify_reset_token(resetToken.value)
    Swal.fire({
      title: 'Success!',
      text: res.data.message,
      icon: 'success',
      confirmButtonText: 'OK'
    })
  } catch (error) {
    console.error('Error verifying token:', error)
    Swal.fire({
      title: 'Error!',
      text: 'An error occurred while verifying the token.',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(() => {
      router.push('/forgot-password')
    })
  }
})

// 2. Computed properties
const hasResetToken = computed(() => !!resetToken.value)
const pageTitle = computed(() =>
  hasResetToken.value ? 'Reset Password' : 'Forgot Password'
)
const pageDescription = computed(() =>
  hasResetToken.value
    ? 'Enter your new password below.'
    : "Enter your email address and we'll send you a link to reset your password."
)
const submitButtonText = computed(() =>
  hasResetToken.value ? 'Reset Password' : 'Send Reset Link'
)

// 3. Submit handler
const handleSubmit = async () => {
  loading.value = true

  try {
    if (hasResetToken.value) {
      // Reset Password request
      if (newPassword.value !== confirmPassword.value) {
        Swal.fire({
          title: 'Error!',
          text: 'Passwords do not match!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        loading.value = false
        return
      }

      const res = await authStore.reset_password(
        resetToken.value,
        newPassword.value
      )

      Swal.fire({
        title: 'Success!',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/login')
      })
    } else {
      router.push('/forgot-password')
    }
  } catch (error) {
    console.error(error)
    Swal.fire({
      title: 'Error!',
      text: 'An error occurred. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }

  loading.value = false
}

// 4. Switch to login page
const switchToLogin = () => {
  router.push('/login')
}
</script>
