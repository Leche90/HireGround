<template>
    <DashboardLayout>
      <div>
        <h2 class="text-2xl font-bold mb-2">{{ job.title }}</h2>
        <p class="text-gray-600 mb-2">{{ job.company }} — {{ job.status }}</p>
        <p class="mb-2"><strong>Applied:</strong> {{ job.date }}</p>
        <a :href="job.link" class="text-blue-500 underline" target="_blank">View Job Posting</a>
        <p class="mt-4 whitespace-pre-line">{{ job.notes }}</p>
  
        <div class="mt-6 space-x-2">
          <RouterLink :to="`/edit/${job.id}`" class="btn-secondary">Edit</RouterLink>
          <button @click="deleteJob" class="btn-danger">Delete</button>
        </div>
      </div>
    </DashboardLayout>
  </template>
  
  <script setup>
  import DashboardLayout from '@/layouts/DashboardLayout.vue'
  import { ref } from 'vue'
  
  const job = ref({
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    status: 'Interviewing',
    date: '2024-10-01',
    link: 'https://example.com/job-posting',
    notes: 'Initial call done. Technical interview pending.'
  })
  
  function deleteJob() {
    // delete logic
  }
  </script>
  