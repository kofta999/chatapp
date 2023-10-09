<script lang="ts">

export default {
  name: 'CreateChat',
  data() {
    return {
      name: '',
      isGroupChat: false,
      participants: ''
    }
  },
  methods: {
    async onSubmit(e: Event) {
      e.preventDefault()
      console.log(this.name, this.isGroupChat, this.participants)
      if (!(this.name && this.participants)) {
        alert('Enter data correctly')
        return
      }
      const participants = this.participants.split(',').map((participant) => participant.trim())
      const newChat = {
        name: this.name,
        isGroupChat: this.isGroupChat,
        participants
      }
      this.$emit('create-chat', newChat)

      this.name = ''
      this.isGroupChat = false
      this.participants = ''
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
      <label for="participants">Participants:</label>
      <input
        v-model="participants"
        type="text"
        id="participants"
        name="participants"
        required
      /><br />
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
