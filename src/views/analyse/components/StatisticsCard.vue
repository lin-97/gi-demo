<template>
  <a-row justify="space-between" :wrap="false" class="statistics-card g-gradient-bg">
    <div class="statistics-card__left">
      <slot>
        <a-statistic :title="props.title" :value="props.value" :value-from="0" :start="true" animation
          show-group-separator></a-statistic>
      </slot>
      <div class="statistics-card__extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="statistics-card__right">
      <GiIconBox :color="iconBgColor" :size="48" style="border-radius: 10px;">
        <Icon class="statistics-card__right__icon" :icon="props.icon" :width="24" :height="24"
          :style="{ color: props.color }" />
      </GiIconBox>
    </div>
  </a-row>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { hexToRgb } from '@/utils'

interface Props {
  title?: string
  value?: number
  color?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  value: 0,
  color: '#377DFF',
  icon: ''
})

const iconBgColor = computed(() => {
  return `rgba(${hexToRgb(props.color)}, 0.15)`
})
</script>

<style lang="scss" scoped>
.statistics-card {
  box-sizing: border-box;
  height: 100%;
  padding: var(--padding);
  overflow: hidden;
  background-color: var(--color-bg-1);
  border-radius: 12px;

  &__tip {
    display: flex;
    align-items: center;
    height: 30px;
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &__icon {
      display: block;
    }
  }
}
</style>
