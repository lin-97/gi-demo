<template>
  <a-popover v-model:visible="visible" trigger="click">
    <a-button v-if="!seletedItem" type="primary">请选择图标</a-button>
    <a-button status="success" v-else>
      已选择
      <component :is="seletedItem" />
    </a-button>

    <template #content>
      <div class="icon-container">
        <a-input
          v-model="searchValue"
          placeholder="搜索图标名称"
          @input="onSearch"
          @clear="onSearch"
          allow-clear
          style="width: 100%"
        >
          <template #prefix>
            <icon-search />
          </template>
        </a-input>

        <div class="icon-wrapper">
          <a-row :wrap="true">
            <a-col :span="4" v-for="item of currentPageIconList" :key="item">
              <div class="icon-item" @click="onSelectItem(item)">
                <component :is="item" :size="26" />
                <div class="icon-name">{{ item }}</div>
              </div>
            </a-col>
          </a-row>
        </div>

        <a-row justify="center">
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

const emit = defineEmits(['onSelect', 'update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  // 是否能够复制
  enableCopy: {
    type: Boolean,
    default: false
  },
  // 自定义图标数据源
  customIconData: {
    type: Array,
    default: () => []
  }
})

// 搜索词
const searchValue = ref('')

// 图标列表
const data = props.customIconData.length ? props.customIconData : ArcoIcons
const iconList = Object.keys(data).filter((i) => i !== 'default')
// 图标总数
const total = ref(iconList.length)

const pageSize = 36
const currentPage = ref(1)

// 当前页的图标列表
const currentPageIconList = ref(iconList.slice(0, pageSize))
// 搜索列表
const searchList = ref<string[]>([])

// 显示/隐藏弹框
const visible = ref(false)

// 当前选择的icon
const seletedItem = ref<string>(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    seletedItem.value = newVal
  }
)

function onPageChange(page: number) {
  currentPage.value = page
  currentPageIconList.value =
    searchList.value.length === 0
      ? iconList.slice((page - 1) * pageSize, page * pageSize)
      : searchList.value.slice((page - 1) * pageSize, page * pageSize)
}

function onSearch() {
  if (searchValue.value) {
    const temp = searchValue.value.toLowerCase()
    searchList.value = iconList.filter((item) => {
      return item.toLowerCase().startsWith((temp.startsWith('icon') ? '' : 'icon') + temp)
    })
    total.value = searchList.value.length
    currentPageIconList.value = searchList.value.slice(0, pageSize)
  } else {
    searchList.value = []
    total.value = iconList.length
    currentPageIconList.value = iconList.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
  }
}

async function onSelectItem(item: string) {
  emit('onSelect', item)
  emit('update:modelValue', item)
  seletedItem.value = item
  visible.value = false
  if (props.enableCopy) {
    const { isSupported, copied, copy } = useClipboard()
    if (isSupported) {
      await copy(`<${item} />`)
      if (copied) {
        Message.success(`已选择并且复制成功 ${item} 图标`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-container {
  width: 360px;
  overflow: hidden;
  .icon-wrapper {
    min-height: 300px;
    margin-top: 20px;
    margin-bottom: 10px;
    .icon-item {
      height: 60px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-name {
        width: 70%;
        margin: 0 auto;
        font-size: 12px;
        color: $color-text-3;
        margin-top: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: normal;
      }
      .arco-icon {
        transform: scale(1);
        transition: transform 0.2s linear;
      }
      &:hover {
        cursor: pointer;
        .arco-icon {
          transform: scale(1.3);
        }
      }
    }
  }
}
</style>
