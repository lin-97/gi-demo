/**
 * @file GiTag 组件 - 提供多样化的标签展示
 * @description 支持多种样式类型、状态、颜色和大小的标签组件
 */

import type { CSSProperties, PropType } from 'vue'
import type { TagProps as Props } from './type'
import { computed, defineComponent } from 'vue'
import './tag.scss'

/** 基础颜色映射表 */
const BASE_COLORS: Record<string, string> = {
  red: '#FF0000',
  orangered: '#f77234',
  orange: '#ff7d00',
  gold: '#f7ba1e',
  lime: '#9fdb1d',
  green: '#00b42a',
  cyan: '#14c9c9',
  blue: '#3491fa',
  purple: '#722ed1',
  pink: '#f5319d',
  gray: '#86909c'
} as const

export default defineComponent({
  name: 'GiTag',
  props: {
    type: {
      type: String as PropType<Props['type']>,
      default: 'light'
    },
    status: {
      type: String as PropType<Props['status']>,
      default: 'primary'
    },
    color: {
      type: String as PropType<Props['color'] | string>,
      default: ''
    },
    size: {
      type: String as PropType<Props['size']>,
      default: 'small'
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'close'],
  setup(props: Props, { slots, emit }) {
    /**
     * 将十六进制颜色转换为 RGB 对象
     * @param hex - 十六进制颜色值
     */
    const hexToRgb = (hex: string) => {
      const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex
      return {
        r: Number.parseInt(cleanHex.slice(0, 2), 16),
        g: Number.parseInt(cleanHex.slice(2, 4), 16),
        b: Number.parseInt(cleanHex.slice(4, 6), 16)
      }
    }

    /** 计算标签的 class */
    const className = computed(() => {
      return [
        'gi-tag',
        props.type && `gi-tag__type--${props.type}`,
        props.size && `gi-tag__size--${props.size}`,
        props.status && `gi-tag__status--${props.status}`
      ].filter(Boolean)
    })

    /** 计算标签的样式 */
    const calcStyle = computed((): CSSProperties => {
      if (!props.color) return {}

      const color = BASE_COLORS[props.color as string] || props.color
      const { r, g, b } = hexToRgb(color)
      const style: CSSProperties = {}

      switch (props.type) {
        case 'light':
          style.color = color
          style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`
          style['--tag-close-hover-bg-color'] = color
          break
        case 'dark':
          style.color = '#fff'
          style.backgroundColor = color
          style['--tag-close-hover-color'] = color
          style['--tag-close-hover-bg-color'] = 'rgba(255, 255, 255, 0.9)'
          break
        case 'outline':
          style.color = color
          style.backgroundColor = 'transparent'
          style.borderColor = color
          style['--tag-close-hover-bg-color'] = color
          break
        case 'light-outline':
          style.color = color
          style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`
          style.borderColor = `rgba(${r}, ${g}, ${b}, 0.2)`
          style['--tag-close-hover-bg-color'] = color
          break
      }

      return style
    })

    /** 点击标签事件处理 */
    const handleClick = () => emit('click')

    /** 关闭标签事件处理 */
    const handleClose = (event: MouseEvent) => {
      event.stopPropagation()
      emit('close')
    }

    /** 关闭图标组件 */
    const CloseIcon = props.closable && (
      <span class="gi-tag-close-btn" onClick={handleClose}>
        <icon-close class="close-icon" />
      </span>
    )

    return () => (
      <span class={className.value} style={calcStyle.value} onClick={handleClick}>
        {slots.default?.()}
        {CloseIcon}
      </span>
    )
  }
})
