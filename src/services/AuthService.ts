// src/services/AuthService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
  async login(email: string, password: string) {
    const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
    if (response.data.length > 0) {
      const user = response.data[0];
      return user; // Retornamos el usuario directamente
    } else {
      throw new Error('Invalid email or password');
    }
  },

  async register(userData: object) {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  },

  logout() {
    localStorage.removeItem('user'); 
  }
};
