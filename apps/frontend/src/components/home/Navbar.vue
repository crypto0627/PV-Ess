<template>
  <!-- Navigation -->
  <nav
    class="bg-gradient-to-r from-[rgb(30,193,106)] via-[rgb(130,212,165)] to-[rgb(181,220,154)] shadow-lg transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <span
            class="text-2xl font-bold text-white hover:text-green-100 transition-colors duration-200"
            >PV ESS</span
          >
        </div>
        <div class="hidden md:flex space-x-8">
          <a
            v-for="link in navLinks"
            :key="link.key"
            :href="link.link"
            class="text-white hover:text-green-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            {{ $t(link.key) }}
          </a>
          <!-- 用戶頭像和下拉選單 -->
          <div class="relative">
            <button
              @mouseenter="handleMouseEnter"
              @mouseleave="handleAvatarLeave"
              class="flex items-center text-white hover:text-green-100 focus:outline-none transition-transform duration-200 hover:scale-105"
            >
              <div
                class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </button>
            <!-- 下拉選單 -->
            <div
              v-if="isDropdownOpen"
              @mouseenter="handleMouseEnter"
              @mouseleave="handleDropdownLeave"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transform transition-all duration-200 origin-top-right"
              v-cloak
            >
              <a
                href="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-150"
              >
                {{ $t('navbar.profile') }}
              </a>
              <a
                href="/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-150"
              >
                {{ $t('navbar.settings') }}
              </a>
              <button
                @click="handleSubmit"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-150"
              >
                {{ $t('navbar.logout') }}
              </button>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="text-white focus:outline-none transition-transform duration-200 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div
      :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
      class="md:hidden transition-all duration-300"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a
          v-for="link in navLinks"
          :key="link.key"
          :href="link.link"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all duration-150"
        >
          {{ $t(link.key) }}
        </a>
        <a
          href="/profile"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all duration-150"
        >
          {{ $t('navbar.profile') }}
        </a>
        <a
          href="/settings"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all duration-150"
        >
          {{ $t('navbar.settings') }}
        </a>
        <button
          type="submit"
          @click="handleSubmit"
          class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all duration-150"
        >
          {{ $t('navbar.logout') }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store/auth'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '../LanguageSwitcher.vue'

const { t } = useI18n()
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)

const navLinks = [
  { key: 'navbar.home', link: '/home' },
  { key: 'navbar.products', link: '/products' },
  { key: 'navbar.solutions', link: '/solutions' },
  { key: 'navbar.contact', link: '/contact' }
]

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await authStore.logout()
    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: t('navbar.logout_success'),
      confirmButtonText: 'OK',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    router.push('/login')
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: (error as Error).message,
      confirmButtonText: 'OK'
    })
  } finally {
    isLoading.value = false
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

let timeoutId: number | null = null

const handleMouseEnter = () => {
  if (timeoutId) {
    window.clearTimeout(timeoutId)
    timeoutId = null
  }
  isDropdownOpen.value = true
}

const handleAvatarLeave = () => {
  timeoutId = window.setTimeout(() => {
    isDropdownOpen.value = false
  }, 1000)
}

const handleDropdownLeave = () => {
  isDropdownOpen.value = false
}
</script>
