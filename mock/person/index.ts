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
    'id': '@guid',
    'name': '@cname',
    'account': '@string("lower", 5)',
    'phone': '1557872@integer(1000, 9999)',
    'gender|1-3': 1,
    'email': '@email',
    'createTime': '@datetime',
    'address': '@county(true)',
    'avatar': () => AVATARS[Random.integer(0, AVATARS.length - 1)],
    'age|18-60': 25,
    'status|0-1': 0,
    'hobbys': () => getHobbysList(Random.integer(1, 9)),
    'remark': ''
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

export default defineMock([
  ...getBaseApi({
    baseUrl: '/person',
    getListData: (query: { page?: string | number, size?: string | number, name?: string, status?: string }) => {
      const page = Number(query?.page) || 1
      const size = Number(query?.size) || 10
      const name = query?.name?.trim()
      const status = query?.status

      // 先按 name、status 过滤
      let filtered = FIXED_PERSON_LIST
      if (name) {
        filtered = filtered.filter((i) => (i.name ?? '').includes(name))
      }
      if (status !== undefined && status !== '' && status !== null) {
        const statusNum = Number(status)
        filtered = filtered.filter((i) => i.status === statusNum)
      }

      const total = filtered.length
      const start = (page - 1) * size
      const records = filtered.slice(start, start + size)
      return resultSuccess({
        total,
        records
      })
    },
    getDetailData: (query: { id?: string }) => {
      const id = query?.id
      if (!id) return resultSuccess(null)
      const item = FIXED_PERSON_LIST.find((i) => i.id === id)
      return resultSuccess(item ?? null)
    }
  })
])
