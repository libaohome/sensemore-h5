import request from '@/utils/request'
import type { 
  LoginParams, 
  LoginResult, 
  UserInfo, 
  LogoutResult, 
  CaptchaResult 
} from '@/types/api'

/**
 * 用户登录
 * @param data 登录参数
 * @returns 登录结果
 */
export const login = (data: LoginParams) => {
  return request.post<LoginResult>('/api/auth/login', data)
}

/**
 * 用户登出
 * @returns 登出结果
 */
export const logout = () => {
  return request.post<LogoutResult>('/api/auth/logout')
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const getUserInfo = () => {
  return request.get<UserInfo>('/api/auth/userinfo')
}

/**
 * 刷新token
 * @returns 新的token
 */
export const refreshToken = () => {
  return request.post<LoginResult>('/api/auth/refresh')
}

/**
 * 获取验证码
 * @returns 验证码信息
 */
export const getCaptcha = () => {
  return request.get<CaptchaResult>('/api/auth/captcha')
}