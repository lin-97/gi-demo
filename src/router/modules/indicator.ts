import { DEFAULT_LAYOUT } from '../base'

const Indicator = {
  path: '/indicator',
  name: 'Indicator',
  redirect: '/indicator',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/indicator',
      name: 'IndicatorMain',
      component: () => import('@/views/indicator/main/index.vue'),
      meta: {
        title: '指标管理',
        keepAlive: false
      }
    },
    {
      path: '/indicator/detail',
      name: 'IndicatorDetail',
      component: () => import('@/views/indicator/detail/index.vue'),
      meta: {
        title: '指标管理-详情',
        keepAlive: false
      }
    }
  ]
}

export default Indicator
