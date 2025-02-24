<template>
  <div
    class="absolute top-[102px] md:left-[290px] left-6 right-6 bottom-11 rounded-2xl bg-white/10 backdrop-blur-[30px] border border-white/10 shadow-lg p-4 md:p-6 z-10"
  >
    <div
      v-if="userStore.user"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      <!-- 歡迎卡片 -->
      <div
        class="col-span-full bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 md:p-6 border border-white/10"
      >
        <h1 class="text-2xl md:text-3xl font-bold text-white text-center">
          {{ $t('main.profile.title') }}
        </h1>
      </div>

      <!-- 用戶資訊卡片 -->
      <div
        class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 md:p-6 border border-white/10"
      >
        <h2 class="text-lg md:text-xl font-semibold text-white mb-4">
          {{ $t('main.profile.information') }}
        </h2>
        <div class="space-y-3 md:space-y-4">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0"
          >
            <span class="text-sm md:text-base text-white/80">{{
              $t('auth.user_name')
            }}</span>
            <span class="text-sm md:text-base text-white">{{
              userStore.user.data.username
            }}</span>
          </div>
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0"
          >
            <span class="text-sm md:text-base text-white/80">{{
              $t('auth.email')
            }}</span>
            <span class="text-sm md:text-base text-white break-all">{{
              userStore.user.data.email
            }}</span>
          </div>
        </div>
      </div>

      <!-- 時間資訊卡片 -->
      <div
        class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 md:p-6 border border-white/10"
      >
        <h2 class="text-lg md:text-xl font-semibold text-white mb-4">
          {{ $t('main.profile.time_information') }}
        </h2>
        <div class="space-y-3 md:space-y-4">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0"
          >
            <span class="text-sm md:text-base text-white/80">{{
              $t('main.profile.join_date')
            }}</span>
            <span class="text-sm md:text-base text-white">{{
              new Date(userStore.user.data.created_at).toLocaleString()
            }}</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 md:p-6 border border-white/10"
      >
        <h2 class="text-lg md:text-xl font-semibold text-white mb-4">
          {{ $t('main.profile.update_information') }}
        </h2>
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm text-white/80">{{
              $t('auth.user_name')
            }}</label>
            <div class="flex gap-2">
              <input
                type="text"
                v-model="userStore.user.data.name"
                class="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-cyan-500"
              />
              <button
                class="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-200"
                @click="handleUpdateProfile"
              >
                {{ $t('main.profile.update') }}
              </button>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm text-white/80">{{ $t('auth.email') }}</label>
            <div class="flex gap-2">
              <input
                type="email"
                v-model="userStore.user.data.email"
                class="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-cyan-500"
              />
              <button
                class="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-200"
                @click="handleUpdateProfile"
              >
                {{ $t('main.profile.update') }}
              </button>
            </div>
            <div class="flex items-center justify-center md:justify-between">
              <button
                class="w-full md:w-auto px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-200 text-sm md:text-base"
                @click="showPasswordModal = true"
              >
                {{ $t('main.profile.update_password') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 載入中狀態 -->
    <div v-else class="flex flex-col items-center justify-center min-h-[50vh]">
      <div
        class="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-4 border-white border-t-transparent"
      ></div>
      <p class="text-base md:text-lg text-white mt-4">
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
      <div class="relative bg-white rounded-lg p-6 w-full max-w-md">
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

        <h3 class="text-xl font-semibold mb-4">
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
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              $t('main.profile.new_password')
            }}</label>
            <input
              type="password"
              v-model="newPassword"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            class="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
            :disabled="isLoading"
            @click="handleUpdatePassword"
          >
            <span v-if="!isLoading">{{
              $t('main.profile.confirm_update')
            }}</span>
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
  </div>
</template>

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
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '請填寫完整密碼資訊'
    })
    return
  }

  try {
    isLoading.value = true
    // 這裡需要實作更新密碼的API呼叫
    await userStore.updatePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    })

    showPasswordModal.value = false
    oldPassword.value = ''
    newPassword.value = ''

    Swal.fire({
      icon: 'success',
      title: '成功',
      text: '密碼已更新成功，請重新登入'
    })
    await authStore.logout()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: error.message || '密碼更新失敗，請稍後再試'
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await userStore.fetchUser()
})
</script>
