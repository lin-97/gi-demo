export default {
  path: '',
  redirect: '/about',
  component: 'Layout',
  meta: { sort: 12 },
  children: [
    {
      path: '/about',
      name: 'About',
      component: 'about/index',
      meta: {
        hideen: false,
        title: '关于我们',
        svgIcon: 'menu-about',
        keepAlive: false
      }
    }
  ]
}
