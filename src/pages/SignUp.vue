<template>
  <AuthLayout>
    <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
    <form @submit.prevent="handleSignup" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />
      <button type="submit" class="btn-primary w-full">Create Account</button>
    </form>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const email = ref('')
const password = ref('')

function handleSignup() {
  // handle sign up logic (use authService)
}
</script>
