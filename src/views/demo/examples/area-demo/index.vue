<template>
  <a-card title="省市区域选择" :bordered="false">
    <a-alert>采用了vant UI的省市区的数据源</a-alert>
    <div class="wrap">
      <section class="tree-box">
        <a-tree block-node :data="treeData" :field-names="{
          key: 'code',
          title: 'label',
          children: 'children',
        }" :virtual-list-props="{
          height: 500,
          isStaticItemHeight: true,
        }"></a-tree>
      </section>

      <section>
        <a-cascader :options="treeData" :field-names="{ value: 'code', label: 'label' }" :style="{ width: '320px' }"
          placeholder="请选择省市区" />
      </section>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { useArea } from './useArea'

defineOptions({ name: 'TheArea' })

const { getAreaTreeData } = useArea()

const treeData = ref([])
treeData.value = getAreaTreeData()
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  margin-top: 12px;
}

.tree-box {
  width: 270px;
  padding-left: 12px;
  border: 1px solid var(--color-border-2);
  background: var(--color-bg-2);
  margin-right: 50px;
}
</style>
