<!--
  @file GiTable 组件
  @description 增强型表格组件，支持全屏、列设置、斑马纹、边框等功能
-->
<template>
  <div class="gi-table" :class="{ 'gi-table--fullscreen': isFullscreen }">
    <!-- 表格头部区域 -->
    <a-row justify="space-between" align="center">
      <!-- 左侧标题区域 -->
      <a-space wrap>
        <slot name="custom-title">
          <div class="gi-table__title">{{ props.title }}</div>
        </slot>
      </a-space>

      <!-- 右侧工具栏 -->
      <a-space wrap>
        <slot name="custom-extra"></slot>

        <!-- 表格操作按钮组 -->
        <a-space wrap :size="[14, 0]">
          <!-- 斑马纹开关 -->
          <a-tooltip content="斑马纹">
            <a-switch v-model="stripe" size="small" type="round" />
          </a-tooltip>

          <!-- 刷新按钮 -->
          <a-tooltip content="刷新">
            <a-button size="mini" class="gi_hover_btn" @click="handleRefresh">
              <template #icon><icon-refresh :size="18" /></template>
            </a-button>
          </a-tooltip>

          <!-- 全屏按钮 -->
          <a-tooltip content="全屏">
            <a-button size="mini" class="gi_hover_btn" @click="toggleFullscreen">
              <template #icon>
                <icon-fullscreen v-if="!isFullscreen" :size="18" />
                <icon-fullscreen-exit v-else :size="18" />
              </template>
            </a-button>
          </a-tooltip>

          <!-- 边框显示按钮 -->
          <a-tooltip content="显示边框">
            <a-button size="mini" class="gi_hover_btn" @click="toggleBorder">
              <template #icon><icon-borders /></template>
            </a-button>
          </a-tooltip>

          <!-- 表格尺寸设置 -->
          <a-dropdown @select="handleSizeChange">
            <a-tooltip content="表格尺寸">
              <a-button size="mini" class="gi_hover_btn">
                <template #icon><icon-table-size /></template>
              </a-button>
            </a-tooltip>
            <template #content>
              <a-doption v-for="item in TABLE_SIZE_OPTIONS" :key="item.value" :value="item.value"
                :active="item.value === size">
                {{ item.label }}
              </a-doption>
            </template>
          </a-dropdown>

          <!-- 列设置按钮 -->
          <a-popover v-if="showSettingColumnBtn" trigger="click" position="br"
            :content-style="{ minWidth: '120px', padding: '6px 8px 10px' }">
            <a-button type="primary" size="mini">
              <template #icon><icon-settings /></template>
            </a-button>
            <template #content>
              <!-- 列拖拽排序区域 -->
              <div class="gi-table__draggable">
                <VueDraggable v-model="settingColumnList" :animation="150">
                  <div v-for="item in settingColumnList" :key="item.title" class="gi-table__draggable-item">
                    <div class="gi-table__draggable-item-move">
                      <icon-drag-dot-vertical />
                    </div>
                    <a-checkbox v-model:model-value="item.show" :disabled="item.disabled">
                      {{ item.title }}
                    </a-checkbox>
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

    <!-- 表格主体区域 -->
    <div class="gi-table__container">
      <a-table ref="tableRef" v-bind="tableProps" :stripe="stripe" :size="size" :bordered="{ cell: isBordered }"
        :columns="visibleColumns" :data="data">
        <template v-for="key in Object.keys(slots)" :key="key" #[key]="scope">
          <slot :key="key" :name="key" v-bind="scope" />
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends TableData">
import { computed, ref, watch } from 'vue'
import type { DropdownInstance, TableColumnData, TableData, TableInstance } from '@arco-design/web-vue'
import { VueDraggable } from 'vue-draggable-plus'
import { omit } from 'lodash-es'
import type { TableProps } from './type'

defineOptions({ name: 'GiTable' })

// Props 默认值
const props = withDefaults(defineProps<Props>(), {
  title: '',
  disabledColumnKeys: () => [],
  data: () => []
})

/** Emits 类型定义 */
const emit = defineEmits<{
  (e: 'refresh'): void
}>()

