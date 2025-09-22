export default [
  {
    url: '/api/auth/login',
    method: 'post',
    timeout: 500,
    response: ({ body }) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          message: 'success',
          data: {
            token: 'MOCK_TOKEN_' + Math.random().toString(36).slice(2),
            userInfo: {
              userId: 1,
              username: 'admin',
              avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
            }
          }
        }
      }
      return {
        code: 401,
        message: '账号或密码错误'
      }
    }
  },
  {
    url: '/api/auth/logout',
    method: 'post',
    timeout: 200,
    response: () => {
      return {
        code: 200,
        message: '退出成功'
      }
    }
  }
]