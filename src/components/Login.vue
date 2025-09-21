<template>
  <div class="login-container">
    <div class="login-form">
      <h2>用户登录</h2>
      <div class="api-status">
        <p class="status-info">真实API模式：{{ isApiAvailable ? '可用' : '不可用' }}</p>
        <p class="demo-info" v-if="!isApiAvailable">使用用户名：admin，密码：123456 进行模拟登录</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-item">
          <label>用户名：</label>
          <input 
            v-model="loginForm.username" 
            type="text" 
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-item">
          <label>密码：</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="请输入密码"
            required
          />
        </div>
        <div class="form-item" v-if="captchaImage">
          <label>验证码：</label>
          <div class="captcha-container">
            <input 
              v-model="loginForm.captcha" 
              type="text" 
              placeholder="请输入验证码"
            />
            <img 
              :src="captchaImage" 
              @click="loadCaptcha"
              alt="验证码"
              class="captcha-image"
            />
          </div>
        </div>
        <button type="submit" :loading="loading" class="login-button">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-if="userInfo" class="user-info">
        <h3>登录成功！</h3>
        <p>用户ID: {{ userInfo.userId }}</p>
        <p>用户名: {{ userInfo.username }}</p>
        <button @click="handleLogout" class="logout-button">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { login, logout, getCaptcha } from '../api/auth'
import { setToken, removeToken } from '../utils/auth'
import type { LoginParams, LoginResult, UserInfo as UserInfoType } from '../types/api'

const loading = ref(false)
const error = ref('')
const captchaImage = ref('')
const userInfo = ref<UserInfoType['data'] | null>(null)
const isApiAvailable = ref(true)

const loginForm = reactive<LoginParams>({
  username: '',
  password: '',
  captcha: ''
})

// 加载验证码
const loadCaptcha = async () => {
  try {
    const res = await getCaptcha()
    if (res.code === 200) {
      captchaImage.value = res.data.captchaImage
    }
  } catch (err) {
    console.error('加载验证码失败:', err)
    // 如果API不可用，显示一个占位验证码
    captchaImage.value = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSIjMDAwIj4xMjM0PC90ZXh0Pjwvc3ZnPg=='
    isApiAvailable.value = false
  }
}

// 处理登录
const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    alert('请输入用户名和密码')
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const res: LoginResult = await login(loginForm)
    if (res.code === 200) {
      // 保存token
      setToken(res.data.token)
      
      // 保存用户信息
      userInfo.value = res.data.userInfo
      
      alert('登录成功！')
      
      // 清空表单
      loginForm.password = ''
      loginForm.captcha = ''
    } else {
      error.value = res.message
      alert(res.message || '登录失败')
      
      // 重新加载验证码
      if (res.code === 400) {
        loadCaptcha()
      }
    }
  } catch (err: any) {
    // 如果API不可用，提供模拟登录体验
    console.error('登录请求失败:', err)
    isApiAvailable.value = false
    if (loginForm.username === 'admin' && loginForm.password === '123456') {
      // 模拟成功登录
      const mockToken = 'mock-token-' + Date.now()
      setToken(mockToken)
      userInfo.value = {
        userId: 1,
        username: 'admin',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      }
      alert('登录成功！(模拟模式)')
      loginForm.password = ''
      loginForm.captcha = ''
    } else {
      error.value = '用户名或密码错误'
      alert('用户名或密码错误')
    }
  } finally {
    loading.value = false
  }
}

// 处理登出
const handleLogout = async () => {
  try {
    const res = await logout()
    if (res.code === 200) {
      removeToken()
      userInfo.value = null
      alert('退出登录成功！')
    }
  } catch (err) {
    console.error('退出登录失败:', err)
    // 如果API不可用，仍然执行本地登出
    removeToken()
    userInfo.value = null
    alert('退出登录成功！(模拟模式)')
  }
}

onMounted(() => {
  // 页面加载时检查是否已登录
  const token = localStorage.getItem('token')
  if (token) {
    // 这里可以调用获取用户信息的接口
    // 为了演示，我们假设token有效
  }
  
  // 加载验证码
  loadCaptcha()
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.login-form {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.api-status {
  margin-bottom: 20px;
  padding: 10px;
  background: #f0f8ff;
  border-radius: 4px;
  border-left: 4px solid #4CAF50;
}

.status-info {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.demo-info {
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #ff6b6b;
  font-weight: 500;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-weight: 500;
}

.form-item input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-item input:focus {
  outline: none;
  border-color: #4CAF50;
}

.captcha-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.captcha-container input {
  flex: 1;
}

.captcha-image {
  height: 40px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-button, .logout-button {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover, .logout-button:hover {
  background: #45a049;
}

.login-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  text-align: center;
  margin-top: 15px;
  padding: 10px;
  background: #ffebee;
  border-radius: 4px;
}

.user-info {
  background: #e8f5e8;
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px;
}

.user-info h3 {
  color: #4CAF50;
  margin-bottom: 15px;
}

.user-info p {
  margin: 8px 0;
  color: #333;
}
</style>