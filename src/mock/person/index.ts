import { Random } from 'mockjs'
import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_utils'

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

// 获取兴趣爱好
const getHobbysList = (num: number) => {
  const list = ['篮球', '羽毛球', '足球', '音乐', '电影', '旅行', '高尔夫', '爬山', '游泳', '健身']
  const arr: string[] = []
  while (arr.length < num) {
    const index = Math.floor(Math.random() * list.length)
    if (!arr.includes(list[index])) {
      arr.push(list[index])
    }
  }
  return arr
}

const getRandomAvatar = () => {
  const list = [
    'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    'https://img2.baidu.com/it/u=304294273,3088990845&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
    'https://img0.baidu.com/it/u=3745738950,3664021749&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    'https://img1.baidu.com/it/u=1817951587,3188870642&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    'https://s1.ax1x.com/2022/06/14/XhYkqS.jpg',
    'https://s1.ax1x.com/2022/06/14/XhYJIJ.jpg',
    'https://s1.ax1x.com/2022/06/14/XhYyIH.jpg',
    'https://s1.ax1x.com/2022/06/14/XhtSwF.jpg',
    'https://s1.ax1x.com/2022/06/14/XhteeO.jpg',
    'https://s1.ax1x.com/2022/06/14/XhtakQ.jpg'
  ]
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}

const getTableListData = (params: any) => {
  const data: any[] = []
  for (let i = 0; i < params.pageSize; i++) {
    data.push({
      id: Random.guid(),
      name: params.name !== '' ? params.name : '@cname()',
      account: Mock.mock('@string("lower", 5)'),
      phone: '15578728810',
      'gender|1-3': 1,
      email: '155****8810@qq.com',
      createTime: '@datetime',
      address: '@county(true)',
      avatar: getRandomAvatar(),
      'proportion|1-100': 10,
      'status|0-1': 0,
      hobbys: getHobbysList(Math.floor(Math.random() * 9))
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
      return resultSuccess({
        total: 1000,
        records: list
      })
    }
  },
  {
    url: '/mock/person/delete',
    method: 'post',
    timeout: 350,
    response: ({ body }) => {
      const { ids } = body
      return resultSuccess(ids)
    }
  }
] as MockMethod[]
