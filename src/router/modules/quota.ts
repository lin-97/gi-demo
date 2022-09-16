import { DEFAULT_LAYOUT } from '../base'

const Quota = {
  path: '/quota',
  name: 'Quota',
  redirect: '/quota',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/quota',
      name: 'QuotaMain',
      component: () => import('@/views/quota/main/index.vue'),
      meta: {
        title: '指标管理',
        keepAlive: false
      }
    },
    {
      path: '/quota/detail',
      name: 'QuotaDetail',
      component: () => import('@/views/quota/detail/index.vue'),
      meta: {
        title: '指标管理-详情',
        keepAlive: false
      }
    }
  ]
}

export default Quota
