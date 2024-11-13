<template>
    <div>
      <Login v-if="showLogin" @switchToSignup="toggleAuthMode" />
      <Signup v-else @switchToLogin="toggleAuthMode" />
    </div>
  </template>
  
  <script>
  import Login from './Login.vue';
  import Signup from './Signup.vue';
  
  export default {
    components: {
      Login,
      Signup,
    },
    data() {
      return {
        showLogin: true, // Determina si se muestra Login o Signup
      };
    },
    methods: {
      toggleAuthMode() {
        this.showLogin = !this.showLogin;
      },
    },
  };
  </script>
  