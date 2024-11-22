<template>
  <div class="account-page">
    <!-- Barra de navegación superior -->
    <nav class="navbar">
      <div class="logo">LockItem</div>
      <ul class="nav-links">
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/search">Search</router-link></li>
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
      <div class="view-section" v-if="!isEditMode">
        <img :src="profileImage" alt="Profile Image" class="profile-image" />
        <form @submit.prevent>
          <div class="form-group">
            <label>Username</label>
            <input type="text" :value="user.username" disabled />
          </div>
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" :value="`${user.name} ${user.lastname}`" disabled />
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" :value="user.email" disabled />
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
            <label>Username</label>
            <input type="text" v-model="editableUser.username" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="editableUser.password" placeholder="Enter new password or leave blank" />
          </div>
          <div class="form-group">
            <label>First Name</label>
            <input type="text" v-model="editableUser.name" />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" v-model="editableUser.lastname" />
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" v-model="editableUser.email" />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" v-model="editableUser.phone" />
          </div>
          <button type="submit" class="submit-button">Save Changes</button>
          <button @click="toggleEditMode" class="cancel-button">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import profileImage from '@/assets/profile-placeholder.png';
import axios from 'axios';

export default {
  name: 'Account',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {}, // Carga los datos del usuario desde localStorage
      editableUser: {},
      isEditMode: false,
      profileImage,
    };
  },
  mounted() {
    this.editableUser = { ...this.user, password: '' }; // Prepara los datos para la edición, agregando el campo de contraseña
  },
  methods: {
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
    async saveChanges() {
      try {
        const token = localStorage.getItem('authToken');
        const userId = this.user.id; // Verifica si user.id es correcto
        console.log('Token:', token);
        console.log('User ID:', userId);

        const updatedData = { ...this.editableUser };

        // Si el campo de contraseña está vacío, no lo envíes
        if (!updatedData.password) {
          delete updatedData.password;
        }

        console.log('Updated Data:', updatedData);

        const response = await axios.put(
          `https://lockitem-abaje5g7dagcbsew.canadacentral-01.azurewebsites.net/api/v1/users/${userId}`,
          updatedData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.user = { ...response.data };
        localStorage.setItem('user', JSON.stringify(this.user));
        this.isEditMode = false;

        console.log('User updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message);
        alert('Failed to update user. Please try again.');
      }
    },
    logout() {
      localStorage.removeItem('authToken'); // Elimina el token de localStorage
      localStorage.removeItem('user'); // Elimina los datos del usuario
      this.$router.push('/login'); // Redirige al inicio de sesión
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
  width: 100vw;
  /* Asegura que la barra ocupe todo el ancho de la ventana */
  box-sizing: border-box;
  /* Incluye padding en el ancho total */
  position: fixed;
  /* Fija la barra en la parte superior */
  top: 0;
  left: 0;
  z-index: 1000;
  /* Asegura que la barra quede sobre el contenido */
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
  margin-top: 80px;
  /* Ajuste para la barra de navegación fija */
}

.header {
  display: flex;
  justify-content: space-between;
  width: 80%;
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
  flex-direction: row;
  /* Asegura que las secciones estén en fila */
  justify-content: space-between;
  /* Separa horizontalmente */
  align-items: stretch;
  /* Asegura que ambas secciones tengan la misma altura */
  gap: 2em;
  /* Espaciado entre secciones */
  width: 100%;
  max-width: 900px;
  /* Ajusta el ancho máximo del contenedor */
  margin: 0 auto;
  /* Centra el contenedor */
}

.view-section,
.edit-section {
  flex: 1;
  width: 100%;
  /* Full width of the parent container */
  max-width: none;
  /* Remove max-width constraint */
  text-align: left;
}

.view-section {
  text-align: left;
  align-self: center;
  /* Centra la sección verticalmente en el contenedor */
}

.edit-section {
  text-align: left;
  align-self: center;
  /* Centra la sección verticalmente en el contenedor */
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1em;
}

.form-group {
  width: 100%;
  /* Make the group fill the section width */
  margin-bottom: 1em;
}

label {
  font-size: 14px;
  color: #333;
  display: block;
  margin-bottom: 0.5em;
}

input,
select {
  width: 100%;
  /* Ensure input and select take full width */
  padding: 0.75em;
  /* Add padding for better UX */
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  /* Include padding and border in width calculation */
}

input[disabled],
select[disabled] {
  background-color: #f5f5f5;
}

.edit-button,
.submit-button {
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