import type { MockSystemDictItem } from './_type'

const data: MockSystemDictItem[] = [
  {
    id: '01',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    name: '性别',
    code: 'gender',
    sort: 1,
    status: 1,
    description: '性别字典',
    list: [
      {
        id: '011',
        name: '男',
        value: '1',
        status: 1
      },
      {
        id: '012',
        name: '女',
        value: '2',
        status: 1
      },
      {
        id: '013',
        name: '未知',
        value: '0',
        status: 1
      }
    ]
  },
  {
    id: '02',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    name: '状态',
    code: 'status',
    sort: 2,
    status: 1,
    description: '通用状态字典',
    list: [
      {
        id: '021',
        name: '启用',
        value: '1',
        status: 1
      },
      {
        id: '022',
        name: '禁用',
        value: '0',
        status: 1
      }
    ]
  }
]

export default data
