<script setup lang="ts">
import FirstSection from './FirstSection.vue'
import FourthSection from './FourthSection.vue'
import SecondSection from './SecondSection.vue'
import ThirdSection from './ThirdSection.vue'
</script>
<template>
  <div class="w-full h-[500px] mb-2 relative">
    <div
      class="w-full h-full mb-2 overflow-hidden bg-secondary-90 rounded-lg shadow"
    >
      <div class="w-full h-full text-center flex flex-col">
        <div class="flex-1 flex items-center justify-center">
          <div class="w-full h-full grid grid-cols-2 grid-rows-2 relative">
            <SecondSection class="col-span-1" />
            <FirstSection class="col-span-1" />
            <ThirdSection class="col-span-1" />
            <FourthSection class="col-span-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
