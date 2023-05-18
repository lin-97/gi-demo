import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock.ts文件
// 如果使用 vite.mock.config.ts，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
import userModule from './user/index'
import tableModule from './person/index'
import systemModule from './system/index'
import fileModule from './file/index'
import testModule from './test/index'
import cateModule from './cate/index'

export function setupProdMockServer() {
  createProdMockServer([...userModule, ...tableModule, ...systemModule, ...fileModule, ...cateModule, ...testModule])
}
