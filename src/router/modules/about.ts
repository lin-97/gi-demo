import { DEFAULT_LAYOUT } from '../base'

const About = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: '关于',
        keepAlive: false
      }
    }
  ]
}

export default About
