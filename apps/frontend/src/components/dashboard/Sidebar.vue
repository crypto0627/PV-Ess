<template>
  <aside
    class="absolute top-6 left-6 bottom-11 flex flex-col gap-2 w-[260px] rounded-2xl p-4 bg-white/10 backdrop-blur-[30px] border border-white/10 shadow-lg transition-all duration-400 hover:shadow-xl"
  >
    <header
      class="flex items-center h-[72px] pt-2.5 border-b border-white/[0.08]"
    >
      <h1 class="text-2xl font-bold text-white">PV ESS</h1>
    </header>

    <ul class="grid gap-2 list-none p-0 m-0 w-full">
      <li v-for="item in menuItems" :key="item.id">
        <input
          type="radio"
          :id="item.id"
          name="sidebar"
          class="scale-0 absolute"
          v-model="activeSidebar"
          :value="item.id"
          @click="handleClick(item)"
        />
        <label
          :for="item.id"
          class="relative flex gap-4 items-center h-[50px] w-full rounded-lg font-normal text-base leading-none p-4 text-white/95 transition-all duration-300 hover:bg-white/10 hover:translate-x-1 cursor-pointer"
          :class="{ 'bg-cyan-500/20': activeSidebar === item.id }"
        >
          <i :class="item.icon + ' text-xl w-5 min-w-5 max-w-5'"></i>
          <p class="flex-1">{{ item.label }}</p>
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
          v-if="item.submenu"
          class="relative overflow-hidden transition-all duration-500"
          :style="{
            height:
              activeSidebar === item.id
                ? item.submenu.length * 50 + 'px'
                : '0px'
          }"
        >
          <ul class="absolute top-0 left-0 grid gap-1 list-none p-2 m-0 w-full">
            <li v-for="subItem in item.submenu" :key="subItem.label">
              <button
                type="button"
                @click="handleSubItemClick(subItem.label)"
                class="relative pl-[52px] font-normal text-base leading-none text-white/95 transition-all duration-300 h-[42px] w-full rounded-lg hover:bg-white/10 hover:translate-x-1 cursor-pointer before:content-[''] before:absolute before:top-1/2 before:left-6 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:rounded-full before:bg-white/35"
                :class="{ 'bg-cyan-500/20': activeSubItem === subItem.label }"
              >
                {{ subItem.label }}
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['logout'])

const activeSidebar = ref('dashboard')
const activeSubItem = ref('')

const handleClick = (item) => {
  if (item.id !== 'settings') {
    activeSubItem.value = ''
  }

  if (item.id === activeSidebar.value) {
    activeSidebar.value = ''
    return
  }

  if (item.id === 'logout') {
    emit('logout') // Emit the logout event
  }
}

const handleSubItemClick = (label) => {
  activeSubItem.value = activeSubItem.value === label ? '' : label
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'ai-dashboard' },
  { id: 'financial', label: 'Financial Report', icon: 'ai-money' },
  { id: 'schedule', label: 'Schedule', icon: 'ai-calendar' },
  { id: 'monitor', label: 'Grafana Monitor', icon: 'ai-chart' },
  { id: 'profile', label: 'Profile', icon: 'ai-user' },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'ai-gear',
    hasSubmenu: true,
    submenu: [
      { label: 'General' },
      { label: 'Security' },
      { label: 'Notifications' },
      { label: 'Appearance' }
    ]
  },
  { id: 'logout', label: 'Logout', icon: 'ai-log-out' }
]
</script>
