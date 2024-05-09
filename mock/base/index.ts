import { defineMock } from '../_base'
import { getDelayTime, resultSuccess } from '../_utils'

/** 这里模拟基本的保存、删除接口 */
export default defineMock([
  {
    url: '/base/save',
    method: 'post',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/base/delete',
    method: 'post',
    timeout: getDelayTime(),
    response: ({ body }) => {
      const { ids } = body
      return resultSuccess(ids)
    }
  }
])
