<template>
  <div class="nav-tab">
    <a-tabs type="card-gutter" editable v-model:active-key="route.path" @tab-click="onClick" @delete="onClose">
      <a-tab-pane
        v-for="item of navtabStore.tabList"
        :key="item.path"
        :title="item.name"
        :closable="item.path !== '/home'"
      ></a-tab-pane>
      <template #extra>
        <a-button type="primary" style="margin-right: 14px; margin-bottom: 5px">
          <template #icon>
            <icon-settings :size="18" />
          </template>
        </a-button>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavTabStore } from '@/store'

const route = useRoute()
const router = useRouter()
const navtabStore = useNavTabStore()

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
  navtabStore.addTabItem({
    name: route.meta.title || '未命名',
    path: route.path,
    componentName: route.name
  })
  if (route.meta.keepAlive) {
    navtabStore.addCacheItem(route.name)
  }
}

// 点击页签
const onClick = (key: string) => {
  console.log('点击前', navtabStore.cacheList)
  router.push({ path: key })
}

// 关闭页签
const onClose = (key: string) => {
  let item = navtabStore.tabList.find((i) => i.path === key)
  navtabStore.removeTabItem(key, route, router)
  navtabStore.removeCacheItem(item.componentName)
  console.log('关闭后', navtabStore.cacheList)
}
</script>

<style lang="scss" scoped>
:deep(.arco-tabs-content) {
  padding-top: 0;
  border: none;
}
.nav-tab {
  padding-top: 5px;
  background: var(--color-bg-2);
}
</style>
