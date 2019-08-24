import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import moment from 'moment'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(ElementUI)
// 生产提示
Vue.config.productionTip = false
// 全局注册vuex
const store = new Vuex.Store({
  state: {
    username: '',
    roleName: ''
  },
  mutations: {
    getUsername (state, info) {
      state.username = info.username
      state.roleName = info.roleName
    }
  }
})
// 全局挂载axios
Vue.prototype.$axios = axios
// axios默认值
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response)
  response = response.data
  if (response.meta.status === 401) {
    router.push({ name: 'login' })
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
Vue.filter('getTime', (val) => {
  return moment(val * 1000).format('YYYY年MM月DD日 HH:mm:ss')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
