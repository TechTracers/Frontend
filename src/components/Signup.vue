<template>
  <div class="signup-page">
    <div class="signup-container">
      <h2>Create an account</h2>
      <p>Let’s create your account.</p>

      <form @submit.prevent="handleSignup">
        <!-- Campo de Usuario (username) -->
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username" />
        </div>
        <!-- Campo de Nombre -->
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="firstName" placeholder="Enter your first name" />
        </div>
        <!-- Campo de Apellido -->
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="lastName" placeholder="Enter your last name" />
        </div>
        <!-- Campo de Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email address" @input="validateEmail" :class="{ error: emailError }" />
          <span v-if="emailError" class="error-message">Please enter a valid email address</span>
        </div>
        <!-- Campo de Contraseña -->
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" />
        </div>
        <!-- Campo de Número de Teléfono -->
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" v-model="phoneNumber" placeholder="Enter your phone number" @input="validatePhoneNumber" :class="{ error: phoneError }" />
          <span v-if="phoneError" class="error-message">Please enter a valid phone number</span>
        </div>
        <!-- Botón de Crear Cuenta -->
        <button :disabled="!isFormValid" class="signup-button">Create an Account</button>
        <!-- Enlace para Cambiar a Login -->
        <p class="login-link">
          Already have an account? <router-link to="/login">Log In</router-link>
        </p>
        <!-- Mensaje de Error -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      emailError: false,
      phoneError: false,
      errorMessage: '',
    };
  },
  computed: {
    isFormValid() {
      return this.username && this.firstName && this.lastName && this.email &&
             !this.emailError && this.password && this.phoneNumber && !this.phoneError;
    },
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email);
    },
    validatePhoneNumber() {
      const phoneRegex = /^[0-9]{9}$/;
      this.phoneError = !phoneRegex.test(this.phoneNumber);
    },
    async handleSignup() {
  if (!this.isFormValid) {
    this.errorMessage = 'Please fill out all fields correctly.';
    return;
  }

  const userData = {
    username: this.username,
    password: this.password,
    name: this.firstName,
    lastname: this.lastName,
    email: this.email,
    phone: this.phoneNumber,
    role: "NORMAL"
  };

  try {
    const response = await axios.post('/api/v1/users', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      this.resetForm();
      this.$router.push('/login');
    } else {
      this.errorMessage = `Failed to register with status code: ${response.status}`;
    }
  } catch (error) {
    console.error("Error during signup:", error);
    this.errorMessage = error.response ? `${error.response.data.message} (Status code: ${error.response.status})` : 'Network error occurred. Please try again later.';
  }
}
,
    resetForm() {
      this.username = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.phoneNumber = '';
      this.emailError = false;
      this.phoneError = false;
      this.errorMessage = '';
    },
  },
};
</script>






<style scoped>
/* Contenedor de toda la página */
.signup-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Estilos del formulario */
.signup-container {
  max-width: 400px;
  width: 100%;
  padding: 2em;
  text-align: left;
  font-family: 'Inter', sans-serif;
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

input, select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  color: #333;
  box-sizing: border-box;
}

input:focus, select:focus {
  border-color: #000;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
  min-height: 16px;
}

.signup-button {
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  
  margin-top: 24px;
}

.signup-button:disabled {
  background-color: #000000;
}

.login-link {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 12px;
}

.login-link a {
  color: #000;
  text-decoration: underline;
  cursor: pointer;
}
</style>
