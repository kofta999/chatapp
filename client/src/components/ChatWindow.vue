<script lang="ts">
import ChatMessage from '@/components/ChatMessage.vue'

export default {
  name: 'ChatWindow',
  components: {
    ChatMessage,
  },
  props: {
    messages: Array<any>
  }
}
</script>

<template>
  <div v-if="messages!.length > 0">
    <ChatMessage v-for="(message, index) in messages" :key="index" :message="message" />
  </div>
  <div v-else>
    <h1>No messages in Chat</h1>
  </div>
</template>
