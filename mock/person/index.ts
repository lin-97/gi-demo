import Mock, { Random } from 'mockjs'
import { defineMock } from '../_base'
import { getBaseApi, resultSuccess } from '../_utils'

const AVATARS = [
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

const HOBBYS = ['篮球', '羽毛球', '足球', '音乐', '电影', '旅行', '高尔夫', '爬山', '游泳', '健身']

function getHobbysList(num: number): string[] {
  const arr: string[] = []
  while (arr.length < num) {
    const item = HOBBYS[Random.integer(0, HOBBYS.length - 1)]
    if (!arr.includes(item)) arr.push(item)
  }
  return arr
}

/** 使用 Mock 生成单条数据（在 seed 下结果固定） */
function createMockItem() {
  return Mock.mock({
    id: '@guid',
    name: '@cname',
    account: '@string("lower", 5)',
    phone: '1557872@integer(1000, 9999)',
    'gender|1-3': 1,
    email: '155****8810@qq.com',
    createTime: '@datetime',
    address: '@county(true)',
    avatar: () => AVATARS[Random.integer(0, AVATARS.length - 1)],
    'proportion|1-100': 10,
    'status|0-1': 0,
    hobbys: () => getHobbysList(Random.integer(1, 9))
  })
}

/**
 * 使用 Mock 生成 1000 条数据：在模块加载时只生成一次并缓存，同一进程内固定。
 * 注意：mockjs 无 seed API，重启后数据会变；若需跨重启完全固定，请改用纯确定性生成（不依赖 Mock 随机）。
 */
function buildFixedPersonList() {
  const list: ReturnType<typeof createMockItem>[] = []
  for (let i = 0; i < 1000; i++) {
    list.push(createMockItem())
  }
  return list
}

const FIXED_PERSON_LIST = buildFixedPersonList()
const TOTAL = FIXED_PERSON_LIST.length

export default defineMock([
  ...getBaseApi({
    baseUrl: '/person',
    getListData: (query: { page?: string | number; size?: string | number }) => {
      const page = Number(query?.page) || 1
      const size = Number(query?.size) || 10
      const start = (page - 1) * size
      const records = FIXED_PERSON_LIST.slice(start, start + size)
      return resultSuccess({
        total: TOTAL,
        records
      })
    }
  })
])
