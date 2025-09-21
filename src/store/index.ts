// 需要先安装pinia依赖: npm install pinia
import { createPinia } from 'pinia'
// 需要先安装持久化插件: npm install pinia-plugin-persistedstate
import piniaPluginPersist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

export default pinia