<template>
  <GiSvgIcon class="switcher-icon" name="plus-square" :size="16" v-if="hasChildren && expanded" />
  <GiSvgIcon
    class="switcher-icon"
    name="minus-square"
    :size="16"
    style="transform: rotate(0deg)"
    v-else-if="hasChildren && !expanded"
  />
  <icon-drive-file :size="16" v-else />
</template>

<script lang="ts" setup name="TreeSwitcherIcon">
interface Props {
  expanded: boolean
  hasChildren: boolean
}

withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped></style>
