<template>
  <a-badge>
    <template #content>
      <icon-check-circle-fill v-if="appStore.layout === props.mode" style="color: rgb(var(--success-6))"
        :size="16"></icon-check-circle-fill>
    </template>

    <div class="layout-item" :class="`layout-item-${props.mode}`" @click="emit('click')">
      <template v-if="props.mode === 'left'">
        <div class="block-left"></div>
        <div class="block-right"></div>
      </template>

      <template v-if="props.mode === 'top'">
        <div class="block-top"></div>
        <div class="block-bottom"></div>
      </template>

      <template v-if="props.mode === 'mix'">
        <div class="block-top"></div>
        <div class="block-main">
          <div class="block-left"></div>
          <div class="block-right"></div>
        </div>
      </template>
    </div>

    <p class="layout-item-text">{{ props.name }}</p>
  </a-badge>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

interface Props {
  mode: 'left' | 'top' | 'mix'
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'left'
})

const emit = defineEmits(['click'])
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.layout-item {
  width: 70px;
  height: 50px;
  padding: 4px;
  background-color: var(--color-bg-5);
  border: 1px solid var(--color-border-2);
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04);
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
}

.layout-item-text {
  font-size: 12px;
  text-align: center;
  color: var(--color-text-2);
  margin-top: 5px;
}

.block-left,
.block-right,
.block-top,
.block-bottom {
  border-radius: 2px;
}

.layout-item-left {
  .block-left {
    width: 10px;
    background-color: $color-theme;
  }

  .block-right {
    flex: 1;
    margin-left: 4px;
    background-color: var(--color-fill-3)
  }
}

.layout-item-top {
  flex-direction: column;

  .block-top {
    height: 8px;
    background-color: $color-theme;
  }

  .block-bottom {
    flex: 1;
    margin-top: 4px;
    background-color: var(--color-fill-3)
  }
}

.layout-item-mix {
  flex-direction: column;

  .block-top {
    height: 8px;
    background-color: $color-theme;
    margin-bottom: 3px;
  }

  .block-main {
    flex: 1;
    display: flex;

    .block-left {
      width: 10px;
      background-color: $color-theme;
    }

    .block-right {
      flex: 1;
      margin-left: 3px;
      background-color: var(--color-fill-3)
    }
  }
}
</style>
