/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'pinia-plugin-persistedstate' {
  import { PiniaPlugin } from 'pinia'
  export const piniaPluginPersist: PiniaPlugin
  export default piniaPluginPersist
}