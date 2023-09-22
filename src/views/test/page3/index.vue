<template>
  <div class="page">
    <a-resize-box :directions="['right']" :style="{ minWidth: '100px', maxWidth: '600px' }" v-model:width="width1">
      <section class="view-item">
        <h3 class="gi_line_1">菜单数据</h3>
        <div class="code">
          <GiCodeView :codeJson="menuListJson"></GiCodeView>
        </div>
      </section>
    </a-resize-box>

    <a-resize-box :directions="['right']" :style="{ minWidth: '100px', maxWidth: '600px' }" v-model:width="width2">
      <section class="view-item">
        <h3 class="gi_line_1">动态路由数据</h3>
        <div class="code">
          <GiCodeView :codeJson="routeListJson"></GiCodeView>
        </div>
      </section>
    </a-resize-box>

    <section class="md-item">
      <div class="md">
        <MdPreview :modelValue="mdText"></MdPreview>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { getSystemMenuList, getUserAsyncRoutes, type MenuItem } from '@/apis'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const width1 = ref(400)
const width2 = ref(400)

const menuList = ref<MenuItem[]>([])
const menuListJson = computed(() => JSON.stringify(menuList.value, null, '\t'))
const getMenuList = async () => {
  try {
    const res = await getSystemMenuList()
    menuList.value = res.data
  } catch (error) {
  } finally {
  }
}
getMenuList()

const routeList = ref<any>([])
const routeListJson = computed(() => JSON.stringify(routeList.value, null, '\t'))
const getRouteList = async () => {
  try {
    const res = await getUserAsyncRoutes()
    routeList.value = res.data
  } catch (error) {
  } finally {
  }
}
getRouteList()

const mdText = `
## 菜单数据讲解
系统管理-菜单管理的基本数据结构说明
~~~
路由数据由菜单数据转换得来
~~~

## 动态路由讲解
1. 菜单数据由 系统管理->菜单管理 页面配置，数据结构如最左图
2. 动态路由数据也是从后端接口返回，接口会根据菜单数据进行排序，根据用户或者用户当前角色进行过滤
3. 换句话说就是接口帮你排好序了, 过滤好了, 所以不用返回roles这个属性了
4. 拿到动态路由数据后, 只要把所有component由字符串转为真正的模块，再addRoute就完成了
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
    affix: true, // 默认 true, 如果为 false, 则不会显示在页签中
    // 当一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式
    // 只有一个时, 会将那个子路由当做根路由显示在侧边栏
    // 若想不管路由下面的 children 声明的个数都显示你的根路由
    // 可以设置 alwaysShow: true, 这样就会忽略之前定义的规则, 一直显示根路由
    alwaysShow: true
  }
}

// type === 1 为目录
目录主要的meta属性有: hidden、keepAlive、title
目录独有的meta属性有: redirect、alwaysShow

// type === 2 为菜单
菜单主要的meta属性有: hidden、keepAlive、title
其他属性没有返回的就按默认值来处理
~~~
`
</script>

<style lang="scss" scoped>
.page {
  flex: 1;
  overflow: hidden;
  background-color: var(--color-bg-1);
  display: flex;
  justify-content: stretch;
  padding: $padding;
  box-sizing: border-box;
  .view-item {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    h3 {
      margin-bottom: 10px;
      padding-left: 10px;
    }
    .code {
      width: 100%;
      flex: 1;
      overflow: auto;
    }
  }
  .md-item {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    margin-left: 14px;
    .md {
      border: 1px solid var(--color-border-2);
      border-radius: 6px;
      overflow: hidden;
      :deep(.md-editor-preview-wrapper) {
        overflow: hidden;
      }
    }
  }
}
</style>
