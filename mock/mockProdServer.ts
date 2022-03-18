//  mockProdServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock.ts文件
import testModule from './table'

export function setupProdMockServer() {
  createProdMockServer([...testModule])
}
