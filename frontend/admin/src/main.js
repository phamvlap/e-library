import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App.vue';
import router from '@/router/index.js';
import '@/assets/css/main.css';

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).use(Vue3Toastify).mount('#app');
