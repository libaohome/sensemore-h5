<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import { RouterView } from 'vue-router'

</script>

<template>
  <NMessageProvider>
    <RouterView />
  </NMessageProvider>
</template>

<style scoped>
#app {
  max-width: 750px;
  margin: 0 auto;
  font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>
