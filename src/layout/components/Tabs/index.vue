<template>
  <div class="tabs" v-if="appStore.tab">
    <a-tabs
      editable
      hide-content
      size="medium"
      :type="appStore.tabMode"
      :active-key="route.path"
      @tab-click="(key) => handleTabClick(key.toString())"
      @delete="tabsStore.closeCurrent"
    >
      <a-tab-pane
        v-for="item of tabsStore.tagList"
        :key="item.path"
        :title="(item.meta?.title as string)"
        :closable="item.path !== '/index'"
      ></a-tab-pane>
      <!-- 右侧按钮 -->
      <template #extra>
        <a-dropdown trigger="hover">
          <MagicIcon class="mr"></MagicIcon>
          <template #content>
            <a-doption @click="tabsStore.closeCurrent(route.path)">
              <template #icon><icon-close /></template>
              <template #default>关闭当前</template>
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
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts" name="NavTab">
import type { RouteRecordRaw } from 'vue-router'
import { useTabsStore, useAppStore } from '@/store'
import MagicIcon from './MagicIcon.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabsStore = useTabsStore()

tabsStore.reset()

// 监听路由变化
watch(
  () => route.path,
  () => {
    nextTick(() => {
      handleRouteChange()
    })
  },
  { immediate: true }
)

// 路由发生改变触发
const handleRouteChange = () => {
  const item = { ...route } as unknown as RouteRecordRaw
  tabsStore.addTagItem(item)
  tabsStore.addCacheItem(item)
  console.log('路由对象', item)
  console.log('tagList', tabsStore.tagList)
  console.log('cacheList', tabsStore.cacheList)
}

// 点击页签
const handleTabClick = (key: string) => {
  router.push({ path: key })
}
</script>

<style lang="scss" scoped>
:deep(.arco-tabs-tab) {
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

:deep(.arco-tabs-tab-active) {
  background-color: rgba(var(--primary-6), $alpha: 0.05);
  &:hover {
    background-color: rgba(var(--primary-6), $alpha: 0.05);
  }
  .arco-tabs-tab-close-btn {
    &:hover {
      &::before {
        background-color: rgba(var(--primary-6), $alpha: 0.1) !important;
      }
    }
  }
}

:deep(.arco-dropdown-option-icon) {
  color: var(--color-text-3);
}

.tabs {
  padding-top: 5px;
  background: var(--color-bg-1);
}

.mr {
  margin-right: $margin;
}
</style>
