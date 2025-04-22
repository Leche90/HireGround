<template>
  <div>
    <h3>Add Job</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.title" placeholder="Job Title" required />
      <input v-model="form.company" placeholder="Company" required />
      <select v-model="form.status" required>
        <option value="Applied">Applied</option>
        <option value="Interviewed">Interviewed</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input v-model="form.resume_link" placeholder="Resume Link" />
      <textarea v-model="form.notes" placeholder="Notes"></textarea>
      <button type="submit">Add Job</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const emit = defineEmits(['job-added']);

const form = ref({
  title: '',
  company: '',
  status: 'Applied',
  resume_link: '',
  notes: '',
});

const error = ref<string | null>(null);

const handleSubmit = async () => {
  if (!authStore.isAuthenticated) {
    error.value = 'You must be logged in';
    return;
  }

  try {
    await axios.post('http://localhost:5000/api/jobs', form.value);
    emit('job-added');
    form.value = { title: '', company: '', status: 'Applied', resume_link: '', notes: '' };
    error.value = null;
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to add job';
  }
};
</script>

<style scoped>
.error {
  color: red;
}
textarea {
  padding: 0.5rem;
  font-size: 1rem;
}
</style>