<template>
  <a-drawer v-model:visible="visible" title="项目配置" width="300px" unmount-on-close :footer="false">
    <a-space :size="15" direction="vertical" fill>
      <a-divider orientation="center">系统主题</a-divider>
      <a-row justify="center">
        <ColorPicker
          theme="dark"
          :color="appStore.themeColor"
          :sucker-hide="true"
          :colors-default="defaultColorList"
          @changeColor="changeColor"
        ></ColorPicker>
      </a-row>

      <a-divider orientation="center">界面显示</a-divider>

      <a-descriptions :column="1" :align="{ value: 'right' }">
        <a-descriptions-item label="页签显示">
          <a-switch :model-value="appStore.tab" @change="appStore.setTabVisible(Boolean($event))" />
        </a-descriptions-item>
        <a-descriptions-item label="页签风格">
          <a-select
            placeholder="请选择"
            :options="tabModeList"
            :model-value="appStore.tabMode"
            :disabled="!appStore.tab"
            :style="{ width: '120px' }"
            :trigger-props="{ autoFitPopupMinWidth: true }"
            @change="($event) => appStore.setTabMode($event as App.TabType)"
          >
          </a-select>
        </a-descriptions-item>
        <a-descriptions-item label="动画显示">
          <a-switch :model-value="appStore.animate" @change="appStore.setAnimateVisible(Boolean($event))" />
        </a-descriptions-item>
        <a-descriptions-item label="动画显示">
          <a-select
            placeholder="请选择"
            :options="animateModeList"
            :model-value="appStore.animateMode"
            :disabled="!appStore.animate"
            :style="{ width: '120px' }"
            @change="($event)=> appStore.setAnimateMode($event as App.AnimateType)"
          >
          </a-select>
        </a-descriptions-item>
      </a-descriptions>
    </a-space>
  </a-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

defineOptions({ name: 'SettingDrawer' })
const appStore = useAppStore()
const visible = ref(false)

const tabModeList: App.TabItem[] = [
  { label: '卡片', value: 'card' },
  { label: '间隔卡片', value: 'card-gutter' },
  { label: '圆角', value: 'rounded' }
]

const animateModeList: App.AnimateItem[] = [
  { label: '默认', value: 'zoom-fade' },
  { label: '滑动', value: 'fade-slide' },
  { label: '渐变', value: 'fade' },
  { label: '底部滑出', value: 'fade-bottom' },
  { label: '缩放消退', value: 'fade-scale' }
]

if (appStore.themeColor) {
  appStore.setThemeColor(appStore.themeColor)
}

const open = () => {
  visible.value = true
}

defineExpose({ open })

// 默认显示的主题色列表
const defaultColorList = [
  '#165DFF',
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

type ColorObj = {
  hex: string
  hsv: { h: number; s: number; v: number }
  rgba: { r: number; g: number; b: number; a: number }
}

// 改变主题色
const changeColor = (colorObj: ColorObj) => {
  if (!/^#[0-9A-Za-z]{6}/.test(colorObj.hex)) return
  appStore.setThemeColor(colorObj.hex)
}
</script>

<style lang="scss" scoped>
:deep(.arco-descriptions-item-label-block) {
  color: var(--color-text-1);
}
</style>
