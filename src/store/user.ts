// stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '', // 用户Token
    userInfo: { name: '', avatar: '' }, // 用户信息
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(info: { name: string; avatar: string }) {
      this.userInfo = info;
    },
  },
  persist: true, // 开启持久化（默认存储至localStorage）
});