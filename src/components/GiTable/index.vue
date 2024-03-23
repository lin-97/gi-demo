<template>
  <div class="gi-table" :class="{ 'gi-table--fullscreen': isFullscreen }" ref="giTableRef">
    <a-row justify="space-between" align="center">
      <a-space wrap>
        <slot name="custom-title">
          <div class="gi-table__title">{{ props.title }}</div>
        </slot>
      </a-space>
      <a-space wrap>
        <slot name="custom-extra"></slot>

        <a-space wrap :size="[14, 0]">
          <a-tooltip content="斑马纹">
            <a-switch v-model="stripe" size="small" type="round" />
          </a-tooltip>
          <a-tooltip content="刷新">
            <a-button size="mini" class="gi_hover_btn" @click="refresh">
              <template #icon><icon-refresh :size="18" /></template>
            </a-button>
          </a-tooltip>
          <a-tooltip content="全屏">
            <a-button size="mini" class="gi_hover_btn" @click="isFullscreen = !isFullscreen">
              <template #icon>
                <icon-fullscreen :size="18" v-if="!isFullscreen" />
                <icon-fullscreen-exit :size="18" v-else />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip content="显示边框">
            <a-button size="mini" class="gi_hover_btn" @click="isBordered = !isBordered">
              <template #icon>
                <icon-borders />
              </template>
            </a-button>
          </a-tooltip>

          <a-dropdown @select="handleSelect">
            <a-tooltip content="表格尺寸">
              <a-button size="mini" class="gi_hover_btn">
                <template #icon>
                  <icon-table-size />
                </template>
              </a-button>
            </a-tooltip>
            <template #content>
              <a-doption v-for="item in sizeList" :key="item.value" :value="item.value" :active="item.value === size">{{
                item.label
              }}</a-doption>
            </template>
          </a-dropdown>

          <a-popover
            v-if="showSettingColumnBtn"
            trigger="click"
            position="br"
            :content-style="{ minWidth: '120px', padding: '6px 8px 10px' }"
          >
            <a-button type="primary" size="mini">
              <template #icon>
                <icon-settings />
              </template>
            </a-button>
            <template #content>
              <div class="gi-table__draggable">
                <VueDraggable ref="el" v-model="settingColumnList">
                  <div v-for="item in settingColumnList" :key="item.title" class="drag-item">
                    <div class="drag-item__move"><icon-drag-dot-vertical /></div>
                    <a-checkbox v-model:model-value="item.show" :disabled="item.disabled">{{ item.title }}</a-checkbox>
                  </div>
                </VueDraggable>
              </div>
              <a-divider :margin="6" />
              <a-row justify="center">
                <a-button type="primary" size="mini" long @click="resetSettingColumns">
                  <template #icon><icon-refresh /></template>
                  <template #default>重置</template>
                </a-button>
              </a-row>
            </template>
          </a-popover>
        </a-space>
      </a-space>
    </a-row>
    <div class="gi-table__container">
      <a-table
        ref="tableRef"
        :stripe="stripe"
        :size="size"
        :bordered="{ cell: isBordered }"
        v-bind="{ ...attrs, columns: _columns }"
      >
        <template v-for="key in Object.keys(slots)" :key="key" #[key]="scoped">
          <slot :key="key" :name="key" v-bind="scoped"></slot> </template
      ></a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableInstance, TableColumnData, DropdownInstance } from '@arco-design/web-vue'
import { VueDraggable } from 'vue-draggable-plus'

defineOptions({ name: 'GiTable', inheritAttrs: false })
const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const attrs = useAttrs()
const slots = useSlots()

interface Props {
  title?: string
  disabledColumnKeys?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  disabledColumnKeys: () => [] // 禁止控制显示隐藏的列
})

const tableRef = ref<TableInstance | null>(null)
const stripe = ref(false)
const size = ref<TableInstance['size']>('small')
const isBordered = ref(true)
const isFullscreen = ref(false)

type SizeItem = { label: string; value: TableInstance['size'] }
const sizeList: SizeItem[] = [
  { label: '小', value: 'mini' },
  { label: '默认', value: 'small' },
  { label: '中', value: 'medium' },
  { label: '大', value: 'large' }
]

const refresh = () => {
  emit('refresh')
}

const handleSelect: DropdownInstance['onSelect'] = (value) => {
  size.value = value as TableInstance['size']
}

const showSettingColumnBtn = computed(() => attrs?.columns && (attrs?.columns as TableColumnData[])?.length)
type SettingColumnItem = { title: string; key: string; show: boolean; disabled: boolean }
const settingColumnList = ref<SettingColumnItem[]>([])

// 重置配置列
const resetSettingColumns = () => {
  settingColumnList.value = []
  if (attrs.columns) {
    const arr = attrs.columns as TableColumnData[]
    arr.forEach((item) => {
      settingColumnList.value.push({
        key: item.dataIndex || (typeof item.title === 'string' ? item.title : ''),
        title: typeof item.title === 'string' ? item.title : '',
        show: true,
        disabled: props.disabledColumnKeys.includes(
          item.dataIndex || (typeof item.title === 'string' ? item.title : '')
        )
      })
    })
  }
}

watch(
  () => attrs,
  () => {
    resetSettingColumns()
  },
  { immediate: true }
)

// 排序和过滤可显示的列数据
const _columns = computed(() => {
  if (!attrs.columns) return []
  const arr = attrs.columns as TableColumnData[]
  // 显示的dataIndex
  const showDataIndexs = settingColumnList.value
    .filter((i) => i.show)
    .map((i) => i.key || (typeof i.title === 'string' ? i.title : ''))
  // 显示的columns数据
  const filterColumns = arr.filter((i) =>
    showDataIndexs.includes(i.dataIndex || (typeof i.title === 'string' ? i.title : ''))
  )
  const sortedColumns: TableColumnData[] = []
  settingColumnList.value.forEach((i) => {
    filterColumns.forEach((j) => {
      if (i.key === (j.dataIndex || j.title)) {
        sortedColumns.push(j)
      }
    })
  })
  return sortedColumns
})

defineExpose({ tableRef })
</script>

<style lang="scss" scoped>
.gi-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-bg-1);
  &--fullscreen {
    padding: $padding;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1001;
  }
  &__container {
    max-height: 100%;
    overflow: hidden;
  }
  &__title {
    color: var(--color-text-1);
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
  }
  &__draggable {
    padding: 1px 0; // 解决 max-height 和 overflow:auto 始终显示垂直滚动条问题
    max-height: 250px;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
  }
}

.drag-item {
  display: flex;
  align-items: center;

  cursor: pointer;
  &:hover {
    background-color: var(--color-fill-2);
  }
  &__move {
    padding-left: 2px;
    padding-right: 2px;
    cursor: move;
  }
  :deep(.arco-checkbox) {
    width: 100%;
    font-size: 12px;
    .arco-checkbox-icon {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
