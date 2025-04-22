import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
export const useAuthStore = defineStore('auth', () => {
    const token = ref(null);
    const user = ref(null);
    const isAuthenticated = computed(() => !!token.value);
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            token.value = response.data.token;
            user.value = response.data.user;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Login failed');
            }
            else {
                throw new Error('Login failed');
            }
        }
    };
    const register = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password,
            });
            token.value = response.data.token;
            user.value = response.data.user;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Registration failed');
            }
            else {
                throw new Error('Registration failed');
            }
        }
    };
    const logout = () => {
        token.value = null;
        user.value = null;
        delete axios.defaults.headers.common['Authorization'];
    };
    return { token, user, isAuthenticated, login, register, logout };
});
//# sourceMappingURL=auth.js.map