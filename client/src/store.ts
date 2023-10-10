import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    isAuth: !!localStorage.getItem('token')
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
      this.isAuth = true
    },
    unsetToken() {
      this.token = ''
      localStorage.removeItem('token')
      this.isAuth = false
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
