<template>
    <div class="account-page">
      <!-- Barra de navegación superior -->
      <nav class="navbar">
        <div class="logo">LockItem</div>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Search</a></li>
          <li><router-link to="/account">Account</router-link></li>
        </ul>
      </nav>
  
      <!-- Título de la sección de cuenta y botón de logout -->
      <div class="header">
        <h2>Account</h2>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
  
      <div class="account-container">
        <!-- Información del usuario -->
        <div class="view-section">
          <img :src="profileImage" alt="Profile Image" class="profile-image">
          <form @submit.prevent>
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" :value="user.name" disabled />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" :value="user.email" disabled />
            </div>
            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" :value="user.birthDate" disabled />
            </div>
            <div class="form-group">
              <label>Gender</label>
              <select :value="user.gender" disabled>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" :value="user.phone" disabled />
            </div>
            <button @click="toggleEditMode" class="edit-button">Edit</button>
          </form>
        </div>
  
        <!-- Sección de edición -->
        <div class="edit-section" v-if="isEditMode">
          <form @submit.prevent="saveChanges">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" v-model="editableUser.name" />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" v-model="editableUser.email" />
            </div>
            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" v-model="editableUser.birthDate" />
            </div>
            <div class="form-group">
              <label>Gender</label>
              <select v-model="editableUser.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" v-model="editableUser.phone" />
            </div>
            <button type="submit" class="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from '../services/AuthService';
  import axios from 'axios';
  import profileImage from '@/assets/profile-placeholder.png'; // Importa la imagen desde assets
  
  export default {
    name: 'Account',
    data() {
      return {
        user: JSON.parse(localStorage.getItem('user')) || {}, // Cargar datos del usuario de localStorage
        editableUser: {},
        isEditMode: false,
        profileImage, // Asigna la imagen importada a una propiedad de datos
      };
    },
    mounted() {
      this.loadUserData();
    },
    methods: {
      async loadUserData() {
        try {
          const userId = this.user.id; // Asegúrate de tener el ID del usuario guardado en el local storage
          const token = this.user.token; // Token guardado previamente
          const response = await axios.get(`https://lockitem-abaje5g7dagcbsew.canadacentral-01.azurewebsites.net/api/v1/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          this.user = response.data; // Actualiza la información del usuario
          this.editableUser = { ...this.user }; // Prepara los datos para la edición
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      toggleEditMode() {
        this.isEditMode = !this.isEditMode;
      },
      async saveChanges() {
        try {
          const token = this.user.token;
          await axios.put(`https://lockitem-abaje5g7dagcbsew.canadacentral-01.azurewebsites.net/api/v1/users/${this.user.id}`, this.editableUser, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.user = { ...this.editableUser };
          localStorage.setItem('user', JSON.stringify(this.user)); // Actualizar en localStorage
          this.isEditMode = false;
        } catch (error) {
          console.error('Error updating user:', error);
        }
      },
      logout() {
        AuthService.logout(); // Llamada para manejar el logout
        this.$router.push('/login');
      },
    },
  };
  </script>
  <style scoped>
  /* Barra de navegación */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    color: white;
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
    color: white;
    text-decoration: none;
  }
  
  .nav-links a:hover {
    text-decoration: underline;
  }
  
  /* Estilo de la página principal */
  .account-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    margin-top: 80px; /* Ajuste para la barra de navegación fija */
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 800px;
    margin-bottom: 1em;
  }
  
  .logout-button {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    font-weight: bold;
  }
  
  .account-container {
    display: flex;
    flex-direction: row; /* Asegura que las secciones estén en fila */
    justify-content: space-between; /* Separa horizontalmente */
    align-items: stretch; /* Asegura que ambas secciones tengan la misma altura */
    gap: 2em; /* Espaciado entre secciones */
    width: 100%;
    max-width: 900px; /* Ajusta el ancho máximo del contenedor */
    margin: 0 auto; /* Centra el contenedor */
}
  
  .view-section, .edit-section {
    flex: 1;
    max-width: 380px;
    max-height: 5000px;
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: flex-start; /* Asegura la alineación superior dentro de cada sección */

  }
  
  .view-section {
    text-align: left;
    align-self: center; /* Centra la sección verticalmente en el contenedor */
  }
  
  .edit-section {
    text-align: left;
    align-self: center; /* Centra la sección verticalmente en el contenedor */
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1em;
  }
  
  .form-group {
    margin-bottom: 1em;
  }
  
  label {
    font-size: 14px;
    color: #333;
    display: block;
    margin-bottom: 0.5em;
  }
  
  input, select {
    width: 100%;
    padding: 0.75em;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
  }
  
  input[disabled], select[disabled] {
    background-color: #f5f5f5;
  }
  
  .edit-button, .submit-button {
    width: 100%;
    padding: 0.75em;
    font-size: 16px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button {
    margin-top: 1em;
  }
  
  .edit-button {
    background-color: #000;
    margin-top: 1em;
    border: none;
    color: white;
  }
  
  .edit-button:hover {
    background-color: #333;
  }
  
  .submit-button:hover {
    background-color: #333;
  }
  
  .edit-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  
  .submit-button {
    width: auto;
    margin-top: 2em;
    padding: 0.75em 2em;
  }
  
  .edit-button {
    width: auto;
    margin-top: 2em;
    padding: 0.75em 2em;
  }
</style>

  
  