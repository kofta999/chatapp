<script lang="ts">
export default {
  name: 'Chat',
  props: {
    chat: Object
  },
  emits: ["onClick"]
}
</script>

<template>
  <div @click="$emit('onClick')" class="chat">
    <h1>{{ chat?.name }}</h1>
    <p>{{ chat?.lastMessage }}</p>
    <!-- <p>{{ chat?.participants.join(', ') }}</p> -->
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
</style>
