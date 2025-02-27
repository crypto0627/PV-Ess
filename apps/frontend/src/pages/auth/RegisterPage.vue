<template>
  <div
    class="flex h-screen items-center justify-center bg-gray-300 overflow-hidden"
  >
    <div class="fixed bottom-4 right-4 z-50">
      <LanguageSwitcher direction="up" />
    </div>
    <BackgroundElemt />
    <div
      class="relative z-[2] bg-white rounded-[24px] p-[72px_32px_48px] w-[340px] flex flex-col items-center justify-center text-center shadow-[0_10px_50px_rgb(96_68_121_/_10%)]"
    >
      <img src="/logo.png" class="w-24 mb-8" />
      <h2 class="text-lg font-medium mb-1.5">
        {{ $t('auth.create_account') }}
      </h2>
      <h3 class="text-[13px] text-[#ada5b4] font-medium mb-8">
        {{ $t('auth.welcome_description') }}
      </h3>

      <form class="grid gap-3 w-full mb-5" @submit.prevent="handleSubmit">
        <div class="relative">
          <input
            id="username"
            v-model.trim="username"
            type="text"
            class="textbox-input"
            required
          />
          <label for="username" class="textbox-label">
            {{ $t('auth.user_name') }}
          </label>
        </div>

        <div class="relative">
          <input
            id="email"
            v-model.trim="email"
            type="email"
            class="textbox-input"
            required
          />
          <label for="email" class="textbox-label">
            {{ $t('auth.email') }}
          </label>
        </div>

        <div class="relative">
          <input
            id="password"
            v-model="password"
            type="password"
            class="textbox-input"
            required
          />
          <label for="password" class="textbox-label">
            {{ $t('auth.password') }}
          </label>
        </div>

        <div class="relative">
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="textbox-input"
            required
          />
          <label for="confirmPassword" class="textbox-label">
            {{ $t('auth.confirm_password') }}
          </label>
        </div>

        <div class="mb-6 flex items-center">
          <input
            id="agreeTerms"
            v-model="agreeTerms"
            type="checkbox"
            class="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
            required
          />
          <label for="agreeTerms" class="ml-2 text-sm text-green-700">
            {{ $t('auth.terms_agreement') }}
            <router-link
              to="/terms-conditions"
              class="text-green-600 hover:text-green-800 font-medium"
            >
              {{ $t('auth.terms_conditions') }}
            </router-link>
          </label>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="text-[#f9f9f9] bg-gradient-to-r from-green-700 via-green-500 to-green-300 h-[52px] font-inherit text-[15px] px-3 border-0 rounded-lg"
        >
          {{
            isLoading
              ? $t('auth.creating_account')
              : $t('auth.create_account_button')
          }}
        </button>
      </form>

      <p class="text-[14px] text-[#ada5b4]">
        {{ $t('auth.already_have_account') }}
        <router-link to="/login" class="text-green-700">
          {{ $t('auth.sign_in_redirect') }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import BackgroundElemt from '@/components/common/BackgroundElemt.vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import { useAuthStore } from '@/store/auth'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  // Ensure passwords match
  if (password.value !== confirmPassword.value) {
    await Swal.fire({
      icon: 'warning',
      title: 'Password Mismatch',
      text: 'Passwords do not match.',
      confirmButtonText: 'OK'
    })
    return
  }

  isLoading.value = true
  try {
    // Call API to register
    const res = await authStore.register(
      username.value,
      email.value,
      password.value
    )

    // Ensure API responds with a message
    if (res?.data?.message) {
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false
      })
      router.push('/login')
    }
  } catch (error) {
    // Safely parse error message
    const errorMessage = error.response?.data?.message || 'Something went wrong'
    await Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: errorMessage,
      confirmButtonText: 'OK'
    })
  } finally {
    isLoading.value = false
  }
}
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
