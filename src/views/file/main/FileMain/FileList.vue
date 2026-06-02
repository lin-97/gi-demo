<template>
  <div class="file-list">
    <a-table row-key="id" :scroll="{ x: '100%', y: '100%', minWidth: 800 }" :data="props.data" :bordered="false"
      :pagination="false" :row-selection="isBatchMode ? rowSelection : undefined" :selected-keys="selectedFileIds"
      @select="select" @row-click="handleRowClick">
      <template #columns>
        <a-table-column title="名称">
          <template #cell="{ record }">
            <a-trigger trigger="contextMenu" align-point animation-name="slide-dynamic-origin" auto-fit-transform-origin
              position="bl" update-at-scroll scroll-to-close>
              <section class="file-list__name">
                <div class="file-list__icon">
                  <FileImage :data="record"></FileImage>
                </div>
                <span class="file-list__label">{{ record.name }}</span>
              </section>
              <template #content>
                <FileRightMenu :data="record" @click="handleRightMenuClick($event, record)"></FileRightMenu>
              </template>
            </a-trigger>
          </template>
        </a-table-column>
        <a-table-column title="文件大小（kb）" data-index="size" :width="150">
          <template #cell="{ record }">{{ record.size }}</template>
        </a-table-column>
        <a-table-column title="扩展名" data-index="extendName" :width="100">
          <template #cell="{ record }">
            <a-tag v-if="record.extendName" size="small" color="purple">{{ record.extendName }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="更改时间" data-index="updateTime" :width="200"></a-table-column>
        <a-table-column title="操作" :width="120" align="center">
          <template #cell="{ record }">
            <a-popover trigger="click" position="bottom" :content-style="{ 'padding': 0, 'margin-top': 0 }">
              <a-button type="text" @click.stop><icon-more :size="16" /></a-button>
              <template #content>
                <FileRightMenu :file-info="record" :shadow="false" @click="handleRightMenuClick($event, record)">
                </FileRightMenu>
              </template>
            </a-popover>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import type { TableInstance, TableRowSelection } from '@arco-design/web-vue'
import type { FileItem } from '@/apis/file'

defineOptions({ name: 'FileList' })

interface Props {
  data?: FileItem[]
  selectedFileIds?: string[]
  isBatchMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  selectedFileIds: () => [],
  isBatchMode: false
})

const emit = defineEmits<{
  (e: 'click', record: FileItem): void
  (e: 'select', record: FileItem): void
  (e: 'right-menu-click', mode: string, item: FileItem): void
}>()

const FileImage = defineAsyncComponent(() => import('./FileImage.vue'))
const FileRightMenu = defineAsyncComponent(() => import('./FileRightMenu.vue'))

const rowSelection: TableRowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true
})

const select: TableInstance['onSelect'] = (rowKeys, rowKey, record) => {
  emit('select', record as unknown as FileItem)
}

const handleRowClick: TableInstance['onRowClick'] = (record) => {
  emit('click', record as unknown as FileItem)
}

const handleRightMenuClick = (mode: string, item: FileItem) => {
  emit('right-menu-click', mode, item)
}
</script>

<style lang="scss" scoped>
.file-list {
  width: 100%;
  overflow: hidden;

  :deep(.arco-table-td .arco-table-cell) {
    padding-top: 0;
    padding-bottom: 0;
  }

  &__name {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 6px 0;
    cursor: pointer;
  }

  &__icon {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  &__label {
    flex: 1;
    min-width: 0;
  }
}
</style>
