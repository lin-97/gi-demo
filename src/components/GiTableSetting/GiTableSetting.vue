<template>
  <div class="gi-table-setting" :class="{ 'gi-table-setting--fullscreen': isFullscreen }">
    <a-row justify="space-between" align="center" class="g-row-tool">
      <a-space wrap>
        <slot name="custom-title">
          <div class="gi-table-setting__title">{{ title }}</div>
        </slot>
      </a-space>

      <a-space wrap>
        <slot name="custom-extra" />

        <a-tooltip content="导出">
          <a-button type="text" size="mini" @click="emit('export')">
            <template #icon><icon-download :size="18" /></template>
          </a-button>
        </a-tooltip>

        <a-tooltip content="斑马纹">
          <a-button type="text" size="mini" @click="stripe = !stripe">
            <template #icon><icon-brush :size="18" /></template>
          </a-button>
        </a-tooltip>

        <a-tooltip content="刷新">
          <a-button type="text" size="mini" @click="emit('refresh')">
            <template #icon><icon-refresh :size="18" /></template>
          </a-button>
        </a-tooltip>

        <a-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
          <a-button type="text" size="mini" @click="toggleFullscreen">
            <template #icon>
              <icon-fullscreen v-if="!isFullscreen" :size="18" />
              <icon-fullscreen-exit v-else :size="18" />
            </template>
          </a-button>
        </a-tooltip>

        <a-tooltip content="显示边框">
          <a-button type="text" size="mini" @click="toggleBorder">
            <template #icon><icon-apps :size="18" /></template>
          </a-button>
        </a-tooltip>

        <a-dropdown @select="handleSizeChange">
          <a-tooltip content="表格尺寸">
            <a-button type="text" size="mini">
              <template #icon>
                <icon-font-colors :size="18" />
              </template>
            </a-button>
          </a-tooltip>
          <template #content>
            <a-doption v-for="item in TABLE_SIZE_OPTIONS" :key="item.value" :value="item.value"
              :active="item.value === size">
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>

        <a-popover v-if="showSettingColumnBtn" trigger="click" position="br"
          :content-style="{ minWidth: '160px', padding: '6px 8px 10px' }">
          <a-button type="text" size="mini">
            <template #icon><icon-settings :size="18" /></template>
          </a-button>
          <template #content>
            <div class="gi-table-setting__draggable">
              <VueDraggable :model-value="currentSettingColumns" :animation="150"
                @update:model-value="onSettingColumnsUpdate">
                <div v-for="item in currentSettingColumns" :key="item.key" class="gi-table-setting__draggable-item">
                  <div class="gi-table-setting__draggable-item-move">
                    <icon-drag-dot-vertical />
                  </div>
                  <a-checkbox v-model:model-value="item.show" :disabled="item.disabled">
                    {{ item.title }}
                  </a-checkbox>
                  <div class="gi-table-setting__draggable-item-fixed">
                    <span class="gi-table-setting__pin-btn" :class="{ 'is-active': item.fixedLeft }"
                      @click.stop="toggleFixedLeft(item.key)">
                      <icon-pushpin />
                    </span>
                    <span class="gi-table-setting__pin-btn gi-table-setting__pin-btn--right"
                      :class="{ 'is-active': item.fixedRight }" @click.stop="toggleFixedRight(item.key)">
                      <icon-pushpin />
                    </span>
                  </div>
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
    </a-row>

    <div class="gi-table-setting__body">
      <slot :setting-columns="settingColumns" :is-fullscreen="isFullscreen" :table-props="tableProps" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownInstance, TableColumnData, TableInstance } from '@arco-design/web-vue'
import type { GiTableSettingProps, TableSettingColumnListItem } from './type'
import { computed, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useTableColumnSetting } from './useTableColumnSetting'

defineOptions({ name: 'GiTableSetting' })

const props = withDefaults(defineProps<GiTableSettingProps>(), {
  title: '',
  columns: () => [],
  disabledColumnKeys: () => []
})

const emit = defineEmits<{
  refresh: []
  export: []
}>()

defineSlots<{
  'custom-title'?: () => unknown
  'custom-extra'?: () => unknown
  'default': (props: {
    settingColumns: TableColumnData[]
    isFullscreen: boolean
    tableProps: {
      stripe: boolean
      bordered: { cell: boolean }
      size: TableInstance['size']
    }
  }) => unknown
}>()

const stripe = ref(false)
const size = ref<TableInstance['size']>('medium')
const isBordered = ref(true)
const isFullscreen = ref(false)

const TABLE_SIZE_OPTIONS = [
  { label: '迷你', value: 'mini' },
  { label: '小型', value: 'small' },
  { label: '中等', value: 'medium' },
  { label: '大型', value: 'large' }
] as const

const tableProps = computed(() => ({
  stripe: stripe.value,
  bordered: { cell: isBordered.value },
  size: size.value
}))

const {
  showSettingColumnBtn,
  currentSettingColumns,
  settingColumnList,
  settingColumns,
  resetSettingColumns,
  toggleFixedLeft,
  toggleFixedRight
} = useTableColumnSetting({
  columns: () => props.columns,
  disabledColumnKeys: () => props.disabledColumnKeys
})

function onSettingColumnsUpdate(val: TableSettingColumnListItem[]) {
  settingColumnList.value = val
}

const handleSizeChange: DropdownInstance['onSelect'] = (value) => {
  if (value) {
    size.value = value as TableInstance['size']
  }
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function toggleBorder() {
  isBordered.value = !isBordered.value
}
</script>

<style lang="scss" scoped>
.gi-table-setting {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  background: var(--color-bg-1);

  &--fullscreen {
    position: fixed;
    inset: 0;
    z-index: 1001;
    box-sizing: border-box;
    padding: var(--padding);
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--color-text-1);
  }

  &__body {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  &__draggable {
    box-sizing: border-box;
    max-height: 250px;
    padding: 1px 0;
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

    &-fixed {
      display: flex;
      flex-shrink: 0;
      gap: 4px;
      align-items: center;
      margin-left: auto;
    }

    :deep(.arco-checkbox) {
      flex: 1;
      min-width: 0;
      font-size: 12px;

      .arco-checkbox-icon {
        width: 14px;
        height: 14px;
      }
    }
  }

  &__pin-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    font-size: 14px;
    color: var(--color-text-3);
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: var(--color-text-2);
    }

    &.is-active {
      color: rgb(var(--primary-6));
    }

    &--right {
      transform: scaleX(-1);
    }
  }
}
</style>
