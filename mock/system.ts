import Mock, { Random } from 'mockjs'

export function resultSuccess(data, { message = 'ok' } = {}) {
  return Mock.mock({
    code: 200,
    data,
    message,
    success: true
  })
}

export default [
  {
    url: '/mock/system-manage/dept/list',
    method: 'get',
    timeout: 300,
    response: () => {
      // const { pageCount = 1, pageSize = 10 } = query
      return resultSuccess({
        total: 6,
        ['list|15']: [
          {
            'id|+1': 1,
            'key|+1': 1,
            'name|+1': [
              '综合办',
              '组织部',
              '销售部',
              '技术部',
              '财务部',
              '人事部',
              '采购部',
              '市场部',
              '设备部',
              '人力资源部',
              '生产部',
              '计划部',
              '实施部',
              '售后服务部',
              '质管部'
            ],
            deptCode: 'dp_code_manager',
            'order|+1': 1, // 0不是 1是
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            status: 0, // 0 禁用 1正常
            level: 1,
            ['children|3']: [
              {
                'id|+1': 999,
                'key|+1': 999,
                name: '子部门',
                deptCode: 'dp_code_manager',
                'order|+1': 1, // 0不是 1是
                createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
                status: 0, // 0 禁用 1正常
                level: 2,
                ['children|5']: [
                  {
                    'id|+1': 9999,
                    'key|+1': 9999,
                    name: '子子部门',
                    deptCode: 'dp_code_manager',
                    'order|+1': 1, // 0不是 1是
                    createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
                    status: 0, // 0 禁用 1正常
                    level: 3
                  }
                ]
              }
            ]
          }
        ]
      })
    }
  },
  {
    url: '/mock/system-manage/user/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { pageCount = 1, pageSize = 10 } = query
      return resultSuccess({
        total: 6,
        [`list|${pageSize}`]: [
          {
            'id|+1': 1,
            nickName: '@cname()',
            avatar: '/static/images/img_avatar_01.jpeg',
            'sex|0-1': 0, // 0男 1女
            'vip|0-1': 0, // 0不是 1是
            address: function () {
              return Random.city(true)
            },
            lastLoginTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            lastLoginIp: function () {
              return Random.ip()
            },
            'status|0-1': 1 // 0 禁用 1正常
          }
        ]
      })
    }
  },
  {
    url: '/mock/system-manage/role/list',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      const { pageCount = 1, pageSize = 10 } = query
      return resultSuccess({
        total: 2,
        list: [
          {
            id: 1,
            name: '超级管理员',
            roleCode: 'ROLE_admin',
            description: '超级管理员',
            createTime: Random.now('yyyy-MM-dd HH:mm:ss')
          },
          {
            id: 2,
            name: '编辑员',
            roleCode: 'ROLE_editor',
            description: '编辑员',
            createTime: Random.now('yyyy-MM-dd HH:mm:ss')
          }
        ]
      })
    }
  }
]
