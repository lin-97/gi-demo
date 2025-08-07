import type { MockSystemDeptItem } from './_type'
import { Random } from 'mockjs'

const data: MockSystemDeptItem[] = [
  {
    id: '01',
    parentId: '',
    name: 'XXX科技有限公司',
    sort: 1,
    status: 1,
    createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
    description: '本部',
    children: [
      {
        id: '0101',
        parentId: '01',
        name: '广州总部',
        sort: 1,
        status: 1,
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
        description: '',
        children: [
          {
            id: '010101',
            parentId: '0101',
            name: '研发部',
            sort: 1,
            status: 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            description: '',
            children: [
              {
                id: '01010101',
                parentId: '010101',
                name: '研发一组',
                sort: 1,
                status: 1,
                createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
                description: ''
              },
              {
                id: '01010102',
                parentId: '010101',
                name: '研发二组',
                sort: 2,
                status: 1,
                createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
                description: ''
              },
              {
                id: '01010103',
                parentId: '010101',
                name: '研发三组',
                sort: 3,
                status: 0,
                createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
                description: '禁用测试'
              }
            ]
          },
          {
            id: '010102',
            parentId: '0101',
            name: 'UI部',
            sort: 2,
            status: 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            description: ''
          },
          {
            id: '010103',
            parentId: '0101',
            name: '测试部',
            sort: 3,
            status: 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            description: ''
          },
          {
            id: '010104',
            parentId: '0101',
            name: '运维部',
            sort: 4,
            status: 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            description: ''
          }
        ]
      }
    ]
  }
]

export default data
