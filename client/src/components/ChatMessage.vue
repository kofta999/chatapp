<script lang="ts">
export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="chat-message">
    <div class="message-header">
      <span class="username">{{ message.sender }}</span>
      <span class="timestamp">{{ message.createdAt }}</span>
    </div>
    <div class="message-body">
      <p>{{ message.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.chat-message {
  background-color: #2d2d2d;
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.username {
  font-weight: bold;
  margin-right: 10px;
}

.timestamp {
  font-size: 12px;
}

.message-body {
  font-size: 14px;
}
</style>
