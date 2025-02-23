<template>
  <div
    class="absolute top-[102px] md:left-[290px] left-6 right-6 bottom-11 rounded-2xl bg-white/10 backdrop-blur-[30px] border border-white/10 shadow-lg p-4 md:p-6 z-10"
  >
    <div
      v-if="userStore.user"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      <!-- 歡迎卡片 -->
      <div
        class="col-span-full bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 md:p-6 border border-white/10"
      >
        <h1 class="text-2xl md:text-3xl font-bold text-white text-center">
          {{ $t('main.settings.title') }}
        </h1>
      </div>

      <!-- 語言設定卡片 -->
      <div
        class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 md:p-6 border border-white/10"
      >
        <h2 class="text-lg md:text-xl font-semibold text-white mb-4">
          {{ $t('main.settings.language') }}
        </h2>
        <div class="space-y-3">
          <select
            v-model="selectedLanguage"
            class="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-cyan-500"
            @change="selectLanguage"
          >
            <option
              v-for="(label, lang) in languages"
              :key="lang"
              :value="lang"
            >
              {{ label }}
            </option>
          </select>
        </div>
      </div>

      <!-- 主題設定卡片 -->
      <div
        class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 md:p-6 border border-white/10"
      >
        <h2 class="text-lg md:text-xl font-semibold text-white mb-4">
          {{ $t('main.settings.theme') }}
        </h2>
        <div class="space-y-3">
          <select
            v-model="selectedTheme"
            class="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-cyan-500"
            @change="changeTheme"
          >
            <option value="dark">{{ $t('main.settings.theme_dark') }}</option>
            <option value="light">{{ $t('main.settings.theme_light') }}</option>
            <option value="system">
              {{ $t('main.settings.theme_system') }}
            </option>
          </select>
        </div>
      </div>

      <!-- 財報匯出卡片 -->
      <div
        class="bg-white/10 backdrop-blur-[30px] rounded-2xl p-4 md:p-6 border border-white/10"
      >
        <h2 class="text-lg md:text-xl font-semibold text-white mb-4">
          {{ $t('main.settings.export_report') }}
        </h2>
        <div class="space-y-3">
          <div class="grid gap-3">
            <div class="flex items-center gap-2">
              <input
                type="date"
                v-model="startDate"
                class="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-cyan-500"
              />
              <span class="text-white">to</span>
              <input
                type="date"
                v-model="endDate"
                class="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              @click="exportReport"
              class="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-200"
            >
              {{ $t('main.settings.export') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 載入中狀態 -->
    <div v-else class="flex flex-col items-center justify-center min-h-[50vh]">
      <div
        class="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-4 border-white border-t-transparent"
      ></div>
      <p class="text-base md:text-lg text-white mt-4">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '@/lib/useLanguage'
import { useUserStore } from '@/store/user'
import Swal from 'sweetalert2'
import { computed, onMounted, ref } from 'vue'

const userStore = useUserStore()
const { locale, changeLanguage } = useLanguage()

// 語言相關邏輯
type LanguageKey = 'en' | 'zh_TW' | 'zh_CN'
const currentLocale = computed(() => locale.value as LanguageKey)
const selectedLanguage = ref(currentLocale.value)

const languages: Record<LanguageKey, string> = {
  en: 'English',
  zh_TW: '繁體中文',
  zh_CN: '简体中文'
}

const selectLanguage = () => {
  changeLanguage(selectedLanguage.value as LanguageKey)
}

// 主題相關邏輯
type ThemeType = 'dark' | 'light' | 'system'
const selectedTheme = ref<ThemeType>('system')

const changeTheme = () => {
  const theme = selectedTheme.value

  if (theme === 'system') {
    // 使用系統主題
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } else {
    // 手動設定主題
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  localStorage.setItem('theme', theme)
}

// 其他原有的變數
const startDate = ref('')
const endDate = ref('')

// 匯出報表邏輯
const exportReport = async () => {
  try {
    if (!startDate.value || !endDate.value) {
      throw new Error('請選擇日期範圍')
    }

    // 這裡實作匯出報表的邏輯

    await Swal.fire({
      icon: 'success',
      title: '成功',
      text: '報表已成功匯出',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: (error as Error).message,
      confirmButtonText: '確定'
    })
  }
}

onMounted(async () => {
  await userStore.fetchUser()

  // 初始化主題
  const savedTheme = localStorage.getItem('theme') as ThemeType | null
  if (savedTheme) {
    selectedTheme.value = savedTheme
    changeTheme()
  } else {
    // 如果沒有儲存的主題設定，預設使用系統主題
    selectedTheme.value = 'system'
    changeTheme()
  }
})
</script>
