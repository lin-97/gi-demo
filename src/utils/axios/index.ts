import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message } from '@arco-design/web-vue'
import { getToken, clearToken } from '@/utils/auth'

// 返回res.data的interface
export interface IResponse<T = any> {
  code: number | string
  result: T
  message: string
  status: string | number
}

const http: AxiosInstance = axios.create({
  // baseURL: process.env.VUE_APP_API_PREFIX,
  timeout: 30000
})

// 请求拦截器
http.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = getToken()
    if (token) {
      // config.headers.Authorization = `${TokenPrefix}${token}`
      config.headers['token'] = token
    }
    return config
  },
  function (error: any) {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.status == 200) {
      if (response.data.success) {
        return response.data
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
