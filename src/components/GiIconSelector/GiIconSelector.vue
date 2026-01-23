<template>
  <a-popover trigger="click">
    <a-input placeholder="请选择图标" :model-value="modelValue" allow-clear readonly @clear="emit('update:modelValue', '')">
      <template #prefix>
        <component :is="modelValue" v-if="modelValue && props.type === 'arco'" :size="16" />
        <GiSvgIcon v-else-if="modelValue && props.type === 'custom'" :size="16" :name="modelValue" />
        <icon-search v-else />
      </template>
    </a-input>

    <template #content>
      <div class="gi-icon-selector" :class="{ 'gi-icon-selector--list': !isGridView }">
        <a-row>
          <section class="gi-icon-selector__search">
            <a-input v-model="searchValue" placeholder="搜索图标名称" allow-clear size="small" @input="search"
              @clear="search">
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
              <div class="gi-icon-selector__icon-item"
                :class="{ 'gi-icon-selector__icon-item--active': modelValue === item }"
                @click="handleSelectedIcon(item)">
                <component :is="item" v-if="props.type === 'arco'" :size="20" />
                <GiSvgIcon v-if="props.type === 'custom'" :name="item" :size="20"></GiSvgIcon>
                <div class="gi-line-1 gi-icon-selector__icon-name">{{ item }}</div>
              </div>
            </a-col>
          </a-row>
        </section>

        <a-row v-if="total > 0" justify="center" align="center">
          <a-pagination v-model:current="current" size="mini" :page-size="pageSize" :total="total"
            :show-size-changer="false"></a-pagination>
        </a-row>
        <a-empty v-else description="未找到匹配的图标" :image-size="80" />
      </div>
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import type { IconSelectorProps as Props } from './type'
import { Message } from '@arco-design/web-vue'
import * as ArcoIcons from '@arco-design/web-vue/es/icon'
import { useClipboard } from '@vueuse/core'

defineOptions({ name: 'GiIconSelector' })

const props = withDefaults(defineProps<Props>(), {
  type: 'arco', // 默认是arco图标类型 custom自定义图标
  modelValue: '',
  enableCopy: false
})

/** Emits 类型定义 */
const emit = defineEmits<{
  (e: 'select', icon: string): void
  (e: 'update:modelValue', icon: string): void
}>()

// 自定义图标模块
const SvgIconModules = import.meta.glob('@/icons/*.svg')

/** 搜索词 */
const searchValue = ref('')
/** 是否网格视图 */
const isGridView = ref(true)
/** 当前页码 */
const current = ref(1)
/** 每页显示数量 */
const pageSize = 42

/** 图标列表（根据类型计算） */
const IconList = computed(() => {
  if (props.type === 'arco') {
    return Object.keys(ArcoIcons).filter((i) => i !== 'default')
  }
  if (props.type === 'custom') {
    const list: string[] = []
    for (const path in SvgIconModules) {
      const name = path.replace('/src/icons/', '').replace('.svg', '')
      list.push(name)
    }
    return list
  }
  return []
})

/** 过滤后的图标列表（搜索时使用） */
const filteredIconList = computed(() => {
  if (!searchValue.value.trim()) {
    return IconList.value
  }
  const temp = searchValue.value.toLowerCase().trim()
  const searchKey = temp.startsWith('icon') ? temp : `icon${temp}`
  return IconList.value.filter((item) => {
    return item.toLowerCase().startsWith(searchKey)
  })
})

/** 图标总数 */
const total = computed(() => filteredIconList.value.length)

/** 当前页的图标列表 */
const currentPageIconList = computed(() => {
  const start = (current.value - 1) * pageSize
  const end = start + pageSize
  return filteredIconList.value.slice(start, end)
})

/** 搜索处理（重置页码） */
const search = () => {
  current.value = 1
}

/** 点击选择图标 */
const handleSelectedIcon = async (icon: string) => {
  emit('select', icon)
  emit('update:modelValue', icon)
  if (props.enableCopy) {
    const { isSupported, copy } = useClipboard()
    if (isSupported) {
      try {
        await copy(`<${icon} />`)
        Message.success(`已选择并且复制成功 ${icon} 图标`)
      } catch (error) {
        console.error('复制失败:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gi-icon-selector {
  width: 300px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 30px;
    margin-bottom: 4px;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed var(--color-bg-1);

    &--active {
      background-color: rgb(var(--primary-6), 0.05);
      border: 1px dashed rgb(var(--primary-3));
    }

    &:not(.gi-icon-selector__icon-item--active) {
      &:hover {
        border-color: var(--color-border-3);
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
