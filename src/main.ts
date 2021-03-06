import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import router from './router'
import { toLine } from './utils'
// import mUI from './components'
import mUI from '../lib/mook-element-components.es'
import '../lib/style.css'
const app = createApp(App)
import './mock'

// 全局注册图标 牺牲一点性能
for (let i in Icons) {
  // 注册全部组件
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

app.use(router).use(ElementPlus).use(mUI)
app.mount('#app')
