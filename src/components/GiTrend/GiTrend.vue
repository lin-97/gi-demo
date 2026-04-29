<template>
  <div class="gi-trend">
    <span class="gi-trend__label">{{ props.label }}</span>
    <span class="gi-trend__value"
      :class="{ 'gi-trend__value--positive': isPositive, 'gi-trend__value--negative': isNegative }">
      <span>{{ props.value }}{{ props.unit }}</span>
      <span class="gi-trend__trend">
        <icon-caret-up v-if="isPositive" />
        <icon-caret-down v-else-if="isNegative" />
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  value?: number
  unit?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  value: undefined,
  unit: '%'
})

const isPositive = computed(() => props?.value && props.value > 0
)
const isNegative = computed(() => props?.value && props.value < 0
)
</script>

<style scoped lang="scss">
.gi-trend {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  font-size: 12px;

  &__value {
    font-weight: 600;

    &--positive {
      color: #00d89f;
    }

    &--negative {
      color: #ef4444;
    }
  }
}
</style>
