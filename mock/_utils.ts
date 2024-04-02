import Mock from 'mockjs'
import { mapTree, random } from 'xe-utils'

/** 返回成功数据 */
export const resultSuccess = (data: unknown) => {
  return Mock.mock({
    code: 200,
    data,
    message: '请求成功',
    success: true
  })
}

/** 返回失败数据 */
export const resultError = (data: unknown, message: string, code = 500) => {
  return Mock.mock({
    code,
    data,
    message,
    success: false
  })
}

/** 获取 50-300ms 的随机延时 */
export const getDelayTime = () => {
  return random(50, 300)
}

export type MockTokenItem = 'token_admin' | 'token_user'
/** 目前模拟的token主要以下2个 */
export const USER_TOKENS: MockTokenItem[] = ['token_admin', 'token_user']

/** 判断是否是管理员 */
export const isAdmin = (token: string) => {
  return token === 'token_admin'
}

/**
 * @desc 过滤树
 * @param { values } 数组
 */
type FilterTree = <T extends { children?: T[] }>(
  array: T[],
  iterate: (item: T, index?: number, items?: T[]) => boolean
) => T[]
export const filterTree: FilterTree = (values, fn) => {
  const arr = values.filter(fn)
  const data = mapTree(arr, (item) => {
    if (item.children && item.children.length) {
      item.children = item.children.filter(fn)
    }
    return item
  })
  return data
}
