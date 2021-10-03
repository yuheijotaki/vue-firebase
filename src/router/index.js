import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/contents',
      component: () => import('../views/Contents.vue'),
    },
    {
      path: '/sign-in',
      component: () => import('../views/SignIn.vue'),
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/mypage',
      component: () => import('../views/Mypage.vue'),
    },
  ],
});

export default router;
