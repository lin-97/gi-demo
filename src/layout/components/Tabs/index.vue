<!--
  @file Tabs 组件
  @description 系统标签页组件，支持多种标签样式、右键菜单和快捷操作
-->
<template>
  <a-tabs :key="appStore.tabStyle" :class="`tabs--${appStore.tabStyle}`" :type="tabsType" :active-key="route.path"
    editable hide-content size="medium" scroll-position="center" @tab-click="handleTabClick"
    @delete="tabsStore.close('current', $event as string)">
    <a-tab-pane v-for="item of tabsStore.tabList" :key="item.path" :title="(item.meta?.title as string)"
      :closable="!item.meta?.affix">
      <template v-if="appStore.tabStyle === 'custom2'" #title>
        <a-dropdown trigger="contextMenu">
          <a-tag class="tabs-pane__tag" :closable="!item.meta?.affix"
            :color="route.path === item.path ? 'rgb(var(--primary-6))' : undefined"
            :bordered="route.path === item.path ? false : true" @close="tabsStore.close('current', item.path)">
            {{ item.meta?.title }}
          </a-tag>
          <template #content>
            <a-doption @click="tabsStore.close('left', item.path)">
              <template #icon><icon-left /></template>
              <template #default>关闭左侧</template>
            </a-doption>
            <a-doption @click="tabsStore.close('right', item.path)">
              <template #icon><icon-right /></template>
              <template #default>关闭右侧</template>
            </a-doption>
            <a-doption @click="tabsStore.close('other', item.path)">
              <template #icon><icon-close /></template>
              <template #default>关闭其他</template>
            </a-doption>
          </template>
        </a-dropdown>
      </template>
    </a-tab-pane>

    <template #extra>
      <a-space size="medium">
        <ReloadIcon></ReloadIcon>
        <a-dropdown trigger="hover">
          <MagicIcon></MagicIcon>
          <template #content>
            <a-doption @click="tabsStore.close('left', route.path)">
              <template #icon><icon-left /></template>
              <template #default>关闭左侧</template>
            </a-doption>
            <a-doption @click="tabsStore.close('right', route.path)">
              <template #icon><icon-right /></template>
              <template #default>关闭右侧</template>
            </a-doption>
            <a-doption @click="tabsStore.close('other', route.path)">
              <template #icon><icon-close /></template>
              <template #default>关闭其他</template>
            </a-doption>
            <a-doption @click="tabsStore.close('all')">
              <template #icon><icon-delete /></template>
              <template #default>关闭全部</template>
            </a-doption>
          </template>
        </a-dropdown>
      </a-space>
    </template>
  </a-tabs>
</template>

<script setup lang="ts">
import type { TabsInstance } from '@arco-design/web-vue'
import Sortable from 'sortablejs'
import { useRouteListener } from '@/hooks'
import { useAppStore, useTabsStore } from '@/stores'
import MagicIcon from './MagicIcon.vue'
import ReloadIcon from './ReloadIcon.vue'

/** 组件名称 */
defineOptions({ name: 'Tabs' })
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabsStore = useTabsStore()
const { listenerRouteChange } = useRouteListener()
const tabsType = computed(() => {
  return (['custom1', 'custom2'].includes(appStore.tabStyle) ? 'card' : appStore.tabStyle) as unknown as TabsInstance['type']
})

/** 初始化标签页 */
tabsStore.init()

/** 监听路由变化 */
listenerRouteChange(({ to }) => {
  if (to.name) {
    const rawTo = toRaw(to)
    tabsStore.addTabItem(rawTo)
  }
})

/** 处理标签页点击 */
const handleTabClick: TabsInstance['onTabClick'] = (key) => {
  const targetTab = tabsStore.tabList.find((tab) => tab.path === key)
  router.push(targetTab?.fullPath || targetTab?.path || (key as string))
}

onMounted(() => {
  Sortable.create(document.querySelector('.arco-tabs-nav-tab-list') as HTMLElement, {
    draggable: '.arco-tabs-tab-closable',
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const tabsList = [...tabsStore.tabList]
      const currRow = tabsList.splice(oldIndex as number, 1)[0]
      tabsList.splice(newIndex as number, 0, currRow)
      tabsStore.tabList = tabsList
    }
  })
})
</script>

<style lang="scss" scoped>
:deep(.arco-tabs) {
  background-color: var(--color-bg-1);
}

:deep(.arco-tabs-nav-tab) {
  .arco-tabs-tab {
    border-bottom-color: transparent !important;

    svg {
      width: 0;
      transition: all 0.15s;
    }

    &:hover svg {
      width: 1em;
    }
  }
}

.tabs--card {
  :deep(.arco-tabs-nav-type-card) {
    &::before {
      z-index: 9;
    }

    .arco-tabs-tab {
      border-top: none;
    }

    &:not(.arco-tabs-nav-tab-scroll) .arco-tabs-tab:first-child {
      border-left: 0;
    }
  }
}

.tabs--card-gutter {
  padding-top: 4px;
  padding-left: 4px;
}

.tabs--rounded {
  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 1px;
    content: '';
    background-color: var(--color-border-2);
  }

  :deep(.arco-tabs-nav-type-rounded .arco-tabs-tab) {
    padding: 2px 12px;
    margin: 5px;
  }
}

// 自定义样式1
.tabs--custom1 {
  padding-top: 4px;

  :deep(.arco-tabs-nav-tab) {
    .arco-tabs-tab {
      padding: 5px 20px;
      border: none;
      mask: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==");
      mask: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==");
      mask-size: 100% 100%;
      mask-size: 100% 100%;
    }
  }

  :deep(.arco-tabs-nav-tab-list) {
    .arco-tabs-tab-active {
      padding: 5px 20px;
      background-color: rgb(var(--primary-6), 0.1);
      mask: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==");
      mask: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==");
      mask-size: 100% 100%;
      mask-size: 100% 100%;

      &:hover {
        padding: 5px 20px;
        background-color: rgb(var(--primary-6), 0.1);
      }
    }
  }
}

// 自定义样式2
.tabs--custom2 {
  :deep(.arco-tabs-nav) {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 6px;

    .arco-tabs-nav-tab-list {
      display: flex;
      gap: 0 8px;
    }

    .arco-tabs-tab {
      padding: 0;
      border: 0;

      .arco-tabs-tab-close-btn {
        display: none;
      }

      &:hover {
        background-color: transparent;
      }
    }

    .tabs-pane__tag {
      height: 26px;
      border-radius: 3px;
    }
  }
}
</style>
