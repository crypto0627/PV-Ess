<template>
  <!-- Navigation -->
  <nav
    class="bg-gradient-to-r from-[rgb(30,193,106)] via-[rgb(130,212,165)] to-[rgb(181,220,154)] shadow-lg transition-all duration-300 relative z-50"
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
          <router-link
            v-for="link in navLinks"
            :key="link.key"
            :to="link.link"
            class="text-white hover:text-green-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            {{ $t(link.key) }}
          </router-link>
          <!-- 用戶頭像和下拉選單 -->
          <AvatarMenu />
          <div class="fixed bottom-4 right-4 z-50">
            <LanguageSwitcher direction="up" />
          </div>
        </div>
        <div class="md:hidden">
          <button
            class="text-white focus:outline-none transition-transform duration-200 hover:scale-105"
            @click="toggleMenu"
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
        <router-link
          v-for="link in navLinks"
          :key="link.key"
          :to="link.link"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all duration-150"
        >
          {{ $t(link.key) }}
        </router-link>
        <router-link
          to="/profile"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all duration-150"
        >
          {{ $t('navbar.profile') }}
        </router-link>
        <router-link
          to="/settings"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all duration-150"
        >
          {{ $t('navbar.settings') }}
        </router-link>
        <button
          :disabled="isLoading"
          class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all duration-150"
          @click="handleSubmit"
        >
          <span v-if="isLoading" class="flex items-center">
            <svg
              class="animate-spin h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ $t('navbar.logging_out') }}
          </span>
          <span v-else>{{ $t('navbar.logout') }}</span>
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
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import AvatarMenu from '@/components/common/AvatarMenu.vue'

const { t } = useI18n()
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)

const navLinks = [
  { key: 'navbar.home', link: '/home' },
  { key: 'navbar.products', link: '/products' },
  { key: 'navbar.solutions', link: '/solutions' },
  { key: 'navbar.contact', link: '/contact' }
]

const handleSubmit = async () => {
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
</script>
