import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Message, Notification } from '@arco-design/web-vue'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'

export interface IResponse<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean
}

interface AxiosRequestConfig {
  headers?: any
}

interface ICodeMessage {
  [propName: number]: string
}

const StatusCodeMessage: ICodeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)'
}

const http: AxiosInstance = axios.create({
  // baseURL: process.env.VUE_APP_API_PREFIX,
  timeout: 30000
})

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start() // 进度条
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error: { message: string }) => {
    Message.error(error.message)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    const { msg, message, success } = data

    if (!success) {
      Notification.error(message || msg || '服务器端错误')
      return Promise.reject(new Error(msg || 'Error'))
    }
    NProgress.done()
    return response
  },
  (error: AxiosError) => {
    NProgress.done()
    Message.clear()

    const response = Object.assign({}, error.response)
    response && Message.error(StatusCodeMessage[response.status] || '系统异常, 请检查网络或联系管理员！')
    return Promise.reject(error)
  }
)

const request = <T = any>(config: CustomAxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    http
      .request<IResponse<T>>(config)
      .then((res: AxiosResponse) => resolve(res.data))
      .catch((err: { message: string }) => reject(err))
  })
}

request.get = <T = any>(url: string, params?: object, headers?: any): Promise<T> => {
  return request({
    method: 'get',
    url,
    params,
    headers
  })
}

request.post = <T = any>(url: string, params?: object, headers?: any): Promise<T> => {
  return request({
    method: 'post',
    url,
    data: params,
    headers
  })
}

export default request
