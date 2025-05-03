<template>
    <DashboardLayout>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold">My Job Applications</h1>
        <RouterLink to="/add" class="btn-primary">+ Add Job</RouterLink>
      </div>
      <FilterBar />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <JobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </DashboardLayout>
  </template>
  
  <script setup>
  import DashboardLayout from '@/layouts/DashboardLayout.vue'
  import JobCard from '@/components/JobCard.vue'
  import FilterBar from '@/components/FilterBar.vue'
  import { ref } from 'vue'
  
  const jobs = ref([])
  // Fetch jobs from store/service onMounted (optional)
  </script>
  