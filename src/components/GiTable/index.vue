<template>
  <div class="gi-table" :class="{ 'gi-table--fullscreen': isFullscreen }" ref="giTableRef">
    <a-row justify="space-between" align="center">
      <a-space wrap>
        <slot name="custom-extra"></slot>
      </a-space>
      <a-space :size="[15, 8]" wrap>
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
              <icon-apps :size="18" />
            </template>
          </a-button>
        </a-tooltip>
        <a-space :size="[8, 0]" wrap>
          <a-radio-group type="button" size="mini" v-model="size">
            <a-radio value="mini">小</a-radio>
            <a-radio value="small">默认</a-radio>
            <a-radio value="medium">中</a-radio>
            <a-radio value="large">大</a-radio>
          </a-radio-group>
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
              <div class="draggable">
                <VueDraggable ref="el" v-model="settingColumnList">
                  <div v-for="item in settingColumnList" :key="item.title" class="drag-item">
                    <div class="drag-item__move"><icon-drag-dot-vertical /></div>
                    <a-checkbox v-model:model-value="item.show">{{ item.title }}</a-checkbox>
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
import type { TableInstance, TableColumnData } from '@arco-design/web-vue'
import { VueDraggable } from 'vue-draggable-plus'

defineOptions({ name: 'GiTable', inheritAttrs: false })
const emit = defineEmits(['refresh'])

const attrs = useAttrs()
const slots = useSlots()

const tableRef = ref<TableInstance | null>(null)

const stripe = ref(false)
const size = ref<TableInstance['$props']['size']>('small')
const isBordered = ref(true)
// console.log('attrs', attrs)

const isFullscreen = ref(false)

const refresh = () => {
  emit('refresh')
}

defineExpose({ tableRef })

const showSettingColumnBtn = computed(() => attrs?.columns && (attrs?.columns as TableColumnData[])?.length)
type SettingColumnItem = { title: string; show: boolean }
const settingColumnList = ref<SettingColumnItem[]>([])

// 重置配置列
const resetSettingColumns = () => {
  settingColumnList.value = []
  if (attrs.columns) {
    const arr = attrs.columns as TableColumnData[]
    arr.forEach((i) => {
      settingColumnList.value.push({
        title: typeof i.title === 'string' ? i.title : '',
        show: true
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
  const titleArr = settingColumnList.value.filter((i) => i.show).map((i) => i.title)
  const filterArr = arr.filter((i) => typeof i.title === 'string' && titleArr.includes(i.title))
  const sortedArr: TableColumnData[] = []
  settingColumnList.value.forEach((i) => {
    filterArr.forEach((j) => {
      if (i.title === j.title) {
        sortedArr.push(j)
      }
    })
  })
  return sortedArr
})
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
    flex: 1;
    overflow: hidden;
  }
}

.draggable {
  padding: 1px 0; // 解决 max-height 和 overflow:auto 始终显示垂直滚动条问题
  max-height: 250px;
  overflow: hidden;
  overflow-y: scroll;
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
