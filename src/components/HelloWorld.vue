<script setup>
import { NButton, NSpace } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const gotoAbout = () => {
  router.push('/about')
}

const gotoChat = () => {
  router.push('/chat')
}

</script>

<template>
  <div class="hello-world">
    <h1>Hello World</h1>
    <n-space>
      <n-button @click="gotoAbout">About页面</n-button>
      <n-button @click="gotoChat" type="tertiary">
        chat
      </n-button>
      <n-button type="primary">
        Primary
      </n-button>
      <n-button type="info">
        Info
      </n-button>
      <n-button type="success">
        Success
      </n-button>
      <n-button type="warning">
        Warning
      </n-button>
      <n-button type="error">
        Error
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>

</style>