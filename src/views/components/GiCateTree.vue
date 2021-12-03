<template>
  <div class="cate-tree">
    <a-input-search placeholder="请输入关键字" style="margin-bottom: 8px; width: 100%" v-model="searchKey" />
    <section class="tree-wrap">
      <a-tree
        default-expand-all
        :data="treeData"
        :show-line="true"
        :field-names="{
          key: 'id',
          title: 'name',
          children: 'children'
        }"
      ></a-tree>
    </section>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { data } from './data.js'

const treeData = ref(data)
let searchKey = ref('')
</script>

<style lang="scss" scoped>
.cate-tree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tree-wrap {
    flex: 1;
    overflow: scroll;
    position: relative;
  }
}
</style>
