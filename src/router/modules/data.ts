import { RouterView } from 'vue-router'

export default [
  {
    path: '/data',
    name: 'DataManage', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
    component: () => import('@/views/data/main/index.vue'),
    meta: {
      title: '数据管理',
      keepAlive: true // 如果想要缓存此页面，那么 name 必须与页面组件名一致
    },
  },
  {
    path: '/data/detail',
    name: 'DataDetail',
    component: () => import('@/views/data/detail/index.vue'),
    meta: {
      title: '详情',
      keepAlive: false
    }
  }
]
