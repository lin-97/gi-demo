import { Random } from 'mockjs'
import { successResponseWrap, failResponseWrap } from '@/mock/mock'
import { findTree } from 'xe-utils'

const data = [
  {
    id: '01',
    parentId: '',
    name: 'XXX科技有限公司',
    sort: 1,
    status: 1,
    createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
    children: [
      {
        id: '0101',
        parentId: '01',
        name: '广州总部',
        sort: 1,
        status: 1,
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
        children: [
          {
            id: '010101',
            parentId: '0101',
            name: '研发部',
            sort: 1,
            status: 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            children: [
              {
                id: '01010101',
                parentId: '010101',
                name: '研发一组',
                sort: 1,
                status: 1,
                createTime: Random.now('yyyy-MM-dd HH:mm:ss')
              },
              {
                id: '01010102',
                parentId: '010101',
                name: '研发二组',
                sort: 2,
                status: 1,
                createTime: Random.now('yyyy-MM-dd HH:mm:ss')
              }
            ]
          },
          {
            id: '010102',
            parentId: '0101',
            name: 'UI部',
            sort: 2,
            status: 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss')
          },
          {
            id: '010103',
            parentId: '0101',
            name: '测试部',
            sort: 3,
            status: 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss')
          },
          {
            id: '010104',
            parentId: '0101',
            name: '运维部',
            sort: 4,
            status: 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss')
          }
        ]
      }
    ]
  }
]

export default [
  {
    url: '/mock/system/dept',
    method: 'get',
    timeout: 100,
    response: () => {
      return successResponseWrap(data)
    }
  },
  {
    url: '/mock/system/dept/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }: any) => {
      const { id } = query
      let obj = findTree(data, (i) => i.id === id)
      if (obj.item) {
        return successResponseWrap(obj.item)
      } else {
        return failResponseWrap(null, '没有该角色', 400)
      }
    }
  }
]
