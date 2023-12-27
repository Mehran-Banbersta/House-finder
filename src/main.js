import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores/store'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '../src/assets/fontawesome.js' 

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(store)

app.mount('#app')
