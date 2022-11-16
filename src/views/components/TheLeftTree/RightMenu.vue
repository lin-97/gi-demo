<template>
  <a-menu class="menu">
    <a-menu-item @click="onClick('add')">
      <template #icon><icon-plus-circle :size="16" :stroke-width="3" /></template>
      <span>新增</span>
    </a-menu-item>
    <a-menu-item @click="onClick('edit')">
      <template #icon><icon-edit :size="16" :stroke-width="3" /></template>
      <span>编辑</span>
    </a-menu-item>
    <a-popover
      position="right"
      trigger="click"
      :content-style="{ padding: 0, overflow: 'hidden' }"
      :unmount-on-close="false"
    >
      <a-menu-item @click="onClick('move')">
        <template #icon><icon-export :size="16" :stroke-width="3" /></template>
        <a-space :size="18">
          <span>移动</span>
          <icon-right />
        </a-space>
      </a-menu-item>
      <template #content>
        <a-scrollbar style="height: 100%; overflow: auto" outer-style="width: 260px;height: 500px">
          <a-tree
            ref="treeMoveRef"
            show-line
            size="mini"
            :data="treeData[0].children"
            :fieldNames="{
              key: 'id',
              title: 'name'
            }"
          >
            <template #switcher-icon="node, { checked, selected, expanded }">
              <TreeSwitcherIcon
                :expanded="expanded"
                :has-children="Boolean(node.children && node.children.length)"
              ></TreeSwitcherIcon>
            </template>
            <template #icon="node">
              <GiSvgIcon name="com-file-close" :size="16" v-if="!node.children"></GiSvgIcon>
              <GiSvgIcon name="com-file-open" :size="16" v-else-if="node.children"></GiSvgIcon>
              <GiSvgIcon name="com-file" :size="16" v-else></GiSvgIcon>
            </template>
          </a-tree>
        </a-scrollbar>
      </template>
    </a-popover>

    <a-menu-item @click="onClick('delete')">
      <template #icon><icon-delete :size="16" :stroke-width="3" /></template>
      <span>删除</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import TreeSwitcherIcon from './TreeSwitcherIcon.vue'

interface Props {
  treeData: any
}

withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['click'])

const onClick = (mode: string) => {
  emit('click', mode)
}
</script>

<style lang="scss" scoped>
:deep(.arco-menu-inner) {
  padding: 4px;
  .arco-menu-item {
    height: 34px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.menu {
  width: 120px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
