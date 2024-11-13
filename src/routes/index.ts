import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Component } from 'vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Home from '../components/Home.vue';
import Account from '../components/Account.vue'; 
import ChangePass from '../components/ChangePass.vue';



const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login as Component,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup as Component,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home as Component, // Añadimos Home como una ruta válida
  },
  {
    path: '/account', // Nueva ruta para la vista de cuenta
    name: 'Account',
    component: Account,
  },
  {
    path: '/changepass',
    name: 'ChangePass',
    component: ChangePass as Component,
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