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
        value: 1,
        status: 1
      },
      {
        id: '012',
        name: '女',
        value: 2,
        status: 1
      },
      {
        id: '013',
        name: '未知',
        value: 3,
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
        name: '正常',
        value: 1,
        status: 1
      },
      {
        id: '022',
        name: '禁用',
        value: 0,
        status: 1
      }
    ]
  },
  {
    id: '03',
    createUserString: '超级管理员',
    createTime: '2024-04-02 19:30:40',
    name: '爱好',
    code: 'hobbys',
    sort: 3,
    status: 1,
    description: '基础表单-兴趣爱好',
    list: [
      {
        id: '031',
        name: '运动',
        value: '运动',
        status: 1,
        color: 'red'
      },
      {
        id: '032',
        name: '音乐',
        value: '音乐',
        status: 1,
        color: 'green'
      },
      {
        id: '033',
        name: '电影',
        value: '电影',
        status: 1,
        color: 'cyan'
      },
      {
        id: '034',
        name: '旅行',
        value: '旅行',
        status: 1,
        color: 'arcoblue'
      },
      {
        id: '035',
        name: '美食',
        value: '美食',
        status: 1,
        color: 'purple'
      }
    ]
  }
]

export default data
