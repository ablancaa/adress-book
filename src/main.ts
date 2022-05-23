import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia();
import './registerServiceWorker'

//import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'




createApp(App).use( pinia, VueAxios, axios).mount('#app')
