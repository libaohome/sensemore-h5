<script setup lang="ts">
import { NButton, NDataTable } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const columns = [
  { title: 'ID', key: 'id' },
  { title: '名称', key: 'name' }
]
const data = ref([{ id: 1, name: '示例数据' }])

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">SenseMore H5 应用</h1>
    <div class="mb-4">
      <NButton type="primary" @click="goToLogin">前往登录页面</NButton>
    </div>
    <NDataTable class="mt-4" :columns="columns" :data="data" />
  </div>
</template>
