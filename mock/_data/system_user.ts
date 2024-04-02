import type { MockSystemUserItem } from './_type'

const data: MockSystemUserItem[] = [
  {
    id: '01',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:00:00',
    disabled: true,
    username: 'admin',
    nickname: '管理员',
    gender: 1,
    avatar: 'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    email: '326010228@qq.com',
    phone: '19900006962',
    status: 1,
    type: 1,
    description: '系统初始用户',
    roleIds: ['role_admin'],
    roleNames: '超级管理员',
    deptId: '01',
    deptName: 'XXX科技有限公司',
    permissions: ['*:*:*']
  },
  {
    id: '02',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:00:00',
    disabled: false,
    username: 'user',
    nickname: '木糖醇',
    gender: 2,
    avatar: 'https://img1.baidu.com/it/u=1817951587,3188870642&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    email: '15500008810@qq.com',
    phone: '15500008810',
    status: 1,
    type: 2,
    description: '无法访问系统管理菜单',
    roleIds: ['role_user'],
    roleNames: '普通用户',
    deptId: '01010101',
    deptName: '研发一组',
    permissions: ['user:btn:add', 'user:btn:edit', 'user:btn:delete']
  }
]

export default data
