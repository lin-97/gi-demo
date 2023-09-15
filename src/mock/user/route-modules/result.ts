export default {
  name: 'Result',
  path: '/result',
  redirect: '/result/success',
  component: 'Layout',
  meta: {
    hidden: false,
    title: '结果页',
    svgIcon: 'menu-result',
    keepAlive: false
  },
  children: [
    {
      path: '/result/success',
      name: 'ResultSuccess',
      component: 'result/success/index',
      meta: {
        hidden: false,
        title: '成功页',
        icon: 'icon-menu',
        keepAlive: false,
        affix: false
      }
    },
    {
      path: '/result/fail',
      name: 'ResultFail',
      component: 'result/fail/index',
      meta: {
        hidden: false,
        title: '失败页',
        icon: 'icon-menu',
        keepAlive: false,
        affix: false
      }
    }
  ]
}
