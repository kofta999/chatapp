<script lang="ts">
import { eventBus } from '@/eventBus'

export default {
  name: 'Chat',
  props: {
    chat: {
      type: Object,
      required: true
    }
  },
  created() {
    eventBus.on('receiveMessage', (message) => {
      console.log('got message on chat component')
      this.chat.lastMessage = message
    })
  },
  computed: {
    lastMessage() {
      return this.chat.lastMessage?.content
    },
    lastMessageSender() {
      return this.chat.lastMessage?.sender.username
    },
    lastMessageDate() {
      return new Date(this.chat.lastMessage?.updatedAt).toLocaleString('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      })
    }
  },
  emits: ['onClick']
}
</script>

<template>
  <div @click="$emit('onClick')" class="chat">
    <h1>{{ chat.name }}</h1>
    <p v-if="lastMessage">
      {{ lastMessageSender }}: {{ lastMessage }}
      <span class="message-date">{{ lastMessageDate }}</span>
    </p>
    <p v-else>Created chat</p>
  </div>
</template>

<style scope>
.fas {
  color: red;
}

.chat {
  background: #121212;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.chat h1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.message-date {
  float: right;
}
</style>
