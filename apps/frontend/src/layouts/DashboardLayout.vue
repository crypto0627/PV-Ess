<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-900/60 to-purple-900/80 pt-26"
  >
    <DashboardNavbar />
    <Sidebar @logout="handleLogout" />
    <div
      class="flex-1 md:mt-0 mx-5 xl:ml-70 rounded-2xl bg-white/10 backdrop-blur-[30px] border border-white/10 shadow-lg z-10 p-4"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <div :key="route.name">
            <component :is="Component || 'div'" />
          </div>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import { useAuthStore } from '@/store/auth'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
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
  transition: opacity 1s ease-in-out;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
