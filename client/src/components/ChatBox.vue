<script lang="ts">
import Button from './Button.vue'

export default {
  name: 'ChatBox',
  data() {
    return {
      message: ''
    }
  },
  components: {
    Button
  },
  methods: {
    sendMessage() {
      console.log(this.message)
      this.$emit('sendMessage', this.message)
      this.message = ''
    }
  },
  emits: ['sendMessage']
}
</script>

<template>
  <div class="chat-form">
    <div class="form-control">
      <input type="text" v-model="message" placeholder="Type your message..." />
      <Button @btn-click="sendMessage" text="Send" />
    </div>
  </div>
</template>

<style scoped>
.chat-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
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
</style>
