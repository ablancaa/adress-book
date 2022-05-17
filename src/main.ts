import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './registerServiceWorker'

import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const pinia = createPinia()
createApp(App).use(router, pinia, VueAxios, axios).mount('#app')
