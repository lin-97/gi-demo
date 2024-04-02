import { defineMock } from '../_base'
import { resultSuccess, getDelayTime } from '../_utils'
import treeData from '../_data/tree'

export default defineMock([
  {
    url: '/cate/tree',
    method: 'get',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess(treeData)
    }
  }
])
