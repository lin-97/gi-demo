<template>
  <div class="page">
    <a-resize-box :directions="['right']" :style="{ minWidth: '100px', maxWidth: '600px' }" v-model:width="width1">
      <section class="view-item">
        <h3>菜单数据</h3>
        <div class="code">
          <GiCodeView :codeJson="menuListJson"></GiCodeView>
        </div>
      </section>
    </a-resize-box>

    <a-resize-box :directions="['right']" :style="{ minWidth: '100px', maxWidth: '600px' }" v-model:width="width2">
      <section class="view-item">
        <h3>动态路由数据</h3>
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
path // 路由路径 必须的
name // 根据路由路径由系统自动生成
redirect // 路由重定向
component // 组件路径 一般来说一级路由的组件路径是默认布局Layout
type // 1目录  2菜单
title // 菜单标题
svgIcon // 自定义图标, 比icon优先级高
icon // arco组件库内置图标
keepAlive // 是否缓存 页面的name要跟路由的name保持一致才能缓存
hidden // 是否隐藏 如果为true则不显示在左侧菜单栏中
sort // 排序
activeMenu // 激活的菜单路径地址
breadcrumb // 是否显示在面包屑中, 默认true
affix // 是否在页签显示, 默认true, 例如详情页面不需要显示在页签上
alwaysShow // 总是显示
~~~

## 动态路由讲解
1. 菜单数据由 系统管理->菜单管理 页面配置，数据结构如最左图
2. 动态路由数据也是从后端接口返回，接口会根据菜单数据进行排序，根据用户或者用户当前角色进行过滤
3. 换句话说就是接口帮你排好序了，过滤好了，所以不用返回roles、permissions这两个属性了
4. 拿到动态路由数据后，只要把所有component由字符串转为真正的模块，再addRoute就完成了
~~~js
meta.breadcrumb 没有, 默认为true
meta.affix 没有, 默认为true
meta.alwaysShow 没有, 默认为false
meta.sort 没有, 默认为0

// type === 1 为目录
目录必须的meta属性有: hidden、keepAlive、title
目录独有的meta属性有: redirect、alwaysShow (菜单没有)

// type === 2 为菜单
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
