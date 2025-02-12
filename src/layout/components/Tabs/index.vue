<template>
  <div v-if="appStore.tab" class="tabs">
    <a-tabs :class="`tabs__${appStore.tabMode}`" editable hide-content size="medium" :type="tabsType"
      :active-key="route.path" @tab-click="handleTabClick($event as string)"
      @delete="tabsStore.closeCurrent($event as string)">
      <a-tab-pane v-for="item of tabsStore.tabList" :key="item.path" :title="(item.meta?.title as string)"
        :closable="Boolean(!item.meta?.affix)">
        <template v-if="appStore.tabMode === 'custom2'" #title>
          <a-dropdown trigger="contextMenu">
            <a-tag class="tabs-pane__tag" closable :color="route.path === item.path ? 'arcoblue' : undefined"
              @close="tabsStore.closeCurrent(item.path)">
              {{ item.meta?.title }}
            </a-tag>
            <template #content>
              <a-doption @click="tabsStore.closeCurrent(item.path)">
                <template #icon><icon-close /></template>
                <template #default>关闭当前</template>
              </a-doption>
              <a-doption @click="tabsStore.closeRight(item.path)">
                <template #icon><icon-close /></template>
                <template #default>关闭右侧</template>
              </a-doption>
              <a-doption @click="tabsStore.closeOther(item.path)">
                <template #icon><icon-eraser /></template>
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
            <MagicIcon class="gi_mr"></MagicIcon>
            <template #content>
              <a-doption @click="tabsStore.closeCurrent(route.path)">
                <template #icon><icon-close /></template>
                <template #default>关闭当前</template>
              </a-doption>
              <a-doption @click="tabsStore.closeRight(route.path)">
                <template #icon><icon-close /></template>
                <template #default>关闭右侧</template>
              </a-doption>
              <a-doption @click="tabsStore.closeOther(route.path)">
                <template #icon><icon-eraser /></template>
                <template #default>关闭其他</template>
              </a-doption>
              <a-doption @click="tabsStore.closeAll">
                <template #icon><icon-minus /></template>
                <template #default>关闭全部</template>
              </a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import type { TabsInstance } from '@arco-design/web-vue'
import MagicIcon from './MagicIcon.vue'
import ReloadIcon from './ReloadIcon.vue'
import { useAppStore, useTabsStore } from '@/stores'

defineOptions({ name: 'Tabs' })
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabsStore = useTabsStore()
const tabsType = computed(() => {
  return (['custom1', 'custom2'].includes(appStore.tabMode) ? 'card' : appStore.tabMode) as unknown as TabsInstance['type']
})

tabsStore.init()

// 监听路由变化
watch(
  () => route.fullPath,
  () => {
    handleRouteChange()
  }
)

// 路由发生改变触发
function handleRouteChange() {
  const item = { ...route } as unknown as RouteLocationNormalized
  tabsStore.addTabItem(toRaw(item))
  tabsStore.addCacheItem(toRaw(item))
  // console.log('路由对象', toRaw(item))
  // console.log('tagList', toRaw(tabsStore.tabList))
  // console.log('cacheList', toRaw(tabsStore.cacheList))
}
handleRouteChange()

// 点击页签
const handleTabClick = (key: string) => {
  const obj = tabsStore.tabList.find((i) => i.path === key)
  obj ? router.push(obj.fullPath || obj.path) : router.push(key)
}
</script>

<style lang="scss" scoped>
:deep(.arco-tabs-nav-tab) {
  .arco-tabs-tab {
    border-bottom-color: transparent !important;

    svg {
      width: 0;
      transition: all 0.15s;
    }

    &:hover {
      svg {
        width: 1em;
      }
    }
  }

  &:not(.arco-tabs-nav-tab-scroll) {
    .arco-tabs-tab:first-child {
      border-left: 0;
    }
  }
}

// tabs样式-自定义类型1
:deep(.tabs__custom1) {
  .arco-tabs-nav-tab {
    .arco-tabs-tab {
      padding: 5px 20px;
      border: none;
      -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }
  }

  .arco-tabs-nav-tab-list {
    .arco-tabs-tab-active {
      background-color: rgba(var(--primary-6), 0.1);
      padding: 5px 20px;
      -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;

      &:hover {
        padding: 5px 20px;
        background-color: rgba(var(--primary-6), 0.1);
        -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
        mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
      }
    }
  }
}

// tabs样式-自定义类型2
:deep(.tabs__custom2) {
  .arco-tabs-nav {
    padding-bottom: 6px;
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
}

:deep(.arco-dropdown-option-icon) {
  color: var(--color-text-3);
}

.tabs {
  padding-top: 5px;
  background-color: var(--color-bg-1);

  .tabs-pane__tag {
    margin: 0 4px;
  }
}
</style>
