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
    response: ({ query }) => {
      const { pageCount = 1, pageSize = 10 } = query
      return resultSuccess({
        total: 6,
        list: [
          {
            id: 1,
            name: '总裁办',
            deptCode: 'dp_code_manager', // 0男 1女
            'order|+1': 1, // 0不是 1是
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            status: 0 // 0 禁用 1正常
          },
          {
            id: 2,
            name: '市场部',
            deptCode: 'dp_code_marketing', // 0男 1女
            'order|+1': 1, // 0不是 1是
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            status: 1, // 0 禁用 1正常,
            children: [
              {
                id: 3,
                name: '市场一部',
                deptCode: 'dp_code_marketing_1', // 0男 1女
                'order|+1': 1, // 0不是 1是
                createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
                status: 1 // 0 禁用 1正常
              },
              {
                id: 4,
                name: '市场二部',
                deptCode: 'dp_code_marketing_2', // 0男 1女
                'order|+1': 1, // 0不是 1是
                createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
                status: 1 // 0 禁用 1正常
              }
            ]
          },
          {
            id: 5,
            name: '技术部',
            deptCode: 'dp_code_technology', // 0男 1女
            'order|+1': 1, // 0不是 1是
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            status: 1 // 0 禁用 1正常
          },
          {
            id: 6,
            name: '销售部',
            deptCode: 'dp_code_sale', // 0男 1女
            'order|+1': 1, // 0不是 1是
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            status: 1 // 0 禁用 1正常
          }
        ]
      })
    }
  }
]
