<script lang="ts">
import { sendAuthenticatedRequest } from '@/util'
import Button from './Button.vue'
import { useAuthStore } from '@/store'

export default {
  name: 'CreateChat',
  components: {
    Button
  },
  setup() {
    const store = useAuthStore()
    const userId = store.userId
    const username = store.username
    return { userId, username }
  },
  data() {
    return {
      name: '',
      currentUsername: '',
      isGroupChat: false,
      participantsVisual: [] as Array<string>,
      participants: [] as Array<any>
    }
  },
  methods: {
    async checkUserExists() {
      const res = await sendAuthenticatedRequest('api/search/username', 'POST', {
        username: this.currentUsername
      })
      const data = (await res.json()).data

      if (res.status === 200) {
        this.participantsVisual.push(this.currentUsername)
        this.participants.push(data._id)
      } else if (res.status === 404) {
        alert('User does not exist')
        return
      } else if (res.status === 403) {
        alert("You're adding yourself, pick another user")
        return
      }
      this.currentUsername = ''
    },
    async onSubmit(e: Event) {
      e.preventDefault()
      if (!this.name || this.participants.length === 0) {
        alert('Enter data correctly')
        return
      }
      const newChat = {
        name: this.name,
        isGroupChat: this.isGroupChat,
        participants: [this.userId, ...this.participants]
      }
      this.$emit('create-chat', newChat)

      this.name = ''
      this.isGroupChat = false
      this.participantsVisual = []
      this.participants = []
    }
  }
}
</script>

<template>
  <form @submit="onSubmit" id="createChatForm">
    <div class="form-control">
      <label for="name">Name:</label>
      <input v-model="name" type="text" id="name" name="name" required /><br />
    </div>

    <div class="form-control">
      <label for="currentUsername">Participants:</label>
      <input v-model="currentUsername" type="text" id="currentUsername" name="currentUsername" />
      <ul v-for="participant in participantsVisual">
        <li>{{ participant }}</li>
      </ul>
      <Button @btn-click="checkUserExists" text="Add" color="green" />
      <br />
    </div>

    <div class="form-control form-control-check">
      <label for="isGroupChat">Is Group Chat:</label>
      <input v-model="isGroupChat" type="checkbox" id="isGroupChat" name="isGroupChat" /><br />
    </div>

    <input type="submit" value="Create Chat" class="btn btn-block" />
  </form>
</template>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
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

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
