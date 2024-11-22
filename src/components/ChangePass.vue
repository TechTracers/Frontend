<template>
    <div class="login-page">
      <div class="login-container">
        <!-- Paso 1: Verificar Email -->
        <div v-if="step === 1">
          <h2>Forgot Password</h2>
          <p>Enter your email for the verification process. We will send a 4-digit code to your email.</p>
          <form @submit.prevent="verifyEmail">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="Enter your email"
              />
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </div>
            <button type="submit" class="login-button">Send Code</button>
          </form>
        </div>
  
        <!-- Paso 2: Resetear Contraseña -->
        <div v-else-if="step === 2">
          <h2>Reset Password</h2>
          <p>Set the new password for your account so you can login and access all the features.</p>
          <form @submit.prevent="resetPassword">
            <div class="form-group">
              <label for="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                v-model="newPassword"
                placeholder="Enter your new password"
              />
            </div>
            <div class="form-group">
              <label for="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                v-model="confirmPassword"
                placeholder="Confirm your new password"
              />
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </div>
            <button type="submit" class="login-button">Continue</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        newPassword: '',
        confirmPassword: '',
        step: 1, // Paso 1: Verificar email, Paso 2: Resetear contraseña
        errorMessage: '',
        userId: null, // Guarda el ID del usuario tras verificar el email
      };
    },
    methods: {
      async verifyEmail() {
        try {
          const response = await fetch('http://localhost:3000/users');
          const users = await response.json();
  
          const user = users.find((user) => user.email === this.email);
          if (user) {
            this.userId = user.id;
            this.step = 2; // Avanzar al paso de resetear contraseña
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Email not found.';
          }
        } catch (error) {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      },
      async resetPassword() {
  if (this.newPassword !== this.confirmPassword) {
    this.errorMessage = 'Passwords do not match.';
    return;
  }

  try {
    const token = this.user.token; // Asume que el token está guardado
    const response = await axios.put(`https://lockitem-abaje5g7dagcbsew.canadacentral-01.azurewebsites.net/api/v1/users/${this.userId}`, {
      password: this.newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.status === 200) {
      this.$router.push('/login'); // Redirigir al login
    } else {
      throw new Error('Failed to reset password. Please try again.');
    }
  } catch (error) {
    this.errorMessage = error.response.data.message || 'An error occurred. Please try again.';
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
  </style>
  
  