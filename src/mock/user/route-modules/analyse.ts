export default {
  path: '',
  redirect: '/analyse',
  component: 'Layout',
  children: [
    {
      name: 'Analyse',
      path: 'analyse',
      component: 'analyse/index',
      meta: {
        hideen: false,
        title: '分析页',
        svgIcon: 'menu-chart',
        keepAlive: false
      }
    }
  ]
}
