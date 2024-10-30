<script setup lang="ts">
import Login from './components/Login.vue'; // Importa el componente de Login
</script>

<template>
  <div>
    <!-- Muestra el componente Login en lugar del contenido actual -->
    <Login />
  </div>
</template>

<style scoped>
/* Puedes mantener o ajustar estos estilos si quieres usar los logos más adelante */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

