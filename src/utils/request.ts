
import axios from 'axios'
import { getToken } from './auth'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.sensemore.cn'
console.log('API Base URL:', baseURL)

const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token && config.headers) {
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
    
    // 假设API返回格式为 { code: 200, message: '', data: ... }
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
