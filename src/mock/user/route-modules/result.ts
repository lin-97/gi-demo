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
      name: 'ResultSuccess',
      path: 'success',
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
      name: 'ResultFail',
      path: 'fail',
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
