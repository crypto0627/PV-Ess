<script setup>
import { useAuthStore } from '@/store/auth'
import {
  Activity,
  Calendar,
  Headset,
  Layers,
  LayoutDashboard,
  LogOut,
  Settings,
  Settings as SettingsIcon,
  User,
  Wallet,
} from 'lucide-vue-next'
import Swal from 'sweetalert2'
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { cn } from '@/lib/utils'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()
const isLoading = ref(false)
const isSidebarOpen = ref(false)

// 根據當前路由計算active的sidebar item
const activeSidebar = ref('')

// 根據當前路由計算active的sub item
const activeSubItem = computed(() => {
  const path = route.path
  for (const item of menuItems) {
    if (item.hasSubmenu) {
      const subItem = item.submenu.find(sub => sub.link === path)
      if (subItem) return subItem.id
    }
  }
  return ''
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleClick = async (item) => {
  if (item.hasSubmenu) {
    // 修改這裡: 如果當前選中的項目已經是這個項目,則取消選中,否則選中這個項目
    if (activeSidebar.value === item.id) {
      activeSidebar.value = ''
    } else {
      activeSidebar.value = item.id
    }
    return
  }

  if (item.id === 'logout') {
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

  if (item.link) {
    try {
      await router.push(item.link)
      if (window.innerWidth < 768) {
        isSidebarOpen.value = false
      }
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  }
}

const handleSubItemClick = async (subItem) => {
  if (subItem.link) {
    try {
      await router.push(subItem.link)
      if (window.innerWidth < 768) {
        isSidebarOpen.value = false
      }
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  }
}

const menuItems = [
  {
    id: 'dashboard',
    lucideIcon: LayoutDashboard,
    link: '/main/dashboard',
  },
  {
    id: 'report',
    lucideIcon: Wallet,
    link: '/main/report',
  },
  {
    id: 'schedule',
    lucideIcon: Calendar,
    link: '/main/schedule',
  },
  {
    id: 'system-monitor',
    lucideIcon: Activity,
    hasSubmenu: true,
    submenu: [
      { id: 'system-monitor', link: '/main/system-monitor' },
      { id: 'system-controller', link: '/main/system-controller' },
    ],
  },
  {
    id: 'profile',
    lucideIcon: User,
    link: '/main/profile',
  },
  {
    id: 'settings',
    lucideIcon: SettingsIcon,
    link: '/main/settings',
  },
  {
    id: 'logout',
    lucideIcon: LogOut,
  },
]

const footerNavItems = [
  { name: 'Settings', icon: Settings, link: '/main/settings' },
  { name: 'Contact us', icon: Headset, link: '/contact' },
]

// 使用計算屬性來優化子選單高度計算
const getSubmenuHeight = computed(() => {
  return (item) => {
    return activeSidebar.value === item.id
      ? `${item.submenu.length * 50}px`
      : '0px'
  }
})

// Resize handler (move here for sidebar responsiveness)
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isSidebarOpen.value = true
  } else {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // 初始化時檢查一次
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

defineExpose({
  toggleSidebar,
})
</script>

<template>
  <div
    :class="[
      'bg-[#071812] text-white h-full flex flex-col transition-all duration-300 ease-in-out fixed lg:relative z-40',
      isSidebarOpen ? 'w-64' : 'w-0 -ml-64 lg:w-64 lg:ml-0',
    ]"
  >
    <!-- Sidebar Header -->
    <div class="p-4 border-b border-[#1a5a40]">
      <div class="flex items-center gap-2">
        <Layers class="h-6 w-6" />
        <RouterLink to="/home" class="text-xl font-bold">PV ESS</RouterLink>
      </div>
      <button
        class="md:hidden p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-300 text-white/90"
        @click="toggleSidebar"
      >
        <i class="ai-cross text-xl"></i>
      </button>
    </div>

    <!-- Sidebar Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Main Navigation -->
      <div class="p-4">
        <ul class="space-y-1">
          <li v-for="item in menuItems" :key="item.id">
            <input
              :id="item.id"
              v-model="activeSidebar"
              type="radio"
              name="sidebar"
              class="scale-0 absolute"
              :value="item.id"
              @click="handleClick(item)"
            />
            <label
              :for="item.id"
              :class="
                cn(
                  'relative flex gap-4 items-center h-[50px] w-full rounded-md font-normal text-base leading-none p-4 text-white/95 transition-all duration-300 hover:bg-white/10 hover:translate-x-1 cursor-pointer',
                  activeSidebar === item.id &&
                    'bg-cyan-500/20 border-l-4 border-[#65bf65]',
                )
              "
            >
              <component
                :is="item.lucideIcon"
                :class="
                  cn(
                    'h-5 w-5 transition-colors duration-300',
                    activeSidebar === item.id && 'text-[#65bf65]',
                  )
                "
              />
              <p class="flex-1">{{ $t(`main.sidebar.${item.id}`) }}</p>
              <svg
                v-if="item.hasSubmenu"
                :class="
                  cn(
                    'w-4 h-4 transition-transform duration-300',
                    activeSidebar === item.id && 'rotate-180',
                  )
                "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </label>

            <div
              v-if="item.hasSubmenu"
              class="relative overflow-hidden transition-all duration-300 will-change-[height]"
              :style="{ height: getSubmenuHeight(item) }"
            >
              <ul
                class="absolute top-0 left-0 grid gap-1 list-none p-2 m-0 w-full"
              >
                <li v-for="subItem in item.submenu" :key="subItem.id">
                  <button
                    type="button"
                    :class="
                      cn(
                        'relative pl-[52px] font-normal text-base leading-none text-white/95 transition-all duration-300 h-[42px] w-full rounded-md hover:bg-white/10 hover:translate-x-1 cursor-pointer before:content-[\'\'] before:absolute before:top-1/2 before:left-6 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:rounded-full before:bg-white/35',
                        activeSubItem === subItem.id &&
                          'bg-cyan-500/20 border-l-4 border-[#65bf65]',
                      )
                    "
                    @click="handleSubItemClick(subItem)"
                  >
                    {{ $t(`main.sidebar.${subItem.id}`) }}
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="p-4 border-t border-[#1a5a40]">
      <ul class="space-y-1">
        <li v-for="item in footerNavItems" :key="item.name">
          <a
            href="#"
            class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1a5a40] text-white"
          >
            <component :is="item.icon" class="h-5 w-5" />
            <RouterLink :to="item.link">{{ item.name }}</RouterLink>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
