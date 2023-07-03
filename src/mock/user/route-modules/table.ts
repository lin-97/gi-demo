export default {
  name: 'Table',
  path: '/table',
  redirect: '/table/base',
  component: 'Layout',
  meta: {
    hidden: false,
    alwaysShow: true,
    title: '表格管理',
    svgIcon: 'menu-table',
    keepAlive: false
  },
  children: [
    {
      name: 'TableMain',
      path: 'base',
      component: 'table/base/index',
      meta: {
        hidden: false,
        title: '基础表格',
        icon: 'icon-menu',
        keepAlive: false
      }
    },
    {
      name: 'TableCustom',
      path: 'custom',
      component: 'table/custom/index',
      meta: {
        hidden: false,
        title: '自定义表单',
        icon: 'icon-menu',
        keepAlive: false
      }
    }
  ]
}
