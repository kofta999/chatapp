<script lang="ts">
export default {
  name: 'Button',
  props: {
    text: String,
    color: String
  },
  emits: ['btn-click'],
  methods: {
    onClick() {
      this.$emit('btn-click')
    }
  }
}
</script>

<template>
  <button @click="onClick()" type="button" :style="{ background: color }" class="btn">{{ text }}</button>
</template>
