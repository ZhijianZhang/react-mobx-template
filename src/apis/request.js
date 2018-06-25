import axios from 'axios'

// 默认url前缀
axios.defauls.baseURL = 'xxx'
// axios 进行跨域请求时带上cookie
axios.defaults.withCredentials = true
// 设置axios 的请求超时时间
axios.defaults.timeout = 10000

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
})

// axios拦截器
// data: { retcode: 200, data: obj }
axios.interceptors.response.use(response => {
  // 在这里你可以判断后台返回数据携带的请求码
  if (response.data.retcode === 200 || response.data.retcode === '200') {
    return response.data.data || response.data
  } else {
    // 非200请求报错
    throw Error(response.data.msg || '服务异常')
  }
})

export default axios
