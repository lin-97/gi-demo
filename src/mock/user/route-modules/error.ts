export default {
  path: '/error',
  name: 'Error',
  redirect: '/error/403',
  component: 'Layout',
  meta: {
    hidden: false,
    title: '错误页',
    svgIcon: 'menu-error',
    keepAlive: false,
    sort: 7
  },
  children: [
    {
      path: '/error/403',
      name: 'Error403',
      component: 'error/403',
      meta: {
        hidden: false,
        title: '403页',
        icon: 'icon-menu',
        keepAlive: false,
        affix: false
      }
    },
    {
      path: '/error/404',
      name: 'Error404',
      component: 'error/404',
      meta: {
        hidden: false,
        title: '404页',
        icon: 'icon-menu',
        keepAlive: false,
        affix: false
      }
    },
    {
      path: '/error/405',
      name: 'Error405',
      component: 'error/405',
      meta: {
        hidden: false,
        title: '405页',
        icon: 'icon-menu',
        keepAlive: false,
        affix: false
      }
    }
  ]
}
