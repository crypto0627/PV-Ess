<template>
  <Navbar />
  <div
    class="min-h-screen bg-gradient-to-br from-green-400 to-green-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-3xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl overflow-hidden"
    >
      <div
        class="px-4 py-5 sm:px-6 bg-gradient-to-r from-green-600 to-green-500"
      >
        <h3 class="text-lg leading-6 font-medium text-white">User Profile</h3>
        <p class="mt-1 max-w-2xl text-sm text-green-100">
          Personal details and application.
        </p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div
            class="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-green-700">Full name</dt>
            <dd class="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              <div v-if="!editMode.name">
                {{ user.name }}
                <button
                  class="ml-2 text-green-600 hover:text-green-800"
                  @click="toggleEdit('name')"
                >
                  <i class="fas fa-edit"></i>
                </button>
              </div>
              <input
                v-else
                v-model="editedUser.name"
                class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                @blur="saveEdit('name')"
              />
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-green-700">Email address</dt>
            <dd class="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              <div v-if="!editMode.email">
                {{ user.email }}
                <button
                  class="ml-2 text-green-600 hover:text-green-800"
                  @click="toggleEdit('email')"
                >
                  <i class="fas fa-edit"></i>
                </button>
              </div>
              <input
                v-else
                v-model="editedUser.email"
                type="email"
                class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                @blur="saveEdit('email')"
              />
            </dd>
          </div>
          <div
            class="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-green-700">Phone number</dt>
            <dd class="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              <div v-if="!editMode.phone">
                {{ user.phone }}
                <button
                  class="ml-2 text-green-600 hover:text-green-800"
                  @click="toggleEdit('phone')"
                >
                  <i class="fas fa-edit"></i>
                </button>
              </div>
              <input
                v-else
                v-model="editedUser.phone"
                type="tel"
                class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                @blur="saveEdit('phone')"
              />
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-green-700">Address</dt>
            <dd class="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              <div v-if="!editMode.address">
                {{ user.address }}
                <button
                  class="ml-2 text-green-600 hover:text-green-800"
                  @click="toggleEdit('address')"
                >
                  <i class="fas fa-edit"></i>
                </button>
              </div>
              <textarea
                v-else
                v-model="editedUser.address"
                rows="3"
                class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                @blur="saveEdit('address')"
              ></textarea>
            </dd>
          </div>
          <div
            class="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-green-700">
              Energy consumption
            </dt>
            <dd class="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              {{ user.energyConsumption }} kWh/month
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-green-700">
              Solar panel efficiency
            </dt>
            <dd class="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              {{ user.solarEfficiency }}%
            </dd>
          </div>
        </dl>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          @click="saveAllChanges"
        >
          Save all changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/home/Navbar.vue'
import Swal from 'sweetalert2'
import { reactive, ref } from 'vue'

const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Green Energy St, Eco City, EC 12345',
  energyConsumption: 500,
  solarEfficiency: 18.5
})

const editedUser = reactive({ ...user.value })

const editMode = reactive({
  name: false,
  email: false,
  phone: false,
  address: false
})

const toggleEdit = (field) => {
  editMode[field] = !editMode[field]
  if (editMode[field]) {
    editedUser[field] = user.value[field]
  }
}

const saveEdit = async (field) => {
  try {
    // Here you would typically make an API call to update the user's information
    // For this example, we'll just update the local user object
    user.value[field] = editedUser[field]
    editMode[field] = false

    await Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `Your ${field} has been updated successfully.`,
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong while updating your information.'
    })
  }
}

const saveAllChanges = async () => {
  try {
    // Here you would typically make an API call to update all of the user's information
    Object.assign(user.value, editedUser)
    Object.keys(editMode).forEach((key) => (editMode[key] = false))

    await Swal.fire({
      icon: 'success',
      title: 'All Changes Saved!',
      text: 'Your profile has been updated successfully.',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong while updating your information.'
    })
  }
}
</script>
