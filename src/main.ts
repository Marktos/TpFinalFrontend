import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './router';  // Importa el router
import { createPinia } from 'pinia';

createApp(App)
  .use(router)  // Usa el router
  .use(createPinia())
  .mount('#app');
