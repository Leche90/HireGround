<template>
    <div class="container">
      <h2>Job Applications</h2>
      <JobForm @job-added="fetchJobs" />
      <div class="job-list">
        <div v-for="job in jobs" :key="job.id" class="job-item">
          <h3>{{ job.title }} at {{ job.company }}</h3>
          <p>Status: {{ job.status }}</p>
          <p v-if="job.resume_link">Resume: <a :href="job.resume_link" target="_blank">Link</a></p>
          <p v-if="job.notes">Notes: {{ job.notes }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import JobForm from '../components/JobForm.vue';
  
  interface Job {
    id: string;
    user_id: string;
    title: string;
    company: string;
    status: string;
    resume_link?: string;
    notes?: string;
    created_at: string;
  }
  
  const jobs = ref<Job[]>([]);
  
  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      jobs.value = response.data;
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };
  
  onMounted(fetchJobs);
  </script>