<script lang="ts">
export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async signUp(e: Event) {
      e.preventDefault()
      if (!(this.username && this.email && this.password)) {
        alert('Please enter correct data')
        return
      }
      const res = await fetch('api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password
        })
      })
      if (res.status !== 200) {
        alert('Please enter correct data')
      }
      const data = await res.json()

      console.log(data)

      this.username = ''
      this.email = ''
      this.password = ''
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <form @submit="signUp" class="signup-form">
    <div class="form-control">
      <label for="username">Username:</label>
      <input v-model="username" type="text" id="username" name="username" required /><br />
    </div>
    <div class="form-control">
      <label for="email">Email:</label>
      <input v-model="email" type="email" id="email" name="email" required /><br />
    </div>

    <div class="form-control">
      <label for="password">Password:</label>
      <input v-model="password" type="password" id="password" name="password" required /><br />
    </div>

    <input type="submit" value="Signup" class="btn btn-block" />
  </form>
</template>

<style scoped>
.signup-form {
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
