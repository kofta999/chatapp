<script lang="ts">
import { useAuthStore } from '@/store'

export default {
  name: 'LoginForm',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login(e: Event) {
      e.preventDefault()
      if (!(this.email && this.password)) {
        alert('Please enter correct data')
        return
      }

      console.log(this.email, this.password)
      const res = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })

      if (res.status !== 200) {
        alert('Error happened while fetching from server')
      }

      const data = await res.json()

      this.authStore.setToken(data.data.token)
      this.$router.push('/chats')
    }
  }
}
</script>

<template>
  <form @submit="login" class="login-form">
    <div class="form-control">
      <label for="email">Email:</label>
      <input v-model="email" type="email" id="email" name="email" required /><br />
    </div>

    <div class="form-control">
      <label for="password">Password:</label>
      <input v-model="password" type="password" id="password" name="password" required /><br />
    </div>

    <input type="submit" value="Login" class="btn btn-block" />
  </form>
</template>

<style scoped>
.login-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  background: #1f1f1f;
  color: antiquewhite;
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
