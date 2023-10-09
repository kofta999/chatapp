import { reactive } from 'vue'

export const store = reactive({
  token: '',
  getToken() {
    return this.token
  },
  setToken(token: string) {
    this.token = token
  },
  unsetToken(token: string) {
    this.token = ''
  }
})
