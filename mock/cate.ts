import { successResponseWrap } from './mock'
import treeData from './data/tree'

export default [
  {
    url: '/mock/cate/tree',
    method: 'get',
    timeout: Math.floor(Math.random() * 1) * 100,
    response: () => {
      return successResponseWrap(treeData)
    }
  }
]
