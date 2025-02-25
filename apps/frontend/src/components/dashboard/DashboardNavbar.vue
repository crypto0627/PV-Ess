<template>
  <nav
    class="absolute top-6 right-6 flex items-center justify-between gap-4 h-[72px] rounded-2xl p-4 bg-white/10 backdrop-blur-[30px] shadow-lg border border-white/10 z-30 xl:left-[280px] left-6"
  >
    <!-- 漢堡選單按鈕 -->
    <button
      class="xl:hidden p-2.5 rounded-lg hover:bg-white/20 active:bg-white/30 transition-all duration-300 text-white/90"
      @click="toggleMobileMenu"
    >
      <div class="relative w-6 h-6">
        <span
          class="absolute left-0 top-1/2 w-6 h-0.5 bg-white rounded-full transition-all duration-300"
          :class="
            isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
          "
        ></span>
        <span
          class="absolute left-0 top-1/2 w-6 h-0.5 bg-white rounded-full transition-all duration-300"
          :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
        ></span>
        <span
          class="absolute left-0 top-1/2 w-6 h-0.5 bg-white rounded-full transition-all duration-300"
          :class="
            isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
          "
        ></span>
      </div>
    </button>

    <!-- 移動端選單 -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden fixed inset-0 backdrop-blur-sm z-40 transition-opacity duration-300"
      :class="
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      "
      @click="closeMobileMenu"
    >
      <div
        class="absolute left-0 top-0 bottom-0 w-[280px] backdrop-blur-[30px] p-6 transform transition-transform duration-300"
        :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
        @click.stop
      >
        <div class="flex items-center justify-between mb-8">
          <button
            class="p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-300 text-white/90"
            @click="closeMobileMenu"
          >
            <i class="ai-cross text-xl"></i>
          </button>
        </div>

        <!-- 移動端選單項目 -->
        <ul class="bg-black/80 rounded-2xl space-y-2 my-12">
          <li v-for="item in menuItems" :key="item.id">
            <template v-if="!item.hasSubmenu">
              <router-link
                :to="item.link"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 active:bg-white/20 transition-all duration-300"
                @click="closeMobileMenu"
              >
                <i :class="item.icon + ' text-xl opacity-80'"></i>
                <span class="font-medium">{{ item.label }}</span>
              </router-link>
            </template>
            <template v-else>
              <button
                class="flex items-center justify-between w-full px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 active:bg-white/20 transition-all duration-300"
                @click="toggleSubmenu(item.id)"
              >
                <div class="flex items-center gap-3">
                  <i :class="item.icon + ' text-xl opacity-80'"></i>
                  <span class="font-medium">{{ item.label }}</span>
                </div>
                <i
                  class="ai-chevron-down text-lg transition-transform duration-300"
                  :class="openSubmenu === item.id ? 'rotate-180' : ''"
                ></i>
              </button>
              <div
                v-show="openSubmenu === item.id"
                class="pl-12 space-y-1 mt-1 overflow-hidden transition-all duration-300"
              >
                <router-link
                  v-for="subItem in item.submenu"
                  :key="subItem.label"
                  :to="subItem.link"
                  class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/80 hover:bg-white/10 active:bg-white/20 transition-all duration-300"
                  @click="closeMobileMenu"
                >
                  {{ subItem.label }}
                </router-link>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>

    <!-- 桌面端右側按鈕 -->
    <div class="items-center gap-3 ml-auto hidden md:flex">
      <div
        class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md"
      >
        <img src="/bell.svg" alt="Notification Bell" class="h-6 w-6" />
      </div>
      <AvatarMenu />
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import AvatarMenu from '../common/AvatarMenu.vue'

const isMobileMenuOpen = ref(false)
const openSubmenu = ref(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (!isMobileMenuOpen.value) {
    openSubmenu.value = null
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  openSubmenu.value = null
}

const toggleSubmenu = (id) => {
  openSubmenu.value = openSubmenu.value === id ? null : id
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'ai-dashboard',
    link: '/main/dashboard'
  },
  {
    id: 'financial',
    label: 'Financial Report',
    icon: 'ai-money',
    link: '/main/financial'
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: 'ai-calendar',
    link: '/main/schedule'
  },
  {
    id: 'system-monitor',
    label: 'System',
    icon: 'ai-chart',
    hasSubmenu: true,
    submenu: [
      { label: 'System-monitor', link: '/main/system-monitor' },
      { label: 'System-controller', link: '/main/system-controller' }
    ]
  },
  { id: 'profile', label: 'Profile', icon: 'ai-user', link: '/main/profile' },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'ai-gear',
    link: '/main/settings'
  },
  { id: 'logout', label: 'Logout', icon: 'ai-log-out', link: '/logout' }
]
</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}
</style>
