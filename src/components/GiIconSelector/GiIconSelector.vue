<template>
  <a-input-group class="w-full">
    <a-select v-model="selectedType" :options="selectOptions" class="gi-icon-selector__type-select"
      @change="onTypeChange">
    </a-select>
    <a-popover trigger="click">
      <a-input placeholder="请选择图标" :model-value="modelValue" allow-clear readonly
        @clear="emit('update:modelValue', '')">
        <template #prefix>
          <component :is="modelValue" v-if="modelValue && selectedType === 'arco'" :size="16" />
          <GiSvgIcon v-else-if="modelValue && selectedType === 'custom'" :size="16" :name="modelValue" />
          <Icon v-else-if="modelValue && selectedType === 'iconpark'" :icon="modelValue" :width="16" :height="16" />
          <icon-search v-else />
        </template>
      </a-input>

      <template #content>
        <div class="gi-icon-selector" :class="{ 'gi-icon-selector--list': !isGridView }">
          <a-row>
            <section class="gi-icon-selector__search">
              <a-input v-model="searchValue" placeholder="搜索图标名称" allow-clear size="small">
                <template #prefix>
                  <icon-search />
                </template>
              </a-input>
            </section>

            <a-button size="small" @click="isGridView = !isGridView">
              <template #icon>
                <icon-apps v-if="isGridView" />
                <icon-unordered-list v-else />
              </template>
            </a-button>
          </a-row>

          <section class="gi-icon-selector__icon-list">
            <a-row wrap :gutter="4">
              <a-col v-for="item of currentPageIconList" :key="item" :span="isGridView ? 4 : 8">
                <div class="gi-icon-selector__icon-item" :class="{
                  'gi-icon-selector__icon-item--active': modelValue === item,
                }" @click="handleSelectedIcon(item)">
                  <component :is="item" v-if="selectedType === 'arco'" :size="20" />
                  <GiSvgIcon v-else-if="selectedType === 'custom'" :name="item" :size="20" />
                  <Icon v-else-if="selectedType === 'iconpark'" :icon="item" :width="20" :height="20" />
                  <div class="g-line-1 gi-icon-selector__icon-name">
                    {{ item }}
                  </div>
                </div>
              </a-col>
            </a-row>
          </section>

          <a-row v-if="total > pagination.pageSize" justify="center" align="center">
            <a-pagination v-model:current="pagination.current" size="mini" :page-size="pagination.pageSize"
              :total="total" :show-size-changer="false" />
          </a-row>
          <a-empty v-else-if="total === 0" description="未找到匹配的图标" :image-size="80" />
        </div>
      </template>
    </a-popover>
  </a-input-group>
</template>

<script setup lang="ts">
import type { IconSelectorProps as Props } from './type'
import { Message } from '@arco-design/web-vue'
import * as ArcoIcons from '@arco-design/web-vue/es/icon'
import IconParkOutlineIcons from '@iconify-json/icon-park-outline/icons.json'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'GiIconSelector' })

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  enableCopy: false
})

const emit = defineEmits<{
  (e: 'select', icon: string): void
  (e: 'update:modelValue', icon: string): void
}>()

/** Arco 图标名列表（构建期固定，模块级缓存） */
const ARCO_ICON_NAMES = Object.keys(ArcoIcons).filter((k) => k !== 'default')

const SvgIconModules = import.meta.glob('@/icons/*.svg')

/** 自定义 SVG 文件名列表（构建期固定，模块级缓存） */
const CUSTOM_ICON_NAMES = Object.keys(SvgIconModules)
  .map((path) => path.match(/([^/\\]+)\.svg$/i)?.[1] ?? '')
  .filter(Boolean)

const iconParkIcons = (
  IconParkOutlineIcons as { icons?: Record<string, unknown> }
).icons
/** IconPark 图标 id 列表（构建期固定，模块级缓存） */
const ICONPARK_ICON_NAMES = Object.keys(iconParkIcons ?? {}).map(
  (id) => `icon-park-outline:${id}`
)

const PAGE_SIZE = 42

type IconSourceType = 'arco' | 'custom' | 'iconpark'

const selectOptions: { label: string, value: IconSourceType }[] = [
  { label: 'Arco', value: 'arco' },
  { label: 'Custom', value: 'custom' },
  { label: 'IconPark', value: 'iconpark' }
]

const searchValue = ref('')
const isGridView = ref(true)
const pagination = reactive({
  current: 1,
  pageSize: PAGE_SIZE
})
const selectedType = ref<IconSourceType>('arco')

const { copy, isSupported } = useClipboard()

const IconList = computed(() => {
  switch (selectedType.value) {
    case 'arco':
      return ARCO_ICON_NAMES
    case 'custom':
      return CUSTOM_ICON_NAMES
    case 'iconpark':
      return ICONPARK_ICON_NAMES
    default:
      return []
  }
})

const filteredIconList = computed(() => {
  const raw = searchValue.value.trim()
  if (!raw) return IconList.value
  const lower = raw.toLowerCase()
  const searchKey = lower.startsWith('icon') ? lower : `icon${lower}`
  return IconList.value.filter((item) =>
    item.toLowerCase().startsWith(searchKey)
  )
})

const total = computed(() => filteredIconList.value.length)

const currentPageIconList = computed(() => {
  const start = (pagination.current - 1) * pagination.pageSize
  return filteredIconList.value.slice(start, start + pagination.pageSize)
})

watch(searchValue, () => {
  pagination.current = 1
})

function resetPickerState() {
  searchValue.value = ''
  pagination.current = 1
}

function onTypeChange() {
  emit('update:modelValue', '')
  resetPickerState()
}

async function handleSelectedIcon(icon: string) {
  emit('select', icon)
  emit('update:modelValue', icon)
  if (!props.enableCopy || !isSupported.value) return
  try {
    await copy(`<${icon} />`)
    Message.success(`已选择并且复制成功 ${icon} 图标`)
  } catch (error) {
    console.error('复制失败:', error)
  }
}
</script>

<style lang="scss" scoped>
:deep(.gi-icon-selector__type-select) {
  flex: none;
  width: 108px;
}

.gi-icon-selector {
  width: 320px;
  overflow: hidden;

  &__search {
    flex: 1;
    margin-right: 8px;
  }

  &__icon-list {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &__icon-item {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 30px;
    margin-bottom: 4px;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed var(--color-bg-1);
    border-style: dashed;
    border-radius: 4px;

    &--active {
      background-color: rgb(var(--primary-1));
      border-color: rgb(var(--primary-3));
    }

    &:not(.gi-icon-selector__icon-item--active) {
      &:hover {
        background-color: var(--color-fill-2);
        border-color: var(--color-border-4);
      }
    }
  }

  &__icon-name {
    display: none;
  }

  &--list {
    min-width: 400px;

    .gi-icon-selector__icon-list {
      height: 300px;
      overflow: hidden;
      overflow-y: auto;
    }

    .gi-icon-selector__icon-item {
      box-sizing: border-box;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding-left: 4px;
    }

    .gi-icon-selector__icon-name {
      display: block;
      margin-left: 6px;
      font-size: 12px;
      color: var(--color-text-2);
    }
  }
}
</style>
