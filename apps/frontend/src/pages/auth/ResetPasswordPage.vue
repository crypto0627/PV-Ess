<template>
  <div class="relative h-screen">
    <!-- Logo and title -->
    <div class="absolute top-4 left-4 z-10 flex items-center">
      <h1 class="text-2xl font-bold text-gray-800">PV-ESS</h1>
    </div>

    <div class="flex h-full">
      <!-- Form section -->
      <div
        class="w-full md:w-3/10 flex items-center justify-center bg-white p-8"
      >
        <div class="w-full max-w-md mt-16">
          <h2 class="text-3xl font-bold mb-6">{{ pageTitle }}</h2>
          <p class="mb-6 text-gray-600">{{ pageDescription }}</p>

          <form @submit.prevent="handleSubmit">
            <div v-if="!hasResetToken">
              <!-- Email input -->
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div v-else>
              <!-- New Password input -->
              <div class="mb-4">
                <label
                  for="newPassword"
                  class="block mb-2 text-sm font-medium text-gray-700"
                  >New Password</label
                >
                <input
                  type="password"
                  id="newPassword"
                  v-model="newPassword"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <!-- Confirm Password input -->
              <div class="mb-6">
                <label
                  for="confirmPassword"
                  class="block mb-2 text-sm font-medium text-gray-700"
                  >Confirm New Password</label
                >
                <input
                  type="password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              :disabled="loading"
            >
              {{ submitButtonText }}
            </button>
          </form>

          <p class="mt-4 text-center text-sm text-gray-600">
            Remember your password?
            <a
              href="#"
              @click.prevent="switchToLogin"
              class="text-blue-600 hover:text-blue-800"
              >Back to login</a
            >
          </p>
        </div>
      </div>

      <!-- Image section -->
      <div class="hidden md:block w-7/10 bg-gray-200">
        <img
          src="/red-plum.jpg"
          alt="Reset Password background"
          class="w-full h-full object-cover"
        />
      </div>
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

// 1. 在组件加载时进行 token 验证
onMounted(async () => {
  resetToken.value = (route.query.token as string) || ''
  try {
    // 进行验证 Token 请求
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

// 2. 计算属性
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

// 3. 提交处理函数
const handleSubmit = async () => {
  loading.value = true

  try {
    if (hasResetToken.value) {
      // Reset Password 请求
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

// 4. 跳转到登录页面
const switchToLogin = () => {
  router.push('/login')
}
</script>
