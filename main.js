import Vue from 'vue'
import App from './App'
import store from './store'
// 引入插件
import request from './common/request/request.js'

// 全局配置
request.setConfig({
  baseUrl: '', 
})
// 设置请求拦截器
request.interceptors.request(config => {
  return config; // 返回修改后的配置，如未修改也需添加这行
})
request.interceptors.response(res => {
	console.log(res)
  return res; // data返回
})
Vue.prototype.$request = request;

Vue.prototype.$store = store

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
