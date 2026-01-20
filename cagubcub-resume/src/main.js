// Prevent theme flash
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.body.classList.add('dark')
}

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
