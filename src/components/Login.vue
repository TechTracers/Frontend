<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login to your account</h2>
      <p>It's great to see you again.</p>

      <form @submit.prevent="handleLogin">
        <!-- Campo de Nombre de Usuario -->
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username" />
        </div>

        <!-- Campo de Contraseña -->
        <div class="form-group">
          <label for="password">Password</label>
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
            placeholder="Enter your password" />
          <span class="toggle-password" @click="togglePassword">
            <img :src="showPassword ? 'eye-open-icon.png' : 'eye-closed-icon.png'" alt="Toggle Password Visibility" />
          </span>
        </div>

        <!-- Botón de Iniciar Sesión -->
        <button :disabled="!username || !password" class="login-button">
          Login
        </button>

        <!-- Mensaje de Error -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <!-- Enlaces para Olvidar Contraseña y Registro -->
        <p class="forgot-password">
          Forgot your password?
          <router-link to="/changepass">Reset your password</router-link>
        </p>
        <p class="sign-up">
          Don’t have an account? <router-link to="/signup">Sign Up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      showPassword: false,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(
          'https://lockitem-abaje5g7dagcbsew.canadacentral-01.azurewebsites.net/api/v1/users/login',
          {
            username: this.username,
            password: this.password,
          }
        );

        // Desestructura la respuesta
        const { id, token, username, name, lastname, email, phone, role } = response.data;

        // Guarda el token y los datos del usuario
        localStorage.setItem('authToken', token);
        localStorage.setItem(
          'user',
          JSON.stringify({ id, username, name, lastname, email, phone, role })
        );

        console.log('Login successful:', response.data);
        console.log('Saved user to localStorage:', JSON.parse(localStorage.getItem('user')));

        // Redirige al usuario a la página principal
        console.log('JWT Token:', localStorage.getItem('authToken'));
        this.$router.push('/home');
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = error.response
          ? `${error.response.data.message} (Status code: ${error.response.status})`
          : 'Invalid username or password. Please try again.';
      }
    },
  },
};
</script>







<style scoped>
/* Contenedor de toda la página */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* Asegura que ocupe toda la altura de la pantalla */
  background-color: #f5f5f5;
  /* Color de fondo opcional */
}

/* Estilos generales del formulario */
.login-container {
  max-width: 400px;
  width: 100%;
  padding: 2em;
  text-align: left;
  font-family: 'Inter', sans-serif;
  /* Cambia a 'General Sans' si tienes la fuente */
  background-color: #f5f5f5;
  color: #1A1A1A;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

p {
  color: #666;
  font-size: 14px;
  margin-bottom: 24px;
}

.form-group {
  margin: 16px 0;
  position: relative;
}

label {
  font-size: 14px;
  color: #1A1A1A;
  margin-bottom: 8px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  color: #333;
}

input:focus {
  border-color: #000;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 24px;
}

.login-button:disabled {
  background-color: #000000;
}

.forgot-password,
.sign-up {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 12px;
}

.forgot-password a,
.sign-up a {
  color: #000;
  text-decoration: underline;
  cursor: pointer;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

/* Añade este estilo al final */
.toggle-password {
  display: none;
}
</style>
