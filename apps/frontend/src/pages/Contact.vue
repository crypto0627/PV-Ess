<template>
  <div class="flex min-h-screen items-center justify-center bg-white p-8">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-bold text-center mb-8">
        {{ $t('home.contact') }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-700"
            >{{ $t('auth.user_name') }}</label
          >
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-700"
            >{{ $t('auth.email') }}</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-700"
            >{{ $t('contact.message') }}</label
          >
          <textarea
            id="message"
            v-model="message"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          :disabled="isSubmitting"
        >
          {{
            isSubmitting
              ? $t('contact.submitting')
              : $t('contact.submit_message')
          }}
        </button>
      </form>
    </div>
    <div class="fixed bottom-4 right-4">
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const name = ref('')
const email = ref('')
const message = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // // 這裡加入發送表單的 API 邏輯
    // await new Promise(resolve => setTimeout(resolve, 1000))

    await Swal.fire({
      icon: 'success',
      title: $t('contact.success'),
      text: $t('contact.success_text'),
      confirmButtonText: $t('contact.confirm_btn')
    })

    // 清空表單
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error occur, please try again later!',
      confirmButtonText: 'OK'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
