import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import PlayRoom from '../views/PlayRoom.vue';
import ResetPasswordPage from '../views/ResetPasswordPage.vue';
import MyProfilePage from '../views/MyProfilePage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPasswordPage,
  },
  {
    path: '/myprofile',
    name: 'myprofile',
    component: MyProfilePage,
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: HomePage,
  },
  {
    path: '/playroom',
    name: 'playroom',
    component: PlayRoom,
  },
  {
    path: '/playroom/:id',
    component: PlayRoom,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
