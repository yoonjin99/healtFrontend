import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import './assets/tailwind.css'

// 생성한 뷰 라우터 받아오기
import routers from './router'

const app = createApp(App)
app.use(routers)  // router 추가
app.mount('#app')
app.provide('$axios', axios)

