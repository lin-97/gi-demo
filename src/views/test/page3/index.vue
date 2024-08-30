<template>
  <div class="page">
    <a-resize-box v-model:width="width1" :directions="['right']" :style="{ minWidth: '100px', maxWidth: '600px' }">
      <section class="pane">
        <h3 class="gi_line_1">菜单数据</h3>
        <div class="pane__code">
          <GiCodeView :code-json="menuListJson"></GiCodeView>
        </div>
      </section>
    </a-resize-box>

    <a-resize-box v-model:width="width2" :directions="['right']" :style="{ minWidth: '100px', maxWidth: '600px' }">
      <section class="pane">
        <h3 class="gi_line_1">前端格式化、排序后的路由</h3>
        <div class="pane__code">
          <GiCodeView :code-json="routeListJson"></GiCodeView>
        </div>
      </section>
    </a-resize-box>

    <section class="pane-md">
      <div class="pane-md__wrap">
        <MdPreview :model-value="mdText"></MdPreview>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { mdText } from './md'
import { type SystemMenuItem, getSystemMenuList } from '@/apis/system'
import { useRouteStore } from '@/stores'

const routeStore = useRouteStore()
const width1 = ref(400)
const width2 = ref(400)

const menuList = ref<SystemMenuItem[]>([])
const menuListJson = computed(() => JSON.stringify(menuList.value, null, '\t'))
const getMenuList = async () => {
  const res = await getSystemMenuList()
  menuList.value = res.data
}
getMenuList()

const routeListJson = computed(() => JSON.stringify(toRaw(routeStore.asyncRoutes), null, '\t'))
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
}

.pane {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h3 {
    margin-bottom: 10px;
    padding-left: 10px;
  }

  &__code {
    width: 100%;
    flex: 1;
    overflow: auto;
  }
}

.pane-md {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  margin-left: 14px;

  &__wrap {
    border: 1px solid var(--color-border-2);
    border-radius: 6px;
    overflow: hidden;

    :deep(.md-editor-preview-wrapper) {
      overflow: hidden;
    }
  }
}
</style>
