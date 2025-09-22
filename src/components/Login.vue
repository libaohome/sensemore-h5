<template>
  <div class="login-container">
    <n-card class="login-form" title="用户登录" size="large">
      <n-alert 
        :type="isApiAvailable ? 'success' : 'warning'" 
        :title="`真实API模式：${isApiAvailable ? '可用' : '不可用'}`"
        style="margin-bottom: 20px;"
      >
        <template v-if="!isApiAvailable">
          使用用户名：admin，密码：123456 进行模拟登录
        </template>
      </n-alert>

      <n-form 
        ref="formRef" 
        :model="loginForm" 
        :rules="rules"
        @submit.prevent="handleLogin"
      >
        <n-form-item label="用户名" path="username">
          <n-input 
            v-model:value="loginForm.username" 
            placeholder="请输入用户名"
            size="large"
          />
        </n-form-item>
        
        <n-form-item label="密码" path="password">
          <n-input 
            v-model:value="loginForm.password" 
            type="password" 
            placeholder="请输入密码"
            size="large"
            show-password-on="click"
          />
        </n-form-item>
        
        <n-form-item v-if="captchaImage" label="验证码" path="captcha">
          <n-space>
            <n-input 
              v-model:value="loginForm.captcha" 
              placeholder="请输入验证码"
              size="large"
              style="flex: 1;"
            />
            <n-image 
              :src="captchaImage" 
              @click="loadCaptcha"
              alt="验证码"
              width="100"
              height="40"
              style="cursor: pointer; border: 1px solid #d9d9d9; border-radius: 4px;"
            />
          </n-space>
        </n-form-item>
        
        <n-form-item>
          <n-button 
            type="primary" 
            size="large" 
            block 
            :loading="loading"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </n-button>
        </n-form-item>
      </n-form>
      
      <n-alert v-if="error" type="error" :title="error" style="margin-top: 15px;" />
      
      <n-card v-if="userInfo" title="登录成功！" type="success" style="margin-top: 20px;">
        <n-descriptions :column="1" bordered>
          <n-descriptions-item label="用户ID">
            {{ userInfo.userId }}
          </n-descriptions-item>
          <n-descriptions-item label="用户名">
            {{ userInfo.username }}
          </n-descriptions-item>
        </n-descriptions>
        <n-button 
          type="error" 
          size="large" 
          block 
          @click="handleLogout"
          style="margin-top: 15px;"
        >
          退出登录
        </n-button>
      </n-card>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { 
  NCard, 
  NAlert, 
  NForm, 
  NFormItem, 
  NInput, 
  NButton, 
  NSpace, 
  NImage, 
  NDescriptions, 
  NDescriptionsItem,
  useMessage,
  type FormInst,
  type FormRules
} from 'naive-ui'
import { login, logout, getCaptcha } from '../api/auth'
import { setToken, removeToken } from '../utils/auth'
import type { LoginParams, LoginResult, UserInfo as UserInfoType } from '../api/types/api'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
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

// 表单验证规则
const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
}

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
    captchaImage.value = "1234"
    isApiAvailable.value = false
  }
}

// 处理登录
const handleLogin = async () => {
  // 验证表单
  if (!formRef.value) return
  try {
    await formRef.value.validate()
  } catch (errors) {
    message.error('请填写完整的登录信息')
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
      
      message.success('登录成功！')
      
      // 清空表单
      loginForm.password = ''
      loginForm.captcha = ''
    } else {
      error.value = res.message
      message.error(res.message || '登录失败')
      
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
      message.success('登录成功！(模拟模式)')
      loginForm.password = ''
      loginForm.captcha = ''
    } else {
      error.value = '用户名或密码错误'
      message.error('用户名或密码错误')
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
      message.success('退出登录成功！')
    }
  } catch (err) {
    console.error('退出登录失败:', err)
    // 如果API不可用，仍然执行本地登出
    removeToken()
    userInfo.value = null
    message.success('退出登录成功！(模拟模式)')
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-form {
  width: 100%;
  max-width: 450px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}
</style>