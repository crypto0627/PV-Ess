<script setup>
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
      showConfirmButton: false,
    })
    await router.push('/login')
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.message,
      confirmButtonText: 'OK',
    })
  } finally {
    isLoading.value = false
  }
}

const sidebar = ref(null)
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  sidebar.value?.toggleSidebar()
}

const closeSidebar = (event) => {
  // 檢查點擊事件的目標元素是否為input或textarea
  if (
    event.target.tagName.toLowerCase() === 'input' ||
    event.target.tagName.toLowerCase() === 'textarea'
  ) {
    return
  }

  if (isSidebarOpen.value) {
    isSidebarOpen.value = false
    sidebar.value?.toggleSidebar()
  }
}
</script>

<template>
  <div class="flex h-screen w-full overflow-hidde">
    <Sidebar
      ref="sidebar"
      :is-sidebar-open="isSidebarOpen"
      @logout="handleLogout"
    />
    <div class="flex-1 flex flex-col overflow-hidden">
      <DashboardNavbar class="z-50" @toggle-sidebar="toggleSidebar" />
      <main class="overflow-y-auto p-6" @click="closeSidebar">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div :key="$route.name">
              <component :is="Component || 'div'" />
            </div>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

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
