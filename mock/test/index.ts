import { defineMock } from '../_base'
import { resultSuccess, resultError, getDelayTime } from '../_utils'

export default defineMock([
  {
    url: '/test/success',
    method: 'get',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess('哈哈哈')
    }
  },
  {
    url: '/test/fail',
    method: 'get',
    timeout: getDelayTime(),
    response: () => {
      return resultError(null, '请求出错了呦~', 400)
    }
  }
])
