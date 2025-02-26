import { defineMock } from '../_base'
import { getDelayTime, resultSuccess } from '../_utils'
import treeData from '../_data/tree'

export default defineMock([
  {
    url: '/cate/getCateTree',
    method: 'get',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess(treeData)
    }
  }
])
