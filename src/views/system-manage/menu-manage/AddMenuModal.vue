<template>
  <a-modal v-model:visible="visible" title="新增菜单">
    <a-form ref="formRef" :model="form" :labelCol="{ span: 4 }">
      <a-form-item label="上级菜单" parentId="name">
        <a-tree-select
          :data="treeData"
          v-model="form.parentId"
          placeholder="请选择"
          :field-names="{
            key: 'id',
            title: 'name',
            children: 'children'
          }"
        ></a-tree-select>
      </a-form-item>
      <a-form-item
        label="菜单名称"
        field="name"
        :rules="[
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 10个字符', trigger: 'blur' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input placeholder="请输入菜单名称" v-model="form.name"> </a-input>
      </a-form-item>
      <a-form-item
        label="菜单地址"
        field="path"
        :rules="[
          { required: true, message: '请输入菜单地址', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 30个字符', trigger: 'blur' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input placeholder="请输入菜单地址" v-model="form.path"> </a-input>
      </a-form-item>
      <a-form-item label="是否缓存" name="keepAlive">
        <a-switch size="medium" v-model="form.keepAlive"> </a-switch>
      </a-form-item>
      <a-form-item label="是否隐藏" name="hidden">
        <a-switch size="medium" v-model="form.hidden"> </a-switch>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  // 绑定的值
  modelValue: {
    type: Boolean,
    default: false
  },
  // 部门树
  treeData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])
const visible = useVModel(props, 'modelValue', emit)

const form = reactive({
  parentId: '',
  name: '',
  path: '',
  icon: '',
  keepAlive: false,
  hidden: false
})
</script>
