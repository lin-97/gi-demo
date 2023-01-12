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

const getTableListData = (params) => {
  const data: any[] = []
  for (let i = 0; i < params.pageSize; i++) {
    data.push({
      id: '@integer(10,999999)',
      index: i,
      name: params.name !== '' ? params.name : '@cname()',
      phone: '15578728810',
      startTime: '@datetime',
      endTime: '@datetime',
      createTime: '@datetime',
      address: '@county(true)',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      'proportion|1-100': 10,
      'no|100000-10000000': 100000,
      status: params.status != '' ? Number(params.status) : Math.random() > 0.5 ? 1 : 0, // 0或1
      color: Mock.mock('@hex')
    })
  }
  return data
}

export default [
  {
    url: '/mock/person/list',
    method: 'get',
    timeout: 350,
    response: ({ query }) => {
      const { current = 1, pageSize = 10, status = 0, name = '' } = query
      const list = getTableListData({ current, pageSize, status, name })
      return successResponseWrap({
        current: Number(current),
        pageSize: Number(pageSize),
        total: 1000,
        list: list
      })
    }
  }
]
