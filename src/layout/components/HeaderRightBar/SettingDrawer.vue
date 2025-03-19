<!--
  @file SettingDrawer 组件
  @description 系统设置抽屉组件，用于配置系统主题、布局、动画等全局设置
-->
<template>
  <a-drawer v-model:visible="visible" title="项目配置" width="300px" unmount-on-close :footer="false">
    <a-space :size="15" direction="vertical" fill>
      <a-divider orientation="center">系统布局</a-divider>
      <a-row justify="center">
        <a-space>
          <LayoutModeItem v-for="item in LAYOUT_OPTIONS" :key="item.value" :mode="item.value" :name="item.label"
            @click="toggleLayout(item.value)"></LayoutModeItem>
        </a-space>
      </a-row>

      <!-- 系统主题设置 -->
      <section>
        <a-divider orientation="center">系统主题</a-divider>
        <a-row justify="center">
          <ColorPicker theme="dark" :color="appStore.themeColor" :sucker-hide="true" :colors-default="defaultColorList"
            @change-color="changeColor"></ColorPicker>
        </a-row>
      </section>

      <!-- 界面显示设置 -->
      <section>
        <a-divider orientation="center">界面显示</a-divider>
        <a-descriptions :column="1" :align="{ value: 'right' }" :value-style="{ paddingRight: 0 }">
          <!-- 页签设置 -->
          <a-descriptions-item label="页签显示">
            <a-switch v-model="appStore.tabVisible" />
          </a-descriptions-item>
          <a-descriptions-item label="页签风格">
            <a-select v-model="appStore.tab" placeholder="请选择" :options="TAB_MODE_OPTIONS"
              :disabled="!appStore.tabVisible" :trigger-props="{ autoFitPopupMinWidth: true }"
              :style="{ width: '120px' }">
            </a-select>
          </a-descriptions-item>

          <!-- 动画设置 -->
          <a-descriptions-item label="动画显示">
            <a-switch v-model="appStore.animateVisible" />
          </a-descriptions-item>
          <a-descriptions-item label="动画效果">
            <a-select v-model="appStore.animate" placeholder="请选择" :options="ANIMATE_MODE_OPTIONS"
              :disabled="!appStore.animateVisible" :style="{ width: '120px' }">
            </a-select>
          </a-descriptions-item>

          <!-- 菜单设置 -->
          <a-descriptions-item label="深色菜单">
            <a-switch v-model="appStore.menuDark" />
          </a-descriptions-item>
          <a-descriptions-item label="手风琴效果">
            <a-switch v-model="appStore.menuAccordion" />
          </a-descriptions-item>
        </a-descriptions>
      </section>
    </a-space>
  </a-drawer>
</template>

<script setup lang="ts">
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import LayoutModeItem from './components/LayoutModeItem.vue'
import { useAppStore } from '@/stores'
import AppSetting from '@/config/setting.json'

/** 组件名称 */
defineOptions({ name: 'SettingDrawer' })

/** 状态管理 */
const appStore = useAppStore()
const visible = ref(false)

type LayoutItem = { label: string, value: App.SettingConfig['layout'] }
/** 布局选项 */
const LAYOUT_OPTIONS: LayoutItem[] = [
  { label: '默认布局', value: 'left' },
  { label: '混合布局', value: 'mix' },
  { label: '顶部布局', value: 'top' }
]

type TabItem = { label: string, value: App.SettingConfig['tab'] }
/** 页签模式选项 */
const TAB_MODE_OPTIONS: TabItem[] = [
  { label: '卡片', value: 'card' },
  { label: '间隔卡片', value: 'card-gutter' },
  { label: '圆角', value: 'rounded' },
  { label: '自定义1', value: 'custom1' },
  { label: '自定义2', value: 'custom2' }
]

type AnimateItem = { label: string, value: App.SettingConfig['animate'] }
/** 动画模式选项 */
const ANIMATE_MODE_OPTIONS: AnimateItem[] = [
  { label: '默认', value: 'zoom-fade' },
  { label: '滑动', value: 'fade-slide' },
  { label: '渐变', value: 'fade' },
  { label: '底部滑出', value: 'fade-bottom' },
  { label: '缩放消退', value: 'fade-scale' }
]

/** 初始化设置 */
const initSetting = () => {
  const layouts = LAYOUT_OPTIONS.map((i) => i.value)
  if (!layouts.includes(appStore.layout)) {
    appStore.layout = AppSetting.layout as App.SettingConfig['layout']
  }
  const tabs = TAB_MODE_OPTIONS.map((i) => i.value)
  if (!tabs.includes(appStore.tab)) {
    appStore.tab = AppSetting.tab as App.SettingConfig['tab']
  }
  const animates = ANIMATE_MODE_OPTIONS.map((i) => i.value)
  if (!animates.includes(appStore.animate)) {
    appStore.animate = AppSetting.animate as App.SettingConfig['animate']
  }
}
initSetting()

/** 默认主题色列表 */
const defaultColorList = [
  '#165DFF',
  '#409EFF',
  '#18A058',
  '#2d8cf0',
  '#007AFF',
  '#5ac8fa',
  '#5856D6',
  '#536dfe',
  '#9c27b0',
  '#AF52DE',
  '#0096c7',
  '#00C1D4',
  '#43a047',
  '#e53935',
  '#f4511e',
  '#6d4c41'
]

/** 颜色选择器返回值类型 */
interface ColorObj {
  hex: string
  hsv: { h: number, s: number, v: number }
  rgba: { r: number, g: number, b: number, a: number }
}

/** 打开设置抽屉 */
const open = () => {
  visible.value = true
}

/** 更改主题色 */
const changeColor = (colorObj: ColorObj) => {
  if (!/^#[0-9A-Za-z]{6}/.test(colorObj.hex)) return
  appStore.setThemeColor(colorObj.hex)
}

/** 切换布局 */
const toggleLayout = (layout: App.SettingConfig['layout']) => {
  appStore.layout = layout
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
:deep(.arco-descriptions-item-label-block) {
  color: var(--color-text-1);
}
</style>
