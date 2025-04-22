<template>
    <div>
      <nav v-if="authStore.isAuthenticated">
        <router-link to="/jobs">Jobs</router-link>
        <button @click="logout">Logout</button>
      </nav>
      <nav v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from './stores/auth';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const logout = () => {
    authStore.logout();
    router.push('/login');
  };
  </script>