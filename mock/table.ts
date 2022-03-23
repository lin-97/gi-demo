import { Random } from 'mockjs'
import Mock from 'mockjs'

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export function doCustomTimes(times: number, callback: any) {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

export function resultSuccess(data, { message = 'ok' } = {}) {
  return Mock.mock({
    code: 200,
    data,
    message,
    success: true
  })
}

const tableList = (pageSize) => {
  const result: any[] = []
  doCustomTimes(pageSize, (i) => {
    result.push({
      id: '@integer(10,999999)',
      index: i,
      name: '@cname()',
      startTime: '@datetime',
      endTime: '@datetime',
      address: '@county(true)',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      'proportion|1-100': 10,
      'no|100000-10000000': 100000,
      'status|1': [true, false]
    })
  })
  return result
}

export default [
  {
    url: '/mock/getTable',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query
      const list = tableList(Number(pageSize))
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        list: list
      })
    }
  }
]
