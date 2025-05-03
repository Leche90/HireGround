<template>
    <DashboardLayout>
      <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Job' : 'Add New Job' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="form.title" placeholder="Job Title" class="input" />
        <input v-model="form.company" placeholder="Company Name" class="input" />
        <select v-model="form.status" class="input">
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input v-model="form.date" type="date" class="input" />
        <input v-model="form.link" placeholder="Job Posting Link" class="input" />
        <textarea v-model="form.notes" placeholder="Notes" class="input" />
        <button type="submit" class="btn-primary">{{ isEditing ? 'Update' : 'Save' }}</button>
      </form>
    </DashboardLayout>
  </template>
  
  <script setup>
  import DashboardLayout from '@/layouts/DashboardLayout.vue'
  import { ref } from 'vue'
  
  const isEditing = false // or based on route param
  const form = ref({
    title: '',
    company: '',
    status: 'Applied',
    date: '',
    link: '',
    notes: ''
  })
  
  function handleSubmit() {
    // Submit logic
  }
  </script>
  