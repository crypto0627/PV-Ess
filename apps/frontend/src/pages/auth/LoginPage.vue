<template>
  <div
    class="flex h-screen items-center justify-center bg-gradient-to-br from-green-400 to-green-100 overflow-hidden"
  >
    <BackgroundElemt />
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
        <router-link to="/register" class="text-green-700">{{
          $t('auth.sign_up')
        }}</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
import BackgroundElemt from '@/components/common/BackgroundElemt.vue'
</script>
