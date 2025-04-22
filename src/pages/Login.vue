<template>
    <div class="container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  
  const email = ref('');
  const password = ref('');
  const error = ref<string | null>(null);
  const router = useRouter();
  const authStore = useAuthStore();
  
  const handleLogin = async () => {
    try {
      await authStore.login(email.value, password.value);
      router.push('/jobs');
    } catch (err) {
      error.value = err.message;
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>