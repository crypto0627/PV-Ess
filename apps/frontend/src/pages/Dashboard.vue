<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUserProfile()
})

const handleLogout = async () => {
  await authStore.logoutUser()
  window.location.href = '/login'
}
</script>

<template>
  <div class="dashboard">
    <h1>歡迎 {{ authStore.user?.username || '用戶' }}</h1>
    <p>Email: {{ authStore.user?.email }}</p>
    <button @click="handleLogout">登出</button>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
