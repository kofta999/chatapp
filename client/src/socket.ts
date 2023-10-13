import { eventBus } from '@/eventBus'
import { io } from 'socket.io-client'
import { useAuthStore } from '@/store'

const URL = import.meta.env.DEV ? 'http://localhost:3000' : ''

export const socket = io(URL + '/chat', {
  autoConnect: false
})

socket.on('connect', () => {
  const store = useAuthStore()
  console.log('connected')
  store.connected = true
})

// TODO:
// disconnect from room after returning to chats page?
socket.on('disconnect', () => {
  const store = useAuthStore()
  store.connected = false
})

socket.on('receiveMessage', (message) => {
  console.log('received msg')
  eventBus.emit('receiveMessage', message)
})
