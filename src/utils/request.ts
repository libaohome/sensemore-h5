
import axios from 'axios'
import { useUserStore } from '../store/useUserStore'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.sensemore.cn'
console.log('API Base URL:', baseURL)

const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('Request:', config)
    const token = useUserStore().getToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    console.log('Response:', res)
    // 假设API返回格式为 { code: 200, message: '', data: ... }
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res // 返回完整响应结构
  },
  (error) => {
    console.error('Error in response:', error)
    return Promise.reject(error)
  }
)

export default service
