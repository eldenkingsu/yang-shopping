import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 创建axios实例 将对创建出来的的axios实例进行配置
// 好处不会污染原始axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 1000,
  headers: { platform: 'h5' }
})

// 自定义配置 --请求响应拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启lodaing，禁止背景带点击（节流防止多次点击）
  Toast.loading({
    message: '加载中',
    forbidClick: true
    // duration: 0
  })
  // 只要有token，就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器,优先考虑正逻辑，通过响应拦截器来对请求出现的错误的情况抛出异常
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多包装一层data，需要响应拦截器中处理一下)
  const res = response.data
  // console.log(res)
  if (res.status !== 200) {
    // 如果验证错误，给出提示
    Toast(res.message)
    // 抛出错误的promise
    return Promise.reject(res.message)
  } else {
    // 正确路径
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置
export default instance
