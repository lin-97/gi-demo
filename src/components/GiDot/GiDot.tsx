/**
 * @file GiDot 组件 - 用于显示带有可选动画效果的状态点
 */
import type { PropType } from 'vue'
import type { DotType, DotProps as Props } from './type'
import { defineComponent } from 'vue'
import './dot.scss'

export default defineComponent({
  name: 'GiDot',
  props: {
    animation: {
      type: Boolean as PropType<boolean>,
      default: true,
      required: false
    },
    type: {
      type: String as PropType<DotType>,
      default: 'primary',
      required: false,
      validator: (value: string): boolean => {
        return ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
      }
    }
  },
  setup(props: Props) {
    return () => (
      <span
        class={['gi-dot', { 'gi-dot-processing': props.animation }, `gi-dot-${props.type}`]}
      />
    )
  }
})
