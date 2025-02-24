<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900/60 to-purple-900/80">
    <DashboardNavbar />
    <Sidebar @logout="handleLogout" />
    <div class="fixed bottom-4 right-4 z-50">
      <LanguageSwitcher direction="up" />
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import { useAuthStore } from '@/store/auth'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()
const isLoading = ref(false)

const handleLogout = async () => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    await authStore.logout()
    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: t('navbar.logout_success'),
      timer: 1500,
      showConfirmButton: false
    })
    router.push('/login')
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.message,
      confirmButtonText: 'OK'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
