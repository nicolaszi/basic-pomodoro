import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

require('@/assets/css/main.scss');

createApp(App).use(router).mount('#app')
