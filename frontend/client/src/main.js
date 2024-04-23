import { createApp } from 'vue';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App.vue';
import router from '@/router/index.js';
import '@/assets/css/main.css';

createApp(App).use(router).use(Vue3Toastify).mount('#app');
