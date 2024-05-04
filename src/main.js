import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/styles/common.less'
import Vant from 'vant'
import 'vant/lib/index.css'
// // 插件初始化：内部将所有vant组件进行导入
Vue.use(Vant)

Vue.config.productionTip = false

// 按需导入

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
