import { useI18n } from 'vue-i18n'

export function useLanguage() {
  const { locale } = useI18n()

  const changeLanguage = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang) // 記住語言設定
  }

  return { locale, changeLanguage }
}
