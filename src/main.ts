import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia();
import './registerServiceWorker'
import  Swal  from 'sweetalert2';
//import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'




createApp(App).use( pinia,Swal, VueAxios, axios).mount('#app')
