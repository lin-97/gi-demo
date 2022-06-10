<template>
  <a-drawer v-model:visible="visible" width="300px" unmount-on-close :footer="false">
    <template #title>项目配置</template>
    <a-space :size="15" direction="vertical" fill>
      <a-divider orientation="center"><span class="title">系统主题</span></a-divider>
      <a-row justify="center">
        <ColorPicker
          theme="dark"
          :color="themeStore.themeColor"
          :sucker-hide="true"
          :colors-default="defaultColorList"
          @changeColor="changeColor"
        ></ColorPicker>
      </a-row>

      <a-divider orientation="center"><span class="title">界面显示</span></a-divider>

      <a-row justify="space-between" align="middle">
        <span class="label">页签显示</span>
        <a-switch size="medium" :model-value="themeStore.tab.visible" @change="themeStore.setTabVisible($event)" />
      </a-row>

      <a-row justify="space-between" align="middle">
        <span class="label">页签风格</span>
        <a-select
          placeholder="请选择"
          :model-value="themeStore.tab.mode"
          :disabled="!themeStore.tab.visible"
          :style="{ width: '120px' }"
          :trigger-props="{ autoFitPopupMinWidth: true }"
        >
          <a-option
            v-for="item in themeStore.tab.modeList"
            :key="item.value"
            :value="item.value"
            @click="themeStore.setTabMode(item.value)"
            >{{ item.label }}</a-option
          >
        </a-select>
      </a-row>

      <a-row justify="space-between" align="middle">
        <span class="label">动画显示</span>
        <a-switch
          size="medium"
          :model-value="themeStore.animate.visible"
          @change="themeStore.setAnimateVisible($event)"
        />
      </a-row>

      <a-row justify="space-between" align="middle">
        <span class="label">动画切换类型</span>
        <a-select
          placeholder="请选择"
          :model-value="themeStore.animate.mode"
          :disabled="!themeStore.animate.visible"
          :style="{ width: '120px' }"
        >
          <a-option
            v-for="item in themeStore.animate.modeList"
            :key="item.value"
            :value="item.value"
            @click="themeStore.setAnimateMode(item.value)"
            >{{ item.label }}</a-option
          >
        </a-select>
      </a-row>
    </a-space>
  </a-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/store'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

const themeStore = useThemeStore()

const props = defineProps({
  // 绑定的值
  modelValue: {
    type: Boolean,
    default: false
  }
})

// 默认显示的主题色列表
const defaultColorList = [
  '#1890ff',
  '#409EFF',
  '#2d8cf0',
  '#007AFF',
  '#5ac8fa',
  '#5856D6',
  '#536dfe',
  '#9c27b0',
  '#AF52DE',
  '#0096c7',
  '#00C1D4',
  '#34C759',
  '#43a047',
  '#7cb342',
  '#c0ca33',
  '#78DEC7',
  '#e53935',
  '#d81b60',
  '#f4511e',
  '#fb8c00',
  '#ffb300',
  '#fdd835',
  '#6d4c41',
  '#546e7a'
]

const emit = defineEmits(['update:modelValue'])

let visible = computed<boolean>({
  get: () => {
    return props.modelValue
  },
  set: (v) => {
    emit('update:modelValue', v)
  }
})

if (themeStore.themeColor) {
  themeStore.changeThemeColor(themeStore.themeColor)
}

const changeColor = (colorObj: any) => {
  if (!/^#[0-9A-Za-z]{6}/.test(colorObj.hex)) return
  console.log(colorObj)
  themeStore.setThemeColor(colorObj.hex)
  themeStore.changeThemeColor(themeStore.themeColor)
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
}
.label {
  font-size: 14px;
}
</style>
