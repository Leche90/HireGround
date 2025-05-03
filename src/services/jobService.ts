import api from './api';

// Define your Job interface/types
interface Job {
  id: string;
  title: string;
  description: string;
  // Add other job properties as needed
}

export default {
  getJobs: (): Promise<Job[]> =>
    api.get('/jobs').then((res: { data: Job[] }) => res.data),

  getJobById: (id: string): Promise<Job> =>
    api.get(`/jobs/${id}`).then((res: { data: Job }) => res.data),

  createJob: (data: Omit<Job, 'id'>): Promise<Job> =>
    api.post('/jobs', data).then((res: { data: Job }) => res.data),

  updateJob: (id: string, data: Partial<Job>): Promise<Job> =>
    api.put(`/jobs/${id}`, data).then((res: { data: Job }) => res.data),

  deleteJob: (id: string): Promise<void> =>
    api.delete(`/jobs/${id}`).then((res) => res.data),
};