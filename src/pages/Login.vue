<template>
  <div class="min-h-screen flex items-center justify-center bg-purple-50 px-4">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-purple-100">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">Email</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email" 
            required 
            class="w-full px-4 py-3 border border-purple-300 rounded-lg shadow-sm focus:ring-orange-400 focus:border-orange-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-neutral-700 mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="Password" 
            required 
            class="w-full px-4 py-3 border border-purple-300 rounded-lg shadow-sm focus:ring-orange-400 focus:border-orange-500"
          />
        </div>

        <div class="pt-2">
          <button 
            type="submit" 
            class="w-full bg-purple-600 text-white py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </div>

        <p v-if="error" class="text-red-600 text-center font-medium mt-4">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push('/jobs');
  } catch (err: any) {
    error.value = err.message || 'Login failed';
  }
};
</script>
