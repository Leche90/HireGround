<template>
    <header class="bg-white shadow-md dark:bg-gray-800">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div class="flex items-center gap-2">
          <img src="@/assets/logo.png" alt="HireGround Logo" class="h-8 w-auto" />
          <h1 class="text-xl font-semibold text-gray-800 dark:text-white">HireGround</h1>
        </div>
  
        <div class="space-x-4">
          <RouterLink
            to="/dashboard"
            class="text-neutral-700 dark:text-gray-200 hover:underline"
          >
            Dashboard
          </RouterLink>
          <RouterLink
            to="/settings"
            class="text-neutral-700 dark:text-gray-200 hover:underline"
          >
            Settings
          </RouterLink>
          <button
            @click="logout"
            class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/store/auth.js'
  
  const router = useRouter()
  const auth = useAuthStore()
  
  const logout = () => {
    auth.logout()
    router.push('/')
  }
  </script>
  
  <style scoped>
  /* You can keep scoped styles minimal if Tailwind covers most needs */
  </style>
  