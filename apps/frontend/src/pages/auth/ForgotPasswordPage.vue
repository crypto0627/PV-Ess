<template>
  <div class="relative h-screen">
    <!-- Logo and title -->
    <div class="absolute top-4 left-4 z-10 flex items-center">
      <h1 class="text-2xl font-bold text-gray-800">PV-ESS</h1>
    </div>

    <div class="flex h-full">
      <!-- Form section (3/10) -->
      <div
        class="w-full md:w-3/10 flex items-center justify-center bg-white p-8"
      >
        <div class="w-full max-w-md mt-16">
          <h2 class="text-3xl font-bold mb-6">Forgot Password</h2>
          <p class="mb-6 text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <form @submit.prevent="handleSubmit">
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Send Reset Link
            </button>
          </form>

          <p class="mt-4 text-center text-sm text-gray-600">
            Remember your password?
            <a href="/login" class="text-blue-600 hover:text-blue-800"
              >Back to login</a
            >
          </p>
        </div>
      </div>

      <!-- Image section (7/10) -->
      <div class="hidden md:block w-7/10 bg-gray-200">
        <img
          src="/red-plum.jpg"
          alt="Forgot Password background"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const router = useRouter()

const handleSubmit = () => {
  console.log('Forgot Password Request for:', email.value)
  router.push('/reset-password')
}
</script>
