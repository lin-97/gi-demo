export default {
  path: '/data',
  component: 'Layout',
  redirect: '/data/main',
  meta: {
    hideen: false,
    title: '数据管理',
    icon: 'icon-list',
    svgIcon: 'menu-data',
    keepAlive: true
  },
  children: [
    {
      name: 'Data',
      path: 'main',
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
      name: 'DataDetail',
      path: 'detail',
      component: 'data/detail/index',
      meta: {
        hidden: true,
        title: '详情',
        keepAlive: false,
        affix: false,
        activeMenu: '/data/main'
      }
    }
  ]
}
