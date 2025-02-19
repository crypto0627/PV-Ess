import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import zh_TW from '@/locales/zh-TW.json'
import zh_CN from '@/locales/zh-CN.json'

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: localStorage.getItem('lang') || 'en', // 預設語言
  fallbackLocale: 'en',
  messages: {
    en,
    zh_TW,
    zh_CN
  }
})

export default i18n
