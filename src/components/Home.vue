<template>
    <div class="home-page">
      <!-- Barra de navegación superior -->
      <nav class="navbar">
        <div class="logo">LockItem</div>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Search</a></li>
          <li><router-link to="/account">Account</router-link></li>
        </ul>
      </nav>
  
      <!-- Contenido principal de la página -->
      <div class="content">
        <p>Welcome to the Home Page!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Home",
  };
  </script>
  
  <style scoped>
  /* Estilo de la página principal */
  .home-page {
    text-align: center;
    margin: 0; /* Elimina cualquier margen */
  }
  
  /* Estilo de la barra de navegación */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    color: #fff;
    padding: 1em 2em;
    width: 100vw; /* Asegura que la barra ocupe todo el ancho de la ventana */
    box-sizing: border-box; /* Incluye padding en el ancho total */
    position: fixed; /* Fija la barra en la parte superior */
    top: 0;
    left: 0;
    z-index: 1000; /* Asegura que la barra quede sobre el contenido */
  }
  
  /* Estilo del logo */
  .logo {
    font-size: 20px;
    font-weight: bold;
  }
  
  /* Estilo de los enlaces de navegación */
  .nav-links {
    list-style: none;
    display: flex;
    gap: 1.5em;
    margin: 0;
  }
  
  .nav-links li {
    font-size: 16px;
  }
  
  .nav-links a {
    color: #fff;
    text-decoration: none;
  }
  
  .nav-links a:hover {
    text-decoration: underline;
  }
  
  /* Contenido principal de la página */
  .content {
    padding: 2em;
    font-size: 18px;
    margin-top: 70px; /* Asegura que el contenido no quede oculto detrás de la barra fija */
  }
  </style>
  