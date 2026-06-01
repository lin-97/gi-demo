<template>
  <div class="gi-trend">
    <span class="gi-trend__label">{{ props.label }}</span>
    <span class="gi-trend__value">
      <span>{{ props.value }}{{ props.unit }}</span>
      <span class="gi-trend__trend"
        :class="{ 'gi-trend__trend--positive': isPositive, 'gi-trend__trend--negative': isNegative }">
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
  font-size: 14px;

  &__value {
    font-weight: 600;
  }

  &__trend {
    &--positive {
      color: rgb(var(--success-6));
    }

    &--negative {
      color: rgb(var(--warning-6));
    }
  }
}
</style>
