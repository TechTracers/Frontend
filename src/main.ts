import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index'; // Asegúrate de que está importando el archivo de rutas correctamente

const app = createApp(App);

app.use(router); // Usa el router en la aplicación

app.mount('#app');
