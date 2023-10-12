<script lang="ts">
import ChatWindow from '@/components/ChatWindow.vue'
import ChatBox from '@/components/ChatBox.vue'
import { sendAuthenticatedRequest } from '@/util'
import { socket } from '@/socket'
import { eventBus } from '@/eventBus'

export default {
  name: 'ChatView',
  components: {
    ChatWindow,
    ChatBox
  },
  mounted() {},
  data() {
    return {
      messages: [] as Array<any>
    }
  },
  async created() {
    const { chatId } = this.$route.params
    socket.emit('getMessages', chatId)
    const res = await sendAuthenticatedRequest(`/api/chats/${chatId}`, 'GET')
    if (res.status !== 200) {
      alert('Error happened while loading messages')
      return
    }
    const data = await res.json()
    console.log(data)
    this.messages = data.data

    eventBus.on('receiveMessage', (message) => {
      console.log('got message on component')
      this.messages.push(message)
    })
  },
  methods: {
    async sendMessage(message: string) {
      console.log('sending message')
      const { chatId } = this.$route.params
      const res = await sendAuthenticatedRequest(`/api/chats/${chatId}`, 'POST', {
        content: message,
        chatId
      })
      console.log(res.status)
      if (res.status !== 201) {
        alert('Error happened while sending the message')
      }

      const data = await res.json()
      socket.emit('sendMessage', { message: data.data, roomId: chatId })
      this.messages = [...this.messages, data.data]
    }
  }
}
</script>

<template>
  <ChatWindow :messages="messages" />
  <ChatBox @sendMessage="sendMessage" />
</template>
