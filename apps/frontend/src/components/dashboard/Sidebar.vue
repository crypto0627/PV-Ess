<template>
  <div>
    <aside
      class="absolute top-6 left-6 bottom-0 flex-col gap-2 rounded-2xl p-4 bg-white/10 backdrop-blur-[30px] border border-white/10 shadow-lg transition-all duration-400 hover:shadow-xl z-20 xl:block"
      :class="{ hidden: !isSidebarOpen }"
    >
      <header
        class="flex items-center justify-center h-[72px] pt-2.5 border-b border-white/[0.08]"
      >
        <h1 class="text-4xl font-bold text-white">PV ESS</h1>
        <button
          class="md:hidden p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-300 text-white/90"
          @click="toggleSidebar"
        >
          <i class="ai-cross text-xl"></i>
        </button>
      </header>

      <ul class="grid gap-2 list-none p-0 m-0 w-full">
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
            class="relative flex gap-4 items-center h-[50px] w-full rounded-lg font-normal text-base leading-none p-4 text-white/95 transition-all duration-300 hover:bg-white/10 hover:translate-x-1 cursor-pointer"
            :class="{ 'bg-cyan-500/20': activeSidebar === item.id }"
          >
            <i :class="item.icon + ' text-xl w-5 min-w-5 max-w-5'"></i>
            <p class="flex-1">{{ $t(`main.sidebar.${item.id}`) }}</p>
            <svg
              v-if="item.hasSubmenu"
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': activeSidebar === item.id }"
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
            class="relative overflow-hidden transition-all duration-500"
            :style="{
              height:
                activeSidebar === item.id
                  ? item.submenu.length * 50 + 'px'
                  : '0px'
            }"
          >
            <ul
              class="absolute top-0 left-0 grid gap-1 list-none p-2 m-0 w-full"
            >
              <li v-for="subItem in item.submenu" :key="subItem.id">
                <button
                  type="button"
                  class="relative pl-[52px] font-normal text-base leading-none text-white/95 transition-all duration-300 h-[42px] w-full rounded-lg hover:bg-white/10 hover:translate-x-1 cursor-pointer before:content-[''] before:absolute before:top-1/2 before:left-6 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:rounded-full before:bg-white/35"
                  :class="{ 'bg-cyan-500/20': activeSubItem === subItem.id }"
                  @click="handleSubItemClick(subItem)"
                >
                  {{ $t(`main.sidebar.${subItem.id}`) }}
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </aside>
  </div>
  <!-- 移動端遮罩層 -->
  <div
    v-show="isSidebarOpen"
    class="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
    @click="toggleSidebar"
  ></div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['logout'])

const activeSidebar = ref('dashboard')
const activeSubItem = ref('')
const isSidebarOpen = ref(false)
const { t } = useI18n()

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleClick = async (item) => {
  if (item.hasSubmenu) {
    // 如果是有子選單的項目，只展開/收起，不進行導航
    activeSidebar.value = activeSidebar.value === item.id ? '' : item.id
    return
  }

  if (item.id === 'logout') {
    emit('logout')
    return
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
  activeSubItem.value = activeSubItem.value === subItem.id ? '' : subItem.id

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
    icon: 'ai-dashboard',
    link: '/main/dashboard'
  },
  {
    id: 'report',
    icon: 'ai-money',
    link: '/main/report'
  },
  {
    id: 'schedule',
    icon: 'ai-calendar',
    link: '/main/schedule'
  },
  {
    id: 'system-monitor',
    icon: 'ai-chart',
    hasSubmenu: true,
    submenu: [
      { id: 'system-monitor', link: '/main/system-monitor' },
      { id: 'system-controller', link: '/main/system-controller' }
    ]
  },
  {
    id: 'profile',
    icon: 'ai-user',
    link: '/main/profile'
  },
  {
    id: 'settings',
    icon: 'ai-gear',
    link: '/main/settings'
  },
  {
    id: 'logout',
    icon: 'ai-log-out'
  }
]
</script>
