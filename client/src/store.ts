import { acceptHMRUpdate, defineStore } from 'pinia'
import jwt_decode from 'jwt-decode'

interface TokenPayload {
  userId: string
  username: string
}

const getTokenFromStorage = (): string | null => localStorage.getItem('token')
const setTokenToStorage = (token: string): void => localStorage.setItem('token', token)
const removeTokenFromStorage = (): void => localStorage.removeItem('token')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    isAuth: false,
    userId: '',
    username: ''
  }),
  actions: {
    initialize(): void {
      const token = getTokenFromStorage()
      if (token) {
        try {
          this.token = token
          const payload = jwt_decode<TokenPayload>(token)
          this.userId = payload.userId
          this.username = payload.username
          this.isAuth = true
        } catch (error) {
          // Handle token decoding error
          console.error('Error decoding token:', error)
          this.unsetToken()
        }
      }
    },
    setToken(token: string): void {
      this.token = token
      setTokenToStorage(token)
      try {
        const payload = jwt_decode<TokenPayload>(token)
        this.userId = payload.userId
        this.username = payload.username
        this.isAuth = true
      } catch (error) {
        // Handle token decoding error
        console.error('Error decoding token:', error)
        this.unsetToken()
      }
    },
    unsetToken(): void {
      this.token = ''
      removeTokenFromStorage()
      this.userId = ''
      this.username = ''
      this.isAuth = false
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
