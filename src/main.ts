import './assets/style.css'

// import { createApp } from 'vue'
// import router from './router'
// import pinia from './store'
// import App from './App.vue'

// createApp(App).use(router).use(pinia).mount('#app')


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // 引入插件

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 注册插件
app.use(pinia)
app.use(router)
app.mount('#app')

router.beforeEach((to, _from, next) => {
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title;
  } else {
    document.title = '默认标题';
  }
  next();
});