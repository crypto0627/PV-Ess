<template>
  <DashboardLayout>
    <div
      v-if="userStore.user"
      class="flex flex-col items-center justify-center h-screen"
    >
      <h1 class="text-2xl font-bold">歡迎來到儀表板!</h1>
      <div class="grid gap-4 mt-8">
        <div class="flex items-center gap-4">
          <span class="font-medium">用戶名稱:</span>
          <span>{{ userStore.user.data.username }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-medium">電子郵件:</span>
          <span>{{ userStore.user.data.email }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-medium">用戶ID:</span>
          <span>{{ userStore.user.data.id }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-medium">創建時間:</span>
          <span>{{
            new Date(userStore.user.data.created_at).toLocaleString()
          }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-medium">更新時間:</span>
          <span>{{
            new Date(userStore.user.data.updated_at).toLocaleString()
          }}</span>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-screen">
      <p class="text-lg">載入中...</p>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useUserStore } from '@/store/user'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})
</script>
