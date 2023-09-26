import { includes } from 'lodash'

export const mdText = `
## 菜单数据讲解
系统管理-菜单管理的基本数据结构说明
~~~
路由数据由菜单数据转换得来
// type === 1 为目录
// type === 2 为菜单
// type === 3 为按钮
~~~

## 动态路由讲解
1. 菜单数据由 系统管理->菜单管理 页面配置，数据结构如最左图
2. 动态路由数据也是从后端接口返回, 接口会根据菜单数据进行排序, 根据用户或者用户当前角色进行过滤
3. 换句话说就是接口帮你排好序了, 过滤好了, 所以不用返回roles这个属性了
4. 拿到动态路由数据后, 只要把所有component由字符串转为真正的模块, 再addRoute就完成了
5. 其实也可以前端拿到数据进行排序和过滤, 这里看沟通和抉择
~~~js
{
  path: '', // 路由路径（必填）
  name: '', // 路由名称, 由系统根据路由路径自动生成, 如 /system/menu => SystemMenu
  redirect: '', // 路由重定向
  component: '', // 组件路径
  meta: {
    title: '', // 该路由在侧边栏和面包屑中展示的名字
    svgIcon: '', // 自定义图标, 比 icon 优先级高
    icon: '', // arco 组件库内置图标
    keepAlive: false, // 是否缓存, 默认 false, 页面的name要跟路由的name保持一致才能缓存
    hidden: false, // 默认 false, 设置 true 的时候该路由不会在侧边栏出现
    sort: '', // 排序
    // 示例: activeMenu: "/data/detail"
    // 当设置了该属性进入路由时, 则会高亮 activeMenu 属性对应的侧边栏
    // 该属性适合使用在有 hidden: true 属性的路由上
    activeMenu: '/data',
    breadcrumb: true, // 默认 true, 如果设置为 false, 则不会在面包屑中显示
    showInTabs: true, // 默认 true, 如果为 false, 则不会显示在页签中
    affix: false, // 默认 false, 如果设置为 true, 它则会固定在 Tab栏 中, 例如首页
    // 当一个路由下面的 children 声明的路由大于1个时, 自动会变成嵌套的模式
    // 只有一个时, 会将那个子路由当做根路由显示在侧边栏
    // 若想不管路由下面的 children 声明的个数都显示你的根路由
    // 可以设置 alwaysShow: true, 这样就会忽略之前定义的规则, 一直显示根路由
    alwaysShow: true
  }
}
~~~

## 前端处理排序过滤
~~~
// 不想自己写递归的话, 系统内置了两个方法, 基于 xe-utils 的 mapTree 封装
// 也可以自己封装, 同时把过滤和排序一起做了, 少一次树遍历, 这里只是提供简单使用参考
// 另外 xe-utils 还提供其他树操作方法: findTree、eachTree、mapTree、searchTree(相当于filterTree, 但是不完全一样, 如果子节点没children, searchTree 会自动补 children:[])
// 系统用了比较多 xe-utils 工具的树方法, 代码也会比较浅显易懂
import { filterTree, sortTree } from '@/utils/common'

const data = filterTree(menus, (i) => i.roles.includes('role_user'))
const sortData = sortTree(data)
~~~

~~~
import { filterTree } from '@/utils/common'

// 过滤和排序(示例)
const getFilterAndSortData = (value) => {
  value.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0))
  const data = filterTree(value, (i) => {
    i.children?.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0))
    return i.roles.includes('role_user')
  })
  return data
}
~~~
`
