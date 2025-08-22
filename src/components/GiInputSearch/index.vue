<template>
  <a-input-group class="gi-input-search">
    <a-input v-model="model" :placeholder="props.placeholder" readonly></a-input>
    <template v-if="!props.readonly">
      <a-button :disabled="props.disabled" @click="emit('search', model)">
        <template #icon><icon-search /></template>
      </a-button>
      <a-button :disabled="props.disabled" @click="emit('clear')">
        <template #icon><icon-close /></template>
      </a-button>
    </template>
  </a-input-group>
</template>

<script setup lang="ts">
interface Props {
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
}

const model = defineModel({ type: String, default: '' })

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
  disabled: false,
  readonly: false
})

const emit = defineEmits<{
  (e: 'search', value: string): void
  (e: 'clear'): void
}>()
</script>

<style lang="scss" scoped>
.gi-input-search {
  display: flex;
  width: 100%;

  > :deep(.arco-btn) {
    flex-shrink: 0;

    &:hover,
    &:active {
      z-index: 1;
    }
  }

  > :deep(.arco-btn + .arco-btn) {
    margin-left: -1px;
  }
}
</style>
