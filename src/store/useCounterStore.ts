import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
    console.log('Counter incremented to:', count.value)
  }

  function reset() {
    count.value = 0
    console.log('Counter reset to 0')
  }

  // 初始化时打印当前值
  console.log('Counter initialized with:', count.value)

  return { count, doubleCount, increment, reset }
}, {
  persist: true
})
