<script setup>
import { useUserStore } from '@/store/user'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()

const showPasswordModal = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const isLoading = ref(false)

const handleUpdatePassword = async () => {
  if (!oldPassword.value || !newPassword.value) {
    await Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '請填寫完整密碼資訊',
    })
    return
  }

  try {
    isLoading.value = true
    // 這裡需要實作更新密碼的API呼叫
    await userStore.updatePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    })

    showPasswordModal.value = false
    oldPassword.value = ''
    newPassword.value = ''

    await Swal.fire({
      icon: 'success',
      title: '成功',
      text: '密碼已更新成功，請重新登入',
    })
    await authStore.logout()
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: error.message || '密碼更新失敗，請稍後再試',
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await userStore.fetchUser()
})
</script>

<template>
  <div
    v-if="userStore.user"
    class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 bg-white p-6 rounded-lg shadow-sm"
  >
    <!-- 歡迎卡片 -->
    <div
      class="col-span-full bg-white rounded-2xl p-4 md:p-6 border border-gray-200"
    >
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 text-center">
        {{ $t('main.profile.title') }}
      </h1>
    </div>

    <!-- 用戶資訊卡片 -->
    <div class="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
      <h2 class="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        {{ $t('main.profile.information') }}
      </h2>
      <div class="space-y-3 md:space-y-4">
        <div class="flex justify-between">
          <span class="text-sm md:text-base text-gray-600">{{
            $t('auth.user_name')
          }}</span>
          <span class="text-sm md:text-base text-gray-900">{{
            userStore.user.data.username
          }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm md:text-base text-gray-600">{{
            $t('auth.email')
          }}</span>
          <span class="text-sm md:text-base text-gray-900 break-all">{{
            userStore.user.data.email
          }}</span>
        </div>
      </div>
    </div>

    <!-- 時間資訊卡片 -->
    <div class="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
      <h2 class="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        {{ $t('main.profile.time_information') }}
      </h2>
      <div class="flex justify-between">
        <span class="text-sm md:text-base text-gray-600">{{
          $t('main.profile.join_date')
        }}</span>
        <span class="text-sm md:text-base text-gray-900">{{
          new Date(userStore.user.data.created_at).toLocaleString()
        }}</span>
      </div>
    </div>

    <!-- 更新資訊卡片 -->
    <div class="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
      <h2 class="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        {{ $t('main.profile.update_information') }}
      </h2>
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm text-gray-600">{{
            $t('auth.user_name')
          }}</label>
          <div class="flex gap-2">
            <input
              type="text"
              v-model="userStore.user.data.name"
              class="w-full px-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <button
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
              @click="handleUpdateProfile"
            >
              {{ $t('main.profile.update') }}
            </button>
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-sm text-gray-600">{{ $t('auth.email') }}</label>
          <div class="flex gap-2">
            <input
              type="email"
              v-model="userStore.user.data.email"
              class="w-full px-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <button
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
              @click="handleUpdateProfile"
            >
              {{ $t('main.profile.update') }}
            </button>
          </div>
          <button
            class="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
            @click="showPasswordModal = true"
          >
            {{ $t('main.profile.update_password') }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 載入中狀態 -->
  <div v-else class="flex flex-col items-center justify-center min-h-[50vh]">
    <div
      class="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-4 border-gray-300 border-t-transparent"
    ></div>
    <p class="text-base md:text-lg text-gray-900 mt-4">
      {{ $t('main.profile.loading') }}
    </p>
  </div>

  <!-- 修改密碼彈窗 -->
  <div
    v-if="showPasswordModal"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="absolute inset-0 bg-black/50"
      @click="showPasswordModal = false"
    ></div>
    <div
      class="relative bg-white rounded-lg p-6 w-full max-w-md border border-gray-200"
    >
      <button
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:scale-105 duration-300"
        @click="showPasswordModal = false"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <h3 class="text-xl font-semibold mb-4 text-gray-900">
        {{ $t('main.profile.update_password') }}
      </h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{
            $t('main.profile.old_password')
          }}</label>
          <input
            type="password"
            v-model="oldPassword"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{
            $t('main.profile.new_password')
          }}</label>
          <input
            type="password"
            v-model="newPassword"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <button
          class="w-full px-4 py-2 bg-green-900 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          :disabled="isLoading"
          @click="handleUpdatePassword"
        >
          <span v-if="!isLoading">{{ $t('main.profile.confirm_update') }}</span>
          <div
            v-else
            class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"
          ></div>
        </button>
        <router-link
          to="/forgot-password"
          class="hover:text-gray-700 hover:underline"
          >{{ $t('auth.forgot_password') }}</router-link
        >
      </div>
    </div>
  </div>
</template>
