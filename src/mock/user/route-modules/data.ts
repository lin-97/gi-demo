export default {
  path: '',
  redirect: '/data',
  component: 'Layout',
  meta: {
    hideen: false,
    title: '数据管理',
    icon: 'icon-list',
    svgIcon: 'menu-data',
    keepAlive: true,
    sort: 3
  },
  children: [
    {
      path: '/data',
      name: 'Data',
      component: 'data/main/index',
      meta: {
        hidden: false,
        title: '数据管理',
        icon: 'icon-list',
        keepAlive: true,
        breadcrumb: false
      }
    },
    {
      path: '/data/detail',
      name: 'DataDetail',
      component: 'data/detail/index',
      meta: {
        hidden: true,
        title: '详情',
        keepAlive: false,
        affix: false,
        activeMenu: '/data'
      }
    }
  ]
}
