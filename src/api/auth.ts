import request from '@/utils/request'
import type { 
  LoginParams, 
  LoginResult, 
  UserInfo, 
  LogoutResult, 
  CaptchaResult 
} from '@/api/types/api'

const API_PREFIX = '/api/auth'

/**
 * 用户登录
 * @param data 登录参数
 * @returns 登录结果
 * @throws 当登录失败时抛出错误
 */
export const login = (data: LoginParams) => {
  return request.post<LoginResult>(`${API_PREFIX}/login`, data)
}

/**
 * 用户登出
 * @returns 登出结果
 * @throws 当登出失败时抛出错误
 */
export const logout = () => {
  return request.post<LogoutResult>(`${API_PREFIX}/logout`)
}

/**
 * 获取用户信息
 * @returns 用户信息
 * @throws 当获取用户信息失败时抛出错误
 */
export const getUserInfo = () => {
  return request.get<UserInfo>(`${API_PREFIX}/userinfo`)
}

/**
 * 刷新token
 * @returns 新的token
 * @throws 当刷新token失败时抛出错误
 */
export const refreshToken = () => {
  return request.post<LoginResult>(`${API_PREFIX}/refresh`)
}

/**
 * 获取验证码
 * @returns 验证码信息
 * @throws 当获取验证码失败时抛出错误
 */
export const getCaptcha = () => {
  return request.get<CaptchaResult>(`${API_PREFIX}/captcha`)
}