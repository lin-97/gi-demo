import { defineMock } from '../_base'
import treeData from '../_data/tree'
import { getDelayTime, resultSuccess } from '../_utils'

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
