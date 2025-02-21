<template>
  <form @submit.prevent="handleSubmit" class="grid gap-3 w-full mb-5">
    <div class="relative">
      <input
        required
        type="email"
        id="email"
        v-model="email"
        autocomplete="user-email"
        class="textbox-input"
      />
      <label class="textbox-label">{{ $t('auth.email') }}</label>
    </div>
    <div class="relative">
      <input
        required
        :type="showPassword ? 'text' : 'password'"
        id="password"
        v-model="password"
        autocomplete="current-password"
        class="textbox-input text-green-700"
      />
      <label class="textbox-label">{{ $t('auth.password') }}</label>
      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity duration-300"
        @click="showPassword = !showPassword"
      >
        <svg
          v-if="showPassword"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </button>
    </div>
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <input
          type="checkbox"
          id="staySignedIn"
          v-model="staySignedIn"
          class="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
        />
        <label for="staySignedIn" class="ml-2 block text-sm text-green-700">
          {{ $t('auth.stay_signed_in') }}
        </label>
      </div>
      <a
        href="/forgot-password"
        class="text-green-700 text-[14px] hover:underline hover:text-green-600"
      >
        {{ $t('auth.forgot_password') }}
      </a>
    </div>
    <button
      type="submit"
      :disabled="isLoading || cooldown > 0"
      class="text-[#f9f9f9] bg-gradient-to-r from-green-700 via-green-500 to-green-300 h-[52px] font-inherit text-[15px] px-3 border-0 rounded-lg flex items-center justify-center"
    >
      <svg
        v-if="isLoading"
        class="animate-spin h-5 w-5 text-white mr-3"
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
      <span>
        {{
          cooldown > 0
            ? $t('auth.cooldown', { time: cooldown })
            : isLoading
              ? $t('auth.loading')
              : $t('auth.sign_in')
        }}
      </span>
    </button>
  </form>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store/auth'

const email = ref('')
const password = ref('')
const staySignedIn = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)
const cooldown = ref(0)
const showPassword = ref(false)
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
<style scoped>
.textbox-label,
.textbox-input {
  transition: 0.3s;
}

.textbox-label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translate(0, -50%);
  transform-origin: 0 50%;
  pointer-events: none;
  color: #ada5b4;
  font-size: 14px;
}

.textbox-input {
  width: 100%;
  padding: 10px 12px 0;
  background: #f4f1f7;
  outline: none;
  color: #2e2c2f;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 0 0 2px transparent;
}

.textbox-input:focus {
  box-shadow: 0 0 0 2px #7b00f1;
}

.textbox-input:is(:focus, :not(:invalid)) ~ .textbox-label {
  scale: 0.725;
  transform: translate(0, -112%);
}
</style>
