export default {
  path: '',
  name: 'Table',
  redirect: '/table/base',
  component: 'Layout',
  meta: {
    hidden: false,
    alwaysShow: true,
    title: '表格管理',
    svgIcon: 'menu-table',
    keepAlive: false,
    sort: 6
  },
  children: [
    {
      path: '/table/base',
      name: 'TableBase',
      component: 'table/base/index',
      meta: {
        hidden: false,
        title: '基础表格',
        icon: 'icon-menu',
        keepAlive: false
      }
    },
    {
      path: '/table/custom',
      name: 'TableCustom',
      component: 'table/custom/index',
      meta: {
        hidden: false,
        title: '自定义表格',
        icon: 'icon-menu',
        keepAlive: false
      }
    }
  ]
}
