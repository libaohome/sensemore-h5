import { createApp } from 'vue'
import router from './router'
import pinia from './store'
import './style.css'
import App from './App.vue'

createApp(App).use(router).use(pinia).mount('#app')

router.beforeEach((to, _from, next) => {
    if (to.meta.title && typeof to.meta.title === 'string') {
      document.title = to.meta.title;
    } else {
      document.title = '默认标题';
    }
    next();
  });