import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../components/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/login',
    component: () => import('../components/Login.vue'),
    meta: { title: '登录' }
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})