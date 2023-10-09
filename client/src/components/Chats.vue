<script lang="ts">
import Chat from '@/components/Chat.vue'
export default {
  name: 'Chats',
  props: {
    chats: Array<any>
  },
  components: {
    Chat
  },
  methods: {
    
  }
}
</script>

<template>
  <div :key="chat.id" v-for="chat in chats">
    <Chat :chat="chat" />
  </div>
</template>
