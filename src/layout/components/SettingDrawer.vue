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
        <a-switch size="medium" :model-value="themeStore.tab" @change="themeStore.setTabVisible($event)" />
      </a-row>

      <a-row justify="space-between" align="middle">
        <span class="label">页签风格</span>
        <a-select
          placeholder="请选择"
          :model-value="themeStore.tabMode"
          :disabled="!themeStore.tab"
          :style="{ width: '120px' }"
          :trigger-props="{ autoFitPopupMinWidth: true }"
        >
          <a-option
            v-for="item in tabModeList"
            :key="item.value"
            :value="item.value"
            @click="themeStore.setTabMode(item.value)"
            >{{ item.label }}</a-option
          >
        </a-select>
      </a-row>

      <a-row justify="space-between" align="middle">
        <span class="label">动画显示</span>
        <a-switch size="medium" :model-value="themeStore.animate" @change="themeStore.setAnimateVisible($event)" />
      </a-row>

      <a-row justify="space-between" align="middle">
        <span class="label">动画切换类型</span>
        <a-select
          placeholder="请选择"
          :model-value="themeStore.animateMode"
          :disabled="!themeStore.animate"
          :style="{ width: '120px' }"
        >
          <a-option
            v-for="item in animateModeList"
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

<script setup lang="ts" name="SettingDrawer">
import { useThemeStore } from '@/store'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import { useVModel } from '@vueuse/core'
import { tabModeList, animateModeList } from '@/config/option'

const themeStore = useThemeStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const visible = useVModel(props, 'modelValue', emit)

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
