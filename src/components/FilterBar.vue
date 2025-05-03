<template>
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="flex items-center space-x-2">
        <label for="status" class="text-sm text-neutral-700 dark:text-gray-200">Filter by Status:</label>
        <select
          id="status"
          v-model="selectedStatus"
          @change="$emit('filter', selectedStatus)"
          class="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="">All</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
  
      <div class="flex items-center space-x-2">
        <label for="sort" class="text-sm text-neutral-700 dark:text-gray-200">Sort by:</label>
        <select
          id="sort"
          v-model="selectedSort"
          @change="$emit('sort', selectedSort)"
          class="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="company">Company Name</option>
          <option value="date">Date Added</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const selectedStatus = ref('')
  const selectedSort = ref('company')
  </script>
  