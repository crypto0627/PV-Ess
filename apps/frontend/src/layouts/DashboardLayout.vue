<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
    <DashboardNavbar />
    <Sidebar @logout="handleLogout" />
    <main class="ml-[290px] mt-20 p-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

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
