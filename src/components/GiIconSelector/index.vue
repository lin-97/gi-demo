<template>
  <a-popover trigger="click">
    <a-input
      placeholder="请选择图标"
      :model-value="modelValue"
      allow-clear
      readonly
      @clear="emit('update:modelValue', '')"
    >
      <template #prefix>
        <component v-if="modelValue" :size="16" :is="modelValue" />
        <icon-search v-else />
      </template>
    </a-input>

    <template #content>
      <div class="container" :class="{ 'is-list': !isGridView }">
        <a-row>
          <section style="flex: 1; margin-right: 8px">
            <a-input
              v-model="searchValue"
              placeholder="搜索图标名称"
              allow-clear
              size="small"
              @input="search"
              @clear="search"
            >
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

        <section class="icon-list">
          <a-row wrap :gutter="4">
            <a-col :span="isGridView ? 4 : 8" v-for="item of currentPageIconList" :key="item">
              <div class="icon-item" :class="{ active: modelValue === item }" @click="handleSelectedIcon(item)">
                <component :is="item" :size="20" />
                <div class="gi_line_1 icon-name">{{ item }}</div>
              </div>
            </a-col>
          </a-row>
        </section>

        <a-row justify="center" align="center">
          <a-pagination
            size="mini"
            :pageSize="pageSize"
            :total="total"
            :show-size-changer="false"
            @change="onPageChange"
          ></a-pagination>
        </a-row>
      </div>
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import * as ArcoIcons from '@arco-design/web-vue/es/icon'
import { useClipboard } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'

defineOptions({ name: 'GiIconSelector' })
const emit = defineEmits(['select', 'update:modelValue'])

interface Props {
  modelValue?: string
  enableCopy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  enableCopy: false
})

const searchValue = ref('') // 搜索词

// 图标列表
const isGridView = ref(true)
const IconList = Object.keys(ArcoIcons).filter((i) => i !== 'default')

const pageSize = 42
const current = ref(1)
const total = ref(IconList.length) // 图标总数

// 当前页的图标列表
const currentPageIconList = ref(IconList.slice(0, pageSize))
// 搜索列表
const searchList = ref<string[]>([])

// 页码改变
const onPageChange = (page: number) => {
  current.value = page
  if (!searchList.value.length) {
    currentPageIconList.value = IconList.slice((page - 1) * pageSize, page * pageSize)
  } else {
    currentPageIconList.value = searchList.value.slice((page - 1) * pageSize, page * pageSize)
  }
}

// 搜索
const search = () => {
  if (searchValue.value) {
    const temp = searchValue.value.toLowerCase()
    searchList.value = IconList.filter((item) => {
      return item.toLowerCase().startsWith((temp.startsWith('icon') ? '' : 'icon') + temp)
    })
    total.value = searchList.value.length
    currentPageIconList.value = searchList.value.slice(0, pageSize)
  } else {
    searchList.value = []
    total.value = IconList.length
    currentPageIconList.value = IconList.slice((current.value - 1) * pageSize, current.value * pageSize)
  }
}

// 点击选择图标
const handleSelectedIcon = async (icon: string) => {
  emit('select', icon)
  emit('update:modelValue', icon)
  if (props.enableCopy) {
    const { isSupported, copied, copy } = useClipboard()
    if (isSupported) {
      await copy(`<${icon} />`)
      if (copied) {
        Message.success(`已选择并且复制成功 ${icon} 图标`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 300px;
  overflow: hidden;
  .icon-list {
    margin-top: 10px;
    margin-bottom: 10px;
    .icon-item {
      height: 30px;
      margin-bottom: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 1px dashed var(--color-bg-1);
      .icon-name {
        display: none;
      }
      &.active {
        border: 1px dashed rgb(var(--primary-3));
        background-color: rgba(var(--primary-6), 0.05);
      }

      &:not(.active) {
        &:hover {
          border-color: var(--color-border-3);
        }
      }
    }
  }
}

.is-list {
  min-width: 400px;
  .icon-list {
    height: 300px;
    overflow: hidden;
    overflow-y: auto;
    .icon-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .icon-name {
        margin-left: 6px;
        font-size: 12px;
        color: $color-text-3;
        display: block;
      }
    }
  }
}
</style>
