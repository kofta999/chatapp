<script lang="ts">
export default {
  name: 'Chat',
  props: {
    chat: Object
  }
}
</script>

<template>
  <div>
    <h3>{{ chat?.name }}</h3>
    <p>{{ chat?.lastMessage }}</p>
    <p>{{ chat?.participants.join(', ') }}</p>
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

.chat h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
