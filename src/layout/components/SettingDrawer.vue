<template>
  <a-drawer v-model:visible="visible" width="300px" unmount-on-close :footer="false">
    <template #title>项目配置</template>
    <a-space :size="15" direction="vertical" fill>
      <a-divider orientation="center">
        <a-typography-title :heading="6">系统主题</a-typography-title>
      </a-divider>

      <a-divider orientation="center">
        <a-typography-title :heading="6">界面显示</a-typography-title>
      </a-divider>
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
          @change="themeStore.setTabMode($event)"
        >
          <a-option v-for="item in themeStore.tab.modeList" :key="item.value">{{ item.label }}</a-option>
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
          @change="themeStore.setAnimateMode($event)"
        >
          <a-option v-for="item in themeStore.animate.modeList" :key="item.value">{{ item.label }}</a-option>
        </a-select>
      </a-row>
    </a-space>
  </a-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()

const props = defineProps({
  // 绑定的值
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

let visible = computed<boolean>({
  get: () => {
    return props.modelValue
  },
  set: (v) => {
    emit('update:modelValue', v)
  }
})
</script>

<style lang="scss" scoped>
.label {
  font-size: 14px;
}
</style>
