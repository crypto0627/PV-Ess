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
          <h2 class="text-3xl font-bold mb-6">Create an Account</h2>

          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
                >Full Name</label
              >
              <input
                type="text"
                id="name"
                v-model="name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="mb-4">
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

            <div class="mb-4">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-700"
                >Password</label
              >
              <input
                type="password"
                id="password"
                v-model="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="confirmPassword"
                class="block mb-2 text-sm font-medium text-gray-700"
                >Confirm Password</label
              >
              <input
                type="password"
                id="confirmPassword"
                v-model="confirmPassword"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="flex items-center mb-6">
              <input
                type="checkbox"
                id="agreeTerms"
                v-model="agreeTerms"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label for="agreeTerms" class="ml-2 block text-sm text-gray-700">
                I agree to the
                <a href="#" class="text-blue-600 hover:text-blue-800"
                  >Terms and Conditions</a
                >
              </label>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Create Account
            </button>
          </form>

          <p class="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <a
              href="#"
              @click.prevent="switchToLogin"
              class="text-blue-600 hover:text-blue-800"
              >Sign in</a
            >
          </p>
        </div>
      </div>

      <!-- Image section (7/10) -->
      <div class="hidden md:block w-7/10 bg-gray-200">
        <img
          src="/red-plum.jpg"
          alt="Register background"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)

const handleSubmit = () => {
  // Handle form submission logic here
  console.log(
    'Register',
    name.value,
    email.value,
    password.value,
    confirmPassword.value,
    agreeTerms.value
  )
  // In a real application, you would validate the input and call an API to register the user
}

const switchToLogin = () => {
  // In a real application, you would implement logic to switch to the login form
  console.log('Switching to login form')
}
</script>
