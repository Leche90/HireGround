import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; 

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const user = ref<{ id: string; email: string } | null>(null);
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      token.value = response.data.token;
      user.value = response.data.user;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Login failed');
      } else {
        throw new Error('Login failed');
      }
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });
      token.value = response.data.token;
      user.value = response.data.user;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

      // Timeout to ensure registration completes before redirect
    setTimeout(() => {
      router.push('/login');  // Redirect to login after registration
    }, 1);  // Delay to ensure everything completes first
      
      return { success: true }; // Indicate successful registration
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Signup failed');
      } else {
        throw new Error('Signup failed');
      }
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    delete axios.defaults.headers.common['Authorization'];
  };

  return { token, user, isAuthenticated, login, signup, logout };
});
