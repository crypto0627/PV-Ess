<template>
  <div
    class="flex h-screen items-center justify-center bg-gradient-to-br from-green-400 to-green-100"
  >
    <BackgroundElemt />
    <div
      class="relative z-[2] w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-xl"
    >
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">
          {{ $t('auth.welcome') }}
        </h1>
      </div>

      <h2 class="text-2xl font-bold mb-6 text-green-700">
        {{ $t('auth.reset_password') }}
      </h2>
      <p class="mb-6 text-green-600">
        {{ $t('auth.reset_password_description') }}
      </p>

      <form @submit.prevent="handleSubmit">
        <div v-if="!hasResetToken">
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-green-700"
              >Email</label
            >
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
              required
            />
          </div>
        </div>

        <div v-else>
          <div class="mb-4">
            <label
              for="newPassword"
              class="block mb-2 text-sm font-medium text-green-700"
              >{{ $t('auth.new_password') }}</label
            >
            <input
              id="newPassword"
              v-model="newPassword"
              type="password"
              class="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="confirmPassword"
              class="block mb-2 text-sm font-medium text-green-700"
              >{{ $t('auth.confirm_new_password') }}</label
            >
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          :disabled="loading"
        >
          {{ $t('auth.reset_password') }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-green-600">
        {{ $t('auth.remember_password') }}
        <router-link
          to="/login"
          class="text-green-700 hover:text-green-900 font-medium"
          >{{ $t('auth.back_to_login') }}</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackgroundElemt from '@/components/common/BackgroundElemt.vue'
import { useAuthStore } from '@/store/auth'
import Swal from 'sweetalert2'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const resetToken = ref((route.query.token as string) || '')
const loading = ref(false)

const showAlert = (title: string, text: string, icon: 'success' | 'error') => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK'
  })
}

onMounted(async () => {
  try {
    const res = await authStore.verify_reset_token(resetToken.value)
    await showAlert('Success!', res.data.message, 'success')
  } catch (error) {
    console.error('Error verifying token:', error)
    await showAlert(
      'Error!',
      'An error occurred while verifying the token.',
      'error'
    )
    router.push('/forgot-password')
  }
})

const hasResetToken = computed(() => !!resetToken.value)

const handleSubmit = async () => {
  loading.value = true

  try {
    if (hasResetToken.value) {
      if (newPassword.value !== confirmPassword.value) {
        await showAlert('Error!', 'Passwords do not match!', 'error')
        return
      }

      const res = await authStore.reset_password(
        resetToken.value,
        newPassword.value
      )

      await showAlert('Success!', res.data.message, 'success')
      router.push('/login')
    } else {
      router.push('/forgot-password')
    }
  } catch (error) {
    console.error(error)
    await showAlert('Error!', 'An error occurred. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}
</script>
