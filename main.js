// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//导入 store 实例对象并挂载到 Vue 的实例上
import store from './store/store.js'
// 导入网络请求的包
import {
  $http
} from '@escook/request-miniprogram'

Vue.config.productionTip = false

App.mpType = 'app'

uni.$http = $http
//配置请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'

//请求开始之前做一些时期
$http.beforeRequest = function(option) {
  uni.showLoading({
    title: '数据加载中~~',
  })
}

//请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}

// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}

const app = new Vue({
  ...App,
  // 将 store 挂载到 Vue 实例上
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
