<template>
  <div class="split-button" @click="emit('click')">
    <icon-right v-if="props.collapsed" />
    <icon-left v-else />
  </div>
</template>

<script lang='ts' setup>
interface Props {
  collapsed: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang='scss' scoped>
.split-button {
  width: 20px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  border: 1px solid var(--color-border-2);
  border-left: none;
  background-color: var(--color-bg-1);
  cursor: pointer;
}
</style>
