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
import { mdText } from './md'

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
