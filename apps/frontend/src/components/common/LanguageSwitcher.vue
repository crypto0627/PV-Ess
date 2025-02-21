<template>
  <div class="relative">
    <button
      @mouseenter="handleMouseEnter"
      @mouseleave="handleAvatarLeave"
      class="flex items-center gap-2 px-4 py-2 rounded-lg hover:scale-105 bg-gradient-to-r from-[rgb(30,193,106)] via-[rgb(130,212,165)] to-[rgb(181,220,154)] shadow-lg transition-all duration-300 text-white border-cyan-700 hover:from-[rgb(25,165,90)] hover:via-[rgb(110,190,140)] hover:to-[rgb(160,200,130)]"
    >
      <span class="text-sm font-medium">{{ languages[currentLocale] }}</span>
      <svg
        class="w-4 h-4 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <div
      class="absolute left-1/2 bg-white border rounded-lg shadow-xl min-w-[140px] overflow-hidden transform -translate-x-1/2 origin-top transition-all duration-300"
      :class="[
        direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      ]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleDropdownLeave"
    >
      <div class="flex flex-col py-1">
        <button
          v-for="(label, lang) in languages"
          :key="lang"
          @click="selectLanguage(lang)"
          class="px-4 py-2.5 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
          :class="{
            'bg-cyan-50 text-cyan-600 font-medium': currentLocale === lang
          }"
        >
          <span class="text-sm">{{ label }}</span>
          <svg
            v-if="currentLocale === lang"
            class="w-4 h-4 text-cyan-600 ml-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/lib/useLanguage'

type LanguageKey = 'en' | 'zh_TW' | 'zh_CN'
const { locale, changeLanguage } = useLanguage()
const currentLocale = computed(() => locale.value as LanguageKey)
const isOpen = ref(false)

// 定義 props
interface Props {
  direction?: 'up' | 'down'
}
const props = withDefaults(defineProps<Props>(), {
  direction: 'down'
})

const languages: Record<LanguageKey, string> = {
  en: 'English',
  zh_TW: '繁體中文',
  zh_CN: '简体中文'
}

let timeoutId: number | null = null

const handleMouseEnter = () => {
  if (timeoutId) {
    window.clearTimeout(timeoutId)
    timeoutId = null
  }
  isOpen.value = true
}

const handleAvatarLeave = () => {
  timeoutId = window.setTimeout(() => {
    isOpen.value = false
  }, 1000)
}

const handleDropdownLeave = () => {
  isOpen.value = false
}

const selectLanguage = (lang: LanguageKey) => {
  changeLanguage(lang)
  isOpen.value = false
}
</script>
