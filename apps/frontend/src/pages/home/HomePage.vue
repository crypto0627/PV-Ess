<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <span class="text-2xl font-bold text-blue-600">PV ESS</span>
          </div>
          <div class="hidden md:flex space-x-8">
            <a
              v-for="link in navLinks"
              :key="link.key"
              href="#"
              class="text-gray-700 hover:text-blue-600"
            >
              {{ $t(link.key) }}
            </a>
            <button
              type="submit"
              @click="handleSubmit"
              class="text-gray-700 hover:text-blue-600"
            >
              {{ $t('home.logout') }}
            </button>
          </div>
          <div class="md:hidden">
            <button
              @click="toggleMenu"
              class="text-gray-700 focus:outline-none"
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
        class="md:hidden"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            v-for="link in navLinks"
            :key="link.key"
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            {{ $t(link.key) }}
          </a>
          <button
            type="submit"
            @click="handleSubmit"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            {{ $t('home.logout') }}
          </button>
        </div>
      </div>
    </nav>
    <div class="fixed bottom-4 right-4">
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store/auth'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)

const navLinks = [
  { key: 'home.home' },
  { key: 'home.products' },
  { key: 'home.solutions' },
  { key: 'home.contact' }
]

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await authStore.logout()
    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: t('home.logout_success'),
      confirmButtonText: 'OK'
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
