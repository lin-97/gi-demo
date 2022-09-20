import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock.ts文件
// 如果使用 vite.mock.config.ts，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
import userModule from './user'
import tableModule from './person'
import systemModule from './system'
import fileModule from './file'
import cateModule from './cate'

export function setupProdMockServer() {
  createProdMockServer([...userModule, ...tableModule, ...systemModule, ...fileModule, ...cateModule])
}
