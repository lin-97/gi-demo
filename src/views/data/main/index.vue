<template>
  <GiPageLayout margin :header-bordered="false" :header-style="{ padding: 0 }" :body-style="{ padding: 0 }">
    <template #header>
      <a-tabs hide-content size="medium" :active-key="activeKey" @change="change">
        <a-tab-pane :key="1" title="人员管理"> </a-tab-pane>
        <a-tab-pane :key="2" title="单位管理"> </a-tab-pane>
      </a-tabs>
    </template>

    <transition name="fade-slide" mode="out-in" appear>
      <keep-alive>
        <component :is="PaneMap[activeKey]"></component>
      </keep-alive>
    </transition>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { useRouteListener } from '@/hooks'
import Pane1 from './Pane1.vue'
import Pane2 from './Pane2.vue'

defineOptions({ name: 'DataIndex' })
const route = useRoute()
const router = useRouter()
const { listenerRouteChange } = useRouteListener()
const PaneMap: Record<number, Component> = {
  1: Pane1,
  2: Pane2
}

const activeKey = ref(1)

listenerRouteChange(({ to }) => {
  if (to.query.tabKey) {
    activeKey.value = Number(to.query.tabKey)
  }
})

const change = (key: number | string) => {
  activeKey.value = key as number
  router.replace({ path: route.path, query: { tabKey: key } })
}
</script>

<style lang="scss" scoped></style>
