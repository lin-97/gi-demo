/**
 * @file GiDot 组件 - 用于显示带有可选动画效果的状态点
 */

import { type PropType, defineComponent } from 'vue'
import './dot.scss'

/** 点的类型 */
type DotType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

/** 组件属性定义 */
interface DotProps {
  /** 是否启用动画效果 */
  animation?: boolean
  /** 点的类型 */
  type?: DotType
}

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
  setup(props: DotProps) {
    return () => (
      <span
        class={['gi-dot', { 'gi-dot-processing': props.animation }, `gi-dot-${props.type}`]}
      />
    )
  }
})
