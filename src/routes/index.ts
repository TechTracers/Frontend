import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Component } from 'vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login as Component, // Forzamos el tipo como Component
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup as Component, // Forzamos el tipo como Component
  },
  {
    path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
