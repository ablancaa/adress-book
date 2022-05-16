import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './registerServiceWorker'

import router from './router'
import { Vue } from 'vue-demi'

const pinia = createPinia()
createApp(App).use(router, pinia).mount('#app')
