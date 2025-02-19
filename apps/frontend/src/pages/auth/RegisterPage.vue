<template>
  <div class="flex h-screen items-center justify-center bg-white">
    <div class="w-full max-w-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">{{ $t('app_name') }}</h1>
      </div>

      <h2 class="text-3xl font-bold mb-6">{{ $t('auth.create_account') }}</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            {{ $t('auth.user_name') }}
          </label>
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
          >
            {{ $t('auth.email') }}
          </label>
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
          >
            {{ $t('auth.password') }}
          </label>
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
          >
            {{ $t('auth.confirm_password') }}
          </label>
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
            {{ $t('auth.terms_agreement') }}
            <a
              href="/terms-conditions"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ $t('auth.terms_conditions') }}
            </a>
          </label>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
        >
          {{
            isLoading
              ? $t('auth.creating_account')
              : $t('auth.create_account_button')
          }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        {{ $t('auth.already_have_account') }}
        <router-link to="/login" class="text-blue-600 hover:text-blue-800">
          {{ $t('auth.sign_in_redirect') }}
        </router-link>
      </p>
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
