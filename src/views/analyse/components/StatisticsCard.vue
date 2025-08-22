<template>
  <a-card :title="props.title" :bordered="false" class="statistics-card h-full">
    <template #extra>
      <a-tag :color="TAG_COLOR_MAP[props?.extra || '']" bordered>{{ props?.extra }}</a-tag>
    </template>
    <a-row justify="space-between" class="statistics-card__content">
      <div class="statistics-card__content-left">
        <slot>
          <a-statistic :value="props.value" :value-from="0" :start="true" animation show-group-separator></a-statistic>
        </slot>
        <div class="statistics-card__content-tip">
          <slot name="content-tip"></slot>
        </div>
      </div>
      <div class="statistics-card__content-right">
        <slot name="content-right"></slot>
      </div>
    </a-row>
    <a-divider :margin="16"></a-divider>
    <a-row justify="space-between">
      <a-typography-text type="secondary">{{ props.footerLabel }}</a-typography-text>
      <a-typography-text type="secondary">{{ props.footerValue }}</a-typography-text>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  extra?: '日' | '月' | '季' | '周' | undefined
  value?: number
  footerLabel?: string
  footerValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  extra: undefined,
  value: 0,
  footerLabel: '',
  footerValue: ''
})

const TAG_COLOR_MAP: Record<string, string> = {
  日: 'green',
  月: 'arcoblue',
  季: 'orange',
  周: 'purple'
}
</script>

<style lang="scss" scoped>
:deep(.arco-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.arco-tag-size-medium) {
  width: 24px;
  padding: 0;
  justify-content: center;
}

.statistics-card {
  display: flex;
  flex-direction: column;

  &__content {
    flex: 1;
  }

  &__content-tip {
    height: 30px;
    display: flex;
    align-items: center;
  }
}
</style>
