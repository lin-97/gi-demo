<template>
  <div class="fast-card">
    <a-row :gutter="[14, 14]">
      <a-col v-for="item in list" :key="item.name" v-bind="colProps">
        <div class="fast-card-item">
          <GiIconBox :size="48" :color="getGradientColor(item.color)" style="border-radius: 10px;">
            <component :is="item.icon" :size="24" :style="{ color: '#fff' }"></component>
          </GiIconBox>
          <span class="fast-card-item__name">{{ item.name }}</span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import GiIconBox from '@/components/GiIconBox/GiIconBox.vue'

const colProps = { xs: 8, sm: 6, md: 6, lg: 3, xl: 3, xxl: 3 }

/**
 * 将 HEX 颜色变淡（提升亮度）
 * @param {string} hex - 原始颜色，如 #fff / #ffffff / #ff0000
 * @param {number} percent - 变淡百分比（0~1），比如 0.3 = 淡30%
 * @returns {string} 变淡后的 HEX 颜色
 */
function lightenHexColor(hex, percent = 0.3) {
  // 移除 # 号
  hex = hex.replace(/^#/, '')

  // 处理 3 位 HEX 简写（如 #fff → #ffffff）
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  // 转 RGB 数值
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)

  // 提升亮度（变淡）
  const lighten = (channel) =>
    Math.min(255, Math.round(channel + (255 - channel) * percent))

  const newR = lighten(r)
  const newG = lighten(g)
  const newB = lighten(b)

  // 转回 2 位十六进制
  const toHex = (c) => c.toString(16).padStart(2, '0')
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
}

/**
 * 由基准色生成左浅右深的线性渐变（与当前快捷入口视觉一致）
 * @param hex 基准色，如 #5C7568
 * @param angleDeg 渐变角度，默认 145
 */
function getGradientColor(hex: string, angleDeg = 140): string {
  const lightHex = lightenHexColor(hex, 0.5)
  return `linear-gradient(${angleDeg}deg, ${lightHex} 0%, ${hex} 100%)`
}

const list = [
  { name: '主控台', icon: 'icon-dashboard', color: '#377DFF' },
  { name: '分析页', icon: 'icon-bar-chart', color: '#0AC8D2' },
  { name: '表单管理', icon: 'icon-pen', color: '#00B7FF ' },
  { name: '表格管理', icon: 'icon-list', color: '#F59E0B ' },
  { name: '布局示例', icon: 'icon-layout', color: '#9E69F5' },
  { name: '系统管理', icon: 'icon-settings', color: '#9C9C9C' },
  { name: '详情示例', icon: 'icon-common', color: '#F666B8' },
  { name: '权限管理', icon: 'icon-lock', color: '#00AA2A' }
]
</script>

<style lang="scss" scoped>
.fast-card {
  box-sizing: border-box;
  padding: var(--padding);
  padding-top: 24px;
  overflow: hidden;
  background-color: var(--color-bg-1);
  border-radius: var(--border-radius-large);
}

.fast-card-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
</style>
