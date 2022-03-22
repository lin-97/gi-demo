import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Message, Notification } from '@arco-design/web-vue'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'

export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

interface ICodeMessage {
  [propName: number]: string
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean
}

const CodeMessage: ICodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
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
    response && Message.error(CodeMessage[response.status] || '系统异常')
    return Promise.reject(error)
  }
)

const request = <T = any>(config: CustomAxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    http
      .request<BaseResponse<T>>(config)
      .then((res: AxiosResponse) => resolve(res.data))
      .catch((err: { message: string }) => reject(err))
  })
}

request.get = <T = any>(url: string, params?: object): Promise<T> => {
  return request({
    method: 'get',
    url,
    params
  })
}

request.post = <T = any>(url: string, params?: object): Promise<T> => {
  return request({
    method: 'post',
    url,
    data: params
  })
}

export default request
