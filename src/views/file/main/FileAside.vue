<template>
  <div class="file-aside" v-if="windowWidth > 715">
    <a-card title="文件管理" :bordered="false" :body-style="{ padding: 0 }">
      <a-menu
        :style="{ width: '220px', height: '100%', 'border-radius': '2px' }"
        :default-open-keys="['0']"
        :default-selected-keys="[currentKey]"
      >
        <a-sub-menu key="0">
          <template #icon>
            <icon-apps></icon-apps>
          </template>
          <template #title>文件类型</template>
          <a-menu-item :key="item.value.toString()" v-for="item in fileTypeList" @click="onClickMenuItem(item)">
            <template #icon>
              <GiSvgIcon :size="28" :name="item.menuIcon"></GiSvgIcon>
            </template>
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { fileTypeList, type fileTypeListItem } from '@/libs/file/file-map'
const route = useRoute()
const router = useRouter()

const { width: windowWidth } = useWindowSize()

const currentKey = ref('0')

// 监听路由变化
watch(
  () => route.query,
  () => {
    if (route.query.fileType) {
      currentKey.value = route.query.fileType.toString()
    }
  },
  {
    immediate: true
  }
)

// 点击事件
const onClickMenuItem = (item: fileTypeListItem) => {
  router.push({ path: '/file', query: { fileType: item.value } })
}
</script>

<style lang="scss" scoped>
:deep(.arco-card) {
  .arco-card-header {
    border-bottom-style: dashed;
    margin: 0 16px;
    padding-left: 0;
    padding-right: 0;
  }
}
.file-aside {
  height: fit-content;
  margin: $margin 0 $margin $margin;
  background: var(--color-bg-1);
  border-radius: 2px;
}
</style>
