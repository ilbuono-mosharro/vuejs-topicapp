import { createApp } from 'vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')