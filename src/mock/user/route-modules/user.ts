export default {
  path: '/user',
  name: 'User',
  component: 'Layout',
  // redirect: '/user/index',
  meta: {
    hideen: false,
    title: '个人中心',
    icon: 'icon-list',
    svgIcon: 'menu-user',
    keepAlive: true
  },
  children: [
    {
      name: 'User',
      path: '',
      component: 'user/index',
      redirect: '/user/index',
      meta: {
        hidden: true,
        title: '',
        icon: 'icon-list',
        keepAlive: true
        // affix: false
      },
      children: [
        {
          name: 'UserIndex',
          path: 'index',
          component: 'user/pages/index/index',
          meta: {
            hidden: true,
            title: '个人中心',
            icon: 'icon-list',
            keepAlive: false,
            animation: false
            // affix: false
          }
        },
        {
          name: 'UserNotice',
          path: 'notice',
          component: 'user/pages/notice/index',
          meta: {
            hidden: true,
            title: '消息通知',
            icon: 'icon-list',
            keepAlive: true
            // affix: false
          }
        }
      ]
    }
  ]
}
