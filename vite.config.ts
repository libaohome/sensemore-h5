import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: {
      sourcemap: true // 生成完整的source map
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: env.VITE_MOCK_PATH || 'mock',
        enable: command === 'serve' && mode !== 'production' && (env.VITE_USE_MOCK === 'true'),
        logger: Boolean(env.VITE_DEBUG)
      })
    ],
  }
})
