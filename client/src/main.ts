// TODO:
// 1- Work more on socket.ts
// 1- Add when a new message is sent, the chat component reacts to it
// 2- Prettify chatMessage in chatMessage component
// 3- Remove unnecessary clgs
// 4- Work on how to implement group chats
// 5- Separate private and group chats in both backend and UI (socket joins its own room)
// 6- Improve UI and add more features to backend
// 7- Auto logout when token expires
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/store'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

// Initialize the store after creating it
const authStore = useAuthStore()
authStore.initialize()
