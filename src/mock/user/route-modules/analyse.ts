export default {
  path: '',
  redirect: '/analyse',
  component: 'Layout',
  children: [
    {
      path: '/analyse',
      name: 'Analyse',
      component: 'analyse/index',
      meta: {
        hideen: false,
        title: '分析页',
        svgIcon: 'menu-chart',
        keepAlive: false,
        sort: 2
      }
    }
  ]
}
