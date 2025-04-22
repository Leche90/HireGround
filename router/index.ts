import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/../src/pages/Login.vue';
import Register from '../pages/../src/pages/Register.vue';
import Jobs from '../pages/../src/pages/Jobs.vue';
import { useAuthStore } from '../pages/../src/stores/auth';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/jobs',
    component: Jobs,
    meta: { requiresAuth: true },
  },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;