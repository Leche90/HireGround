<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
// No logic needed unless you're adding layout components (e.g., navbar, footer)
</script>

<style lang="postcss">
.nav-link {
  @apply text-neutral-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>