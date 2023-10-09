<script lang="ts">
export default {
  name: "Button",
  props: {
    text: String,
    color: String
  },
  methods: {
    onClick() {
      this.$emit('btn-click')
    }
  }
}
</script>

<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">{{ text }}</button>
</template>