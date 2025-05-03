<template>
    <DashboardLayout>
      <h2 class="text-xl font-bold mb-6">Settings</h2>
      <form class="space-y-4 max-w-md">
        <input type="email" v-model="email" placeholder="Update Email" class="input" />
        <input type="password" v-model="password" placeholder="New Password" class="input" />
        <button type="submit" class="btn-primary">Update</button>
      </form>
  
      <div class="mt-8">
        <h3 class="text-lg font-semibold mb-2">Theme</h3>
        <button @click="toggleDark" class="btn-secondary">
          Toggle Dark Mode
        </button>
      </div>
    </DashboardLayout>
  </template>
  
  <script setup>
  import DashboardLayout from '@/layouts/DashboardLayout.vue'
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  
  function toggleDark() {
    document.documentElement.classList.toggle('dark')
  }
  </script>
  