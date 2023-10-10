<script lang="ts">
import { RouterLink } from 'vue-router'
import Button from './Button.vue'
export default {
  name: 'Header',
  props: {
    isAuth: Boolean,
    username: String
  },
  components: {
    RouterLink,
    Button
  }
}
</script>

<template>
  <div>
    <header>
      <nav>
        <h1>Welcome, {{ username }}</h1>
        <Button
          class="btn"
          v-show="isAuth"
          @btn-click="$emit('logout')"
          text="Log Out"
        />
        <RouterLink v-show="!isAuth" to="/signup">Sign Up</RouterLink>
        <RouterLink v-show="!isAuth" to="/login">Login</RouterLink>
      </nav>
    </header>
  </div>
</template>
