import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { getToken, clearToken } from '@/utils/auth'
const router = useRouter()

const http = axios.create({
  // baseURL: process.env.VUE_APP_API_PREFIX,
  timeout: 30000
})

// 请求拦截器
http.interceptors.request.use(
  function (config) {
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  function (response) {
    if (response.status == 200) {
      if (response.data.code == 200) {
        return response.data
      } else if (response.data.code == 40301 || response.data.code == 40302) {
        clearToken()
        router.replace('/login')
        Message.error({ content: 'token已过期，请重新登录！' })
      } else {
        Message.clear()
        Message.error({ content: response.data.message || response.data.msg || '服务器端错误' })
        return Promise.reject(response.data)
      }
    }
  },
  function (error) {
    let message = error.message
    if (error.response.status === 404) {
      message = '接口访问失败 404'
    }
    Message.error({ content: message })
    return Promise.reject(error)
  }
)

export default {
  post(url: string, data: object, headers = {}) {
    return http({
      method: 'post',
      url,
      data,
      headers
    })
  },

  get(url: string, params: object, headers = {}) {
    return http({
      method: 'get',
      url,
      params,
      headers
    })
  }
}
