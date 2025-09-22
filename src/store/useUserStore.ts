import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { UserInfo } from '../api/types/api'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    token: '',
    userInfo: null as UserInfo | null
  })

  // 设置token
  const setToken = (token: string) => {
    user.token = token
  }

  // 获取token
  const getToken = (): string => {
    return user.token
  }

  // 移除token
  const removeToken = () => {
    user.token = ''
    user.userInfo = null
  }

  // 设置用户信息
  const setUserInfo = (info: UserInfo) => {
    user.userInfo = info
  }

  return { 
    user,
    setToken,
    getToken,
    removeToken,
    setUserInfo
  }
}, {
  persist: true,
})