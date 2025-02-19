<template>
  <div class="flex space-x-2">
    <button
      v-for="(label, lang) in languages"
      :key="lang"
      @click="changeLanguage(lang)"
      :class="[
        'px-3 py-2 rounded border transition-all duration-200 hover:scale-105',
        locale === lang
          ? 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700'
          : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'
      ]"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '@/lib/useLanguage'

const { locale, changeLanguage } = useLanguage()

const languages = {
  en: 'English',
  zh_TW: '繁體中文',
  zh_CN: '简体中文'
}
</script>
