<script lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useAuthStore } from './store'
import { socket } from './socket'

export default {
  name: 'App',
  components: {
    RouterView,
    Header
  },
  setup() {
    const store = useAuthStore()
    const unsetToken = store.unsetToken
    const isAuth = computed(() => store.isAuth) // Make isAuth reactive
    const username = computed(() => store.username)

    return { isAuth, username, unsetToken }
  },
  methods: {
    logout() {
      this.unsetToken()
      socket.disconnect()
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <Header @logout="logout" :is-auth="isAuth" :username="username" />
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
