// stores/job.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  postedBy: string;
}

export const useJobStore = defineStore('job', () => {
  const jobs = ref<Job[]>([]);
  const selectedJob = ref<Job | null>(null);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      jobs.value = response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const createJob = async (jobData: Partial<Job>) => {
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', jobData);
      jobs.value.push(response.data);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      jobs.value = jobs.value.filter(job => job.id !== id);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return {
    jobs,
    selectedJob,
    fetchJobs,
    createJob,
    deleteJob,
  };
});
