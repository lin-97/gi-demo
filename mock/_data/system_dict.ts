import type { MockSystemDictItem } from './_type'

const data: MockSystemDictItem[] = [
  {
    id: '01',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    name: '性别',
    code: 'GENDER',
    sort: 1,
    status: '1' as const,
    description: '性别字典',
    list: [
      { id: '011', name: '男', value: '1', sort: 1, status: '1', color: '', remark: '性别男', createTime: '2023-09-05 23:24:40' },
      { id: '012', name: '女', value: '2', sort: 2, status: '1', color: '', remark: '性别女', createTime: '2023-09-05 23:24:41' },
      { id: '013', name: '未知', value: '3', sort: 3, status: '1', color: '', remark: '未知性别', createTime: '2023-09-05 23:24:42' }
    ]
  },
  {
    id: '02',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    name: '状态',
    code: 'STATUS',
    sort: 2,
    status: '1' as const,
    description: '通用状态字典',
    list: [
      { id: '021', name: '正常', value: '1', sort: 1, status: '1', color: '', remark: '启用状态', createTime: '2023-09-05 23:24:40' },
      { id: '022', name: '禁用', value: '0', sort: 2, status: '1', color: '', remark: '停用状态', createTime: '2023-09-05 23:24:41' }
    ]
  },
  {
    id: '03',
    createUserString: '超级管理员',
    createTime: '2024-04-02 19:30:40',
    name: '爱好',
    code: 'HOBBY',
    sort: 3,
    status: '0' as const,
    description: '基础表单-兴趣爱好',
    list: [
      { id: '031', name: '篮球', value: '篮球', sort: 1, status: '1', color: 'red', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '032', name: '羽毛球', value: '羽毛球', sort: 2, status: '1', color: 'orange', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '033', name: '足球', value: '足球', sort: 3, status: '1', color: 'gold', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '034', name: '音乐', value: '音乐', sort: 4, status: '1', color: 'green', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '035', name: '电影', value: '电影', sort: 5, status: '1', color: 'cyan', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '036', name: '旅行', value: '旅行', sort: 6, status: '1', color: 'arcoblue', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '037', name: '高尔夫', value: '高尔夫', sort: 7, status: '0', color: 'blue', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '038', name: '爬山', value: '爬山', sort: 8, status: '1', color: 'purple', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '039', name: '游泳', value: '游泳', sort: 9, status: '1', color: 'magenta', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '040', name: '健身', value: '健身', sort: 10, status: '1', color: 'gray', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '041', name: '阅读', value: '阅读', sort: 11, status: '1', color: 'red', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '042', name: '摄影', value: '摄影', sort: 12, status: '1', color: 'orange', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '043', name: '绘画', value: '绘画', sort: 13, status: '1', color: 'gold', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '044', name: '书法', value: '书法', sort: 14, status: '1', color: 'green', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '045', name: '舞蹈', value: '舞蹈', sort: 15, status: '1', color: 'cyan', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '046', name: '跑步', value: '跑步', sort: 16, status: '1', color: 'arcoblue', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '047', name: '骑行', value: '骑行', sort: 17, status: '1', color: 'blue', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '048', name: '瑜伽', value: '瑜伽', sort: 18, status: '1', color: 'purple', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '049', name: '钓鱼', value: '钓鱼', sort: 19, status: '1', color: 'magenta', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '050', name: '桌游', value: '桌游', sort: 20, status: '1', color: 'gray', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '051', name: '烹饪', value: '烹饪', sort: 21, status: '1', color: 'red', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '052', name: '园艺', value: '园艺', sort: 22, status: '1', color: 'orange', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '053', name: '露营', value: '露营', sort: 23, status: '1', color: 'gold', remark: '--', createTime: '2024-04-02 19:30:40' },
      { id: '054', name: '滑雪', value: '滑雪', sort: 24, status: '1', color: 'green', remark: '--', createTime: '2024-04-02 19:30:40' }
    ]
  }
]

export default data
