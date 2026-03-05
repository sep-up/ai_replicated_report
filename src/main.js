/*
 * @Author: piaopiao.huang
 * @Date: 2021-12-30 09:30:31
 * @LastEditTime: 2023-08-15 10:10:21
 * @LastEditors: chenzejie
 * @Description: In User Settings Edit
 */
import Vue from 'vue'
import Vant from 'vant'
import App from './App'
import store from './store'
import router from './router'
import '@/assets/css/index.scss'
import '@/utils/element-ui.js'
import 'element-ui/lib/theme-chalk/index.css'
import permission from '@/directive/permission/index.js'
import Vconsole from 'vconsole'
import 'vant/lib/index.css'
Vue.use(Vant)

new Vconsole()
import help from '@/utils/help'
window.time = help.time
// 阻止显示生产模式的消息
Vue.config.productionTip = false
Vue.use(permission)

if (process.env.NODE_ENV === 'production') {
  window.addEventListener('flutterInAppWebViewPlatformReady', function(event) {
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  })
} else {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
