<template>
  <div class="nav-tab" v-if="themeStore.tab">
    <a-tabs
      editable
      hide-content
      size="medium"
      :type="themeStore.tabMode"
      :active-key="route.path"
      @tab-click="onClick"
      @delete="onClose"
    >
      <a-tab-pane
        v-for="item of navtabStore.tagList"
        :key="item.path"
        :title="item.name"
        :closable="item.path !== '/home'"
      ></a-tab-pane>
      <!-- 右侧按钮 -->
      <template #extra>
        <a-dropdown trigger="hover">
          <a-button type="primary" class="extra-btn">
            <template #icon>
              <icon-settings :size="18" />
            </template>
          </a-button>
          <template #content>
            <a-doption @click="onClose(route.path)"
              ><template #icon>
                <icon-minus-circle-fill :size="20" style="color: #ff7d00" />
              </template>
              <template #default>关闭当前页签</template></a-doption
            >
            <a-doption @click="onCloseAll"
              ><template #icon>
                <icon-close-circle-fill :size="20" style="color: #f53f3f" />
              </template>
              <template #default>关闭所有页签</template></a-doption
            >
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts" name="NavTab">
import { watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavTabStore, useThemeStore, useAppStore } from '@/store'
import type { NavTabItem } from './type'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const navtabStore = useNavTabStore()
const themeStore = useThemeStore()

onMounted(() => {
  handleNavTab()
})

// 监听路由变化
watch(
  () => route.path,
  () => {
    handleNavTab()
  }
)

const handleNavTab = () => {
  // console.log('路由变化', newVal)
  // console.log('路由对象', route)
  navtabStore.addTagItem({
    name: route.meta.title || '未命名',
    path: route.path,
    componentName: route.name
  } as NavTabItem)
  if (route.meta.keepAlive) {
    navtabStore.addCacheItem(String(route.name))
  }
}

// 点击页签
const onClick = (key: string | number) => {
  // console.log('点击前', navtabStore.cacheList, key)
  router.push({ path: key.toString() })
  appStore.setActivePath(key.toString())
}

// 关闭页签
const onClose = (key: string | number) => {
  const item = navtabStore.tagList.find((i) => i.path === key)
  navtabStore.removeTagItem(key.toString())
  if (item?.componentName) {
    navtabStore.removeCacheItem(item.componentName)
  }
}

// 关闭所有页签
const onCloseAll = () => {
  navtabStore.clearTagList()
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

.nav-tab {
  padding-top: 5px;
  background: var(--color-bg-2);
}

.extra-btn {
  margin-right: 14px;
  margin-bottom: 5px;
  &:hover {
    svg {
      animation: turn 0.5s linear;
      transform-origin: center;
    }
  }
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
  }
}
</style>
