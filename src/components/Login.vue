<template>
    <div class="login-container">
      <h2>Login to your account</h2>
      <p>It's great to see you again.</p>
      
      <form @submit.prevent="handleSubmit">
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
        
        <!-- Enlaces para Olvidar Contraseña y Registro -->
        <p class="forgot-password">
          Forgot your password? <a href="#">Reset your password</a>
        </p>
        <p class="sign-up">
          Don’t have an account? <a href="#">Join</a>
        </p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        emailError: false,
        showPassword: false,
      };
    },
    computed: {
      isFormValid() {
        return this.email && this.password && !this.emailError;
      },
    },
    methods: {
      validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.emailError = !emailPattern.test(this.email);
      },
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      handleSubmit() {
        alert("Form Submitted");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos generales */
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 2em;
    text-align: left;
    font-family: 'Inter', sans-serif; /* Cambia a 'General Sans' si tienes la fuente */
    background-color: #ffffff;
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
  </style>
  <style scoped>
  /* Añade este estilo al final */
  .toggle-password {
    display: none;
  }
  </style>