/** Slots 类型定义 */
defineSlots<{
  'th': (props: { column: TableColumnData }) => void
  'thead': () => void
  'empty': (props: { column: TableColumnData }) => void
  'summary-cell': (props: { column: TableColumnData, record: T, rowIndex: number }) => void
  'pagination-right': () => void
  'pagination-left': () => void
  'td': (props: { column: TableColumnData, record: T, rowIndex: number }) => void
  'tr': (props: { record: T, rowIndex: number }) => void
  'tbody': () => void
  'drag-handle-icon': () => void
  'footer': () => void
  'expand-row': (props: { record: T }) => void
  'expand-icon': (props: { record: T, expanded?: boolean }) => void
  'columns': () => void
  'custom-title': () => void
  'custom-extra': () => void
  [propsName: string]: (props: { key: string, record: T, column: TableColumnData, rowIndex: number }) => void
}>()

/** Props 类型定义 */
interface Props extends TableProps {
  /** 表格标题 */
  title?: string
  /** 禁止控制显示隐藏的列 */
  disabledColumnKeys?: string[]
  /** 表格数据 */
  data: T[]
}

const slots = useSlots()
const attrs = useAttrs()

/** 表格属性计算 */
const tableProps = computed(() => {
  return { ...attrs, ...omit(props, ['title', 'disabledColumnKeys']) }
})

/** 组件状态 */
const tableRef = useTemplateRef('tableRef')
const stripe = ref(false)
const size = ref<TableInstance['size']>('medium')
const isBordered = ref(true)
const isFullscreen = ref(false)

/** 表格尺寸选项 */
const TABLE_SIZE_OPTIONS = [
  { label: '迷你', value: 'mini' },
  { label: '小型', value: 'small' },
  { label: '中等', value: 'medium' },
  { label: '大型', value: 'large' }
] as const

/** 处理表格尺寸变更 */
const handleSizeChange: DropdownInstance['onSelect'] = (value) => {
  if (value) {
    size.value = value as TableInstance['size']
  }
}

/** 处理表格刷新 */
const handleRefresh = () => {
  emit('refresh')
}

/** 切换全屏状态 */
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

/** 切换边框显示 */
const toggleBorder = () => {
  isBordered.value = !isBordered.value
}

/** 列设置相关逻辑 */
const showSettingColumnBtn = computed(() => {
  const columns = props.columns as TableColumnData[] | undefined
  return Boolean(columns?.length)
})

/** 列设置项类型 */
interface SettingColumnItem {
  /** 列标题 */
  title: string
  /** 列标识 */
  key: string
  /** 是否显示 */
  show: boolean
  /** 是否禁用 */
  disabled: boolean
}

const settingColumnList = ref<SettingColumnItem[]>([])

/** 重置列设置 */
const resetSettingColumns = () => {
  if (!props.columns) {
    settingColumnList.value = []
    return
  }

  const columns = props.columns as TableColumnData[]
  settingColumnList.value = columns.map((column) => {
    const key = column.dataIndex || (typeof column.title === 'string' ? column.title : '')
    return {
      key,
      title: typeof column.title === 'string' ? column.title : '',
      show: true,
      disabled: props.disabledColumnKeys.includes(key)
    }
  })
}

/** 监听属性变化，重置列设置 */
watch(
  () => props.columns,
  () => resetSettingColumns(),
  { immediate: true }
)

/** 计算显示的列 */
const visibleColumns = computed(() => {
  if (!props.columns) return []

  const columns = props.columns as TableColumnData[]
  const columnMap = new Map(
    columns.map((col) => [
      col.dataIndex || (typeof col.title === 'string' ? col.title : ''),
      col
    ])
  )

  // 按照设置列表的顺序返回可见列
  return settingColumnList.value
    .filter((item) => item.show)
    .map((item) => columnMap.get(item.key))
    .filter(Boolean) as TableColumnData[]
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
    position: fixed;
    inset: 0;
    z-index: 1001;
    padding: $padding;
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
    padding: 1px 0;
    max-height: 250px;
    box-sizing: border-box;
    overflow: hidden auto;
  }

  &__draggable-item {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: var(--color-fill-2);
    }

    &-move {
      padding: 0 2px;
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
}
</style>
