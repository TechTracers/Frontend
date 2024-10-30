<template>
  <div class="signup-page"> <!-- Añadido un contenedor de página -->
    <div class="signup-container">
      <h2>Create an account</h2>
      <p>Let’s create your account.</p>

      <form @submit.prevent="handleSignup">
        <!-- Campo de Nombre Completo -->
        <div class="form-group">
          <label for="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            v-model="fullName"
            placeholder="Enter your full name"
          />
        </div>

        <!-- Campo de Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email address"
            @input="validateEmail"
            :class="{ error: emailError }"
          />
          <span v-if="emailError" class="error-message">Please enter a valid email address</span>
        </div>

        <!-- Campo de Contraseña -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
          />
        </div>

        <!-- Botón de Crear Cuenta -->
        <button :disabled="!isFormValid" class="signup-button">Create an Account</button>

        <!-- Enlace para Cambiar a Login -->
        <p class="login-link">
          Already have an account? <router-link to="/login">Log In</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      emailError: false,
    };
  },
  computed: {
    isFormValid() {
      return this.fullName && this.email && this.password && !this.emailError;
    },
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.emailError = !emailPattern.test(this.email);
    },
    handleSignup() {
      alert("Account Created");
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
  min-height: 100vh; /* Ocupa toda la altura de la ventana */
  background-color: #f5f5f5; /* Color de fondo opcional */
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
