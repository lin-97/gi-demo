<template>
  <div class="nav-tab" v-if="appStore.tab">
    <a-tabs
      editable
      hide-content
      size="medium"
      :type="appStore.tabMode"
      :active-key="route.path"
      @tab-click="onClick"
      @delete="navtabStore.closeCurrent"
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
          <GiMoreIcon class="mr"></GiMoreIcon>
          <template #content>
            <a-doption @click="navtabStore.closeCurrent(route.path)">
              <template #icon><icon-close /></template>
              <template #default>关闭当前</template>
            </a-doption>
            <a-doption @click="navtabStore.closeOther(route.path)">
              <template #icon><icon-eraser /></template>
              <template #default>关闭其他</template>
            </a-doption>
            <a-doption @click="navtabStore.closeAll">
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
import { watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavTabStore, useAppStore } from '@/store'

const route = useRoute()
const router = useRouter()
const navtabStore = useNavTabStore()
const appStore = useAppStore()

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
  router.push({ path: String(key) })
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

.nav-tab {
  padding-top: 5px;
  background: var(--color-bg-1);
}

.mr {
  margin-right: $margin;
}
</style>
