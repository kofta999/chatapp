<script lang="ts">
import Chats from '@/components/Chats.vue'
import Button from '@/components/Button.vue'
import { sendAuthenticatedRequest } from '@/util'
import CreateChat from '@/components/CreateChat.vue'
import { socket } from '@/socket'

export default {
  name: 'ChatsView',
  data() {
    return {
      chats: [] as Array<any>,
      showCreateChat: false
    }
  },
  async created() {
    this.chats = await this.fetchChats()
    const chatIds = this.chats.map((chat) => chat._id)
    socket.emit('joinRooms', chatIds)
  },
  components: {
    Chats,
    Button,
    CreateChat
  },
  methods: {
    async fetchChats() {
      const data = await (await sendAuthenticatedRequest('api/chats', 'GET')).json()
      console.log(data)
      return data.data
    },
    toggleCreateChat() {
      this.showCreateChat = !this.showCreateChat
    },
    async createChat(chat: object) {
      const data = await sendAuthenticatedRequest('api/chats', 'POST', chat)
      console.log(data)
      this.chats = [...this.chats, chat]
    }
  }
}
</script>

<template>
  <main>
    <Button @btn-click="toggleCreateChat" text="Create Chat" color="green" />
    <CreateChat v-show="showCreateChat" @create-chat="createChat" />
    <Chats :chats="chats" />
  </main>
</template>
