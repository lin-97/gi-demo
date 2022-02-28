import { computed, defineProps, defineEmits } from 'vue'

export default function () {
  const props = defineProps({
    // 绑定的值
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const visible = computed<boolean>({
    get: () => {
      return props.modelValue
    },
    set: (v) => {
      emit('update:modelValue', v)
    }
  })

  return { visible }
}
