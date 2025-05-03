import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const profile = ref<null | {
    id: string;
    name: string;
    email: string;
    role: string;
  }>(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      profile.value = response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const updateProfile = async (updates: Partial<{ name: string; email: string }>) => {
    try {
      const response = await axios.put('http://localhost:5000/api/user', updates);
      profile.value = response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return {
    profile,
    fetchUserProfile,
    updateProfile,
  };
});
