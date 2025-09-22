<template>
    <div class="about-page">
        <h1>About Page</h1>
        
        <div class="counter-container">
            <h3>Counter Example</h3>
            <p>Current count: {{ counter.count }}</p>
            <p>Double count: {{ counter.doubleCount }}</p>
            <n-space>
                <n-button @click="counter.increment()" type="primary">
                    Increment
                </n-button>
                <n-button @click="resetCounter" type="error">
                    Reset
                </n-button>
            </n-space>
        </div>

        <n-button @click="gotoHome" type="tertiary">
            Home
        </n-button>
    </div>
</template>

<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../store/useCounterStore'

const router = useRouter()
const counter = useCounterStore()

const gotoHome = () => {
  router.push('/')
}

const resetCounter = () => {
  counter.reset()
}
</script>

<style scoped>
.about-page {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}
.counter-container {
    margin: 30px 0;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
}
</style>