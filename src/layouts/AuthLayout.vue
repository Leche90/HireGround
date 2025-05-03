<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div class="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  // No script needed; layout uses <slot> for injected page content
  </script>
  