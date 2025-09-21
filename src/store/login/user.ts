import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null
  }),
  persist: {
    enabled: true
  },
  actions: {
    setToken(token: string) {
      this.token = token
    }
  }
})
