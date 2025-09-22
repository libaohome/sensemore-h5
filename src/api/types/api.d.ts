export interface LoginParams {
  username: string
  password: string
  captcha?: string
}

export interface LoginResult {
  code: number
  message: string
  data: {
    token: string
    userInfo: {
      userId: number
      username: string
      avatar: string
    }
  }
}

export interface UserInfo {
  code: number
  message: string
  data: {
    userId: number
    username: string
    avatar: string
    email?: string
    phone?: string
  }
}

export interface LogoutResult {
  code: number
  message: string
}

export interface CaptchaResult {
  code: number
  message: string
  data: {
    captchaId: string
    captchaImage: string
  }
}
