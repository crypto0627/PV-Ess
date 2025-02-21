<template>
  <div
    class="flex h-screen items-center justify-center bg-gradient-to-br from-green-400 to-green-100 overflow-hidden"
  >
    <img
      src="/blob.svg"
      class="absolute z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[550px] aspect-square"
    />
    <div
      class="absolute z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[720px] aspect-square border-2 border-white rounded-[50%] animate-[spin_50s_linear_infinite] origin-center before:content-[''] before:absolute before:w-[18px] before:aspect-square before:rounded-[inherit] before:bg-[#f39f1a] before:top-1/2 before:left-[-9px] before:-translate-y-1/2 after:content-[''] after:absolute after:w-6 after:aspect-square after:rounded-[inherit] after:bg-[#f39f1a] after:top-1/2 after:right-[-12px] after:-translate-y-1/2"
    ></div>
    <div
      class="relative z-[2] bg-white rounded-[24px] p-[72px_32px_48px] w-[340px] flex flex-col items-center justify-center text-center shadow-[0_10px_50px_rgb(96_68_121_/_10%)]"
    >
      <img src="/logo.png" class="w-24 mb-8" />
      <h2 class="text-lg font-medium mb-1.5">{{ $t('auth.welcome') }}</h2>
      <h3 class="text-[13px] text-[#ada5b4] font-medium mb-8">
        {{ $t('auth.welcome_description') }}
      </h3>
      <LoginForm />
      <p class="text-[14px] text-[#ada5b4]">
        {{ $t('auth.sign_up_prompt') }}
        <a href="/register" class="text-green-700">{{ $t('auth.sign_up') }}</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store/auth'
import LoginForm from '@/components/auth/LoginForm.vue'

const email = ref('')
const password = ref('')
const staySignedIn = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)
const cooldown = ref(0)
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  if (isLoading.value || cooldown.value > 0) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await authStore.login(email.value, password.value)

    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: res.data.message,
      timer: 1500,
      showConfirmButton: false
    })

    router.push('/home')
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      // Handle 429 Too Many Requests
      const retryAfter = error.response.data.retryAfter || 30 // Default 30 seconds
      errorMessage.value = `Too many requests. Please wait ${retryAfter} seconds.`
      startCooldown(retryAfter)
    } else {
      errorMessage.value = 'Login failed. Please check your credentials.'
    }

    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response.data.message,
      confirmButtonText: 'OK'
    })
  } finally {
    isLoading.value = false
  }
}

const checkStoredCooldown = () => {
  const storedCooldown = localStorage.getItem('loginCooldown')
  if (storedCooldown) {
    const cooldownData = JSON.parse(storedCooldown)
    const now = Date.now()
    const timeLeft = Math.ceil((cooldownData.expiry - now) / 1000)

    if (timeLeft > 0) {
      startCooldown(timeLeft)
    } else {
      localStorage.removeItem('loginCooldown')
    }
  }
}

const startCooldown = (seconds: number) => {
  cooldown.value = seconds
  // Store cooldown end time in localStorage
  localStorage.setItem(
    'loginCooldown',
    JSON.stringify({
      expiry: Date.now() + seconds * 1000
    })
  )

  const interval = setInterval(() => {
    cooldown.value--
    if (cooldown.value <= 0) {
      clearInterval(interval)
      localStorage.removeItem('loginCooldown')
    }
  }, 1000)
}

// Check cooldown when component is mounted
onMounted(() => {
  checkStoredCooldown()
})
</script>
