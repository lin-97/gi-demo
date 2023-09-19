import type { MockMethod } from 'vite-plugin-mock'
import { successResponseWrap, failResponseWrap } from '../mock'

export default [
  {
    url: '/mock/test/success',
    method: 'get',
    timeout: 350,
    response: () => {
      return successResponseWrap('哈哈哈')
    }
  },
  {
    url: '/mock/test/fail',
    method: 'get',
    timeout: 350,
    response: () => {
      return failResponseWrap(null, '请求出错了呦~', 400)
    }
  }
] as MockMethod[]
