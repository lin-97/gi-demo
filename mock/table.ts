import { Random } from 'mockjs'
import Mock from 'mockjs'
import { successResponseWrap } from './mock'

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

const tableList = (pageSize) => {
  const result: any[] = []
  doCustomTimes(pageSize, (i) => {
    result.push({
      id: '@integer(10,999999)',
      index: i,
      name: '@cname()',
      phone: '15578728810',
      startTime: '@datetime',
      endTime: '@datetime',
      address: '@county(true)',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      'proportion|1-100': 10,
      'no|100000-10000000': 100000,
      'status|1': [true, false],
      color: Mock.mock('@hex')
    })
  })
  return result
}

export default [
  {
    url: '/mock/table/list',
    method: 'get',
    timeout: 0,
    response: ({ query }) => {
      const { current = 1, pageSize = 10 } = query
      const list = tableList(Number(pageSize))
      return successResponseWrap({
        current: Number(current),
        pageSize: Number(pageSize),
        total: 1000,
        list: list
      })
    }
  }
]
