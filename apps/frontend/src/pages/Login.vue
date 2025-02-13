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
          <h2 class="text-3xl font-bold mb-6">Sign In</h2>

          <form @submit.prevent="handleSubmit">
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

            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="staySignedIn"
                  v-model="staySignedIn"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="staySignedIn"
                  class="ml-2 block text-sm text-gray-700"
                >
                  Stay signed in
                </label>
              </div>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-800"
                >Forgot password?</a
              >
            </div>

            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      <!-- Image section (7/10) -->
      <div class="hidden md:block w-7/10 bg-gray-200">
        <img
          src="/red-plum.jpg"
          alt="Login background"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const staySignedIn = ref(false)

const handleSubmit = () => {
  // Handle form submission logic here
  console.log('Sign In', email.value, password.value, staySignedIn.value)
  // In a real application, you would call an API to authenticate the user
}
</script>
