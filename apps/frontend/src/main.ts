import { createPinia } from 'pinia'
import { createApp } from 'vue'
import socket from './api/socket-connect'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.config.globalProperties.$socket = socket
app.mount('#app')
