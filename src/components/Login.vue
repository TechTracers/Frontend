<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login to your account</h2>
      <p>It's great to see you again.</p>
      
      <form @submit.prevent="handleSubmit">
        <!-- Campo de Nombre de Usuario -->
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
          />
        </div>
        
        <!-- Campo de Contraseña -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="Enter your password"
          />
          <span class="toggle-password" @click="togglePassword">
            <img :src="showPassword ? 'eye-open-icon.png' : 'eye-closed-icon.png'" alt="Toggle Password Visibility" />
          </span>
        </div>
        
        <!-- Botón de Iniciar Sesión -->
        <button :disabled="!isFormValid" class="login-button">Login</button>
        
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
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      errorMessage: "",
    };
  },
  computed: {
    isFormValid() {
      return this.username && this.password;
    },
  },
  methods: {
  async handleSubmit() {
    try {
      const response = await axios.post('/api/v1/users/login', {
        username: this.username,
        password: this.password
      });

      // Comprueba si se recibió un token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Almacena el token
        localStorage.setItem('user', JSON.stringify(response.data)); // Opcional: guarda también los datos del usuario
        this.$router.push('/home'); // Redirige a la página principal
      } else {
        throw new Error('Login failed. No token received.');
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        this.errorMessage = error.response.data.message || `Login failed (Status code: ${error.response.status})`;
      } else {
        this.errorMessage = 'Network error occurred. Please try again later.';
      }
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
  min-height: 100vh; /* Asegura que ocupe toda la altura de la pantalla */
  background-color: #f5f5f5; /* Color de fondo opcional */
}

/* Estilos generales del formulario */
.login-container {
  max-width: 400px;
  width: 100%;
  padding: 2em;
  text-align: left;
  font-family: 'Inter', sans-serif; /* Cambia a 'General Sans' si tienes la fuente */
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
