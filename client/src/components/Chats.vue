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
  <div :key="chat._id" v-for="chat in chats">
    <Chat @onClick="$router.push(`/chats/${chat._id}`)" :chat="chat" />
  </div>
</template>
