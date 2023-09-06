import { Random } from 'mockjs'
import { successResponseWrap } from '@/mock/mock'

const data = [
  {
    id: '1',
    parentId: '0',
    name: 'XXX科技有限公司',
    sort: 1,
    createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
    children: [
      {
        id: '2',
        parentId: '1',
        name: '广州总部',
        sort: 1,
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
        children: [
          {
            id: '3',
            parentId: '2',
            name: '研发部',
            sort: 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            children: [
              {
                id: '7',
                parentId: '3',
                name: '研发一组',
                sort: 1,
                createTime: Random.now('yyyy-MM-dd HH:mm:ss')
              },
              {
                id: '8',
                parentId: '3',
                name: '研发二组',
                sort: 2,
                createTime: Random.now('yyyy-MM-dd HH:mm:ss')
              }
            ]
          },
          {
            id: '4',
            parentId: '2',
            name: 'UI部',
            sort: 2,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss')
          },
          {
            id: '5',
            parentId: '2',
            name: '测试部',
            sort: 3,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss')
          },
          {
            id: '6',
            parentId: '2',
            name: '运维部',
            sort: 4,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss')
          }
        ]
      }
    ]
  }
]

export default [
  {
    url: '/mock/system/dept/list',
    method: 'get',
    timeout: 100,
    response: () => {
      return successResponseWrap(data)
    }
  }
]
