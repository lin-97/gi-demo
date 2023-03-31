<template>
  <a-popover trigger="click">
    <a-button v-if="!modelValue" type="primary">请选择图标</a-button>
    <a-button type="primary" status="success" v-else>
      <component :size="16" :is="modelValue" />
    </a-button>

    <template #content>
      <div class="container">
        <a-input
          v-model="searchValue"
          placeholder="搜索图标名称"
          allow-clear
          @input="search"
          @clear="search"
          style="width: 100%"
        >
          <template #prefix>
            <icon-search />
          </template>
        </a-input>

        <div class="icon-list">
          <a-row wrap :gutter="4">
            <a-col :span="4" v-for="item of currentPageIconList" :key="item">
              <div class="icon-item" :class="{ active: modelValue === item }" @click="handleSelectedIcon(item)">
                <component :is="item" :size="26" />
                <div class="gi_line_1 icon-name">{{ item }}</div>
              </div>
            </a-col>
          </a-row>
        </div>

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

<script setup lang="ts" name="GiIconSelector">
import { ref, watch } from 'vue'
import * as ArcoIcons from '@arco-design/web-vue/es/icon'
import { useClipboard } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'

const emit = defineEmits(['select', 'update:modelValue'])

interface Props {
  modelValue: string
  enableCopy: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  enableCopy: false
})

const searchValue = ref('') // 搜索词

// 图标列表
const IconList = Object.keys(ArcoIcons).filter((i) => i !== 'default')

const pageSize = 36
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
  min-width: 360px;
  max-width: 450px;
  overflow: hidden;
  .icon-list {
    min-height: 300px;
    margin-top: 20px;
    margin-bottom: 10px;
    .icon-item {
      height: 60px;
      margin-bottom: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 1px dashed var(--color-bg-1);
      &.active {
        border: 1px dashed rgb(var(--primary-3));
        background-color: rgba(var(--primary-6), 0.05);
      }
      .icon-name {
        width: 70%;
        margin: 0 auto;
        font-size: 12px;
        color: $color-text-3;
        margin-top: 5px;
      }
      &:not(.active) {
        &:hover {
          border-color: var(--color-border-3);
        }
      }
    }
  }
}
</style>
