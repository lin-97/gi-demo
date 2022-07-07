<template>
  <a-modal v-model:visible="visible" title="新增部门">
    <a-form ref="formRef" :model="form" :labelCol="{ span: 4 }">
      <a-form-item label="上级部门" name="parentId">
        <a-tree-select
          :data="treeData"
          placeholder="请选择"
          :fieldNames="{
            key: 'id',
            title: 'name',
            children: 'children'
          }"
          :treeProps="{
            virtualListProps: {
              height: 250
            }
          }"
        ></a-tree-select>
      </a-form-item>
      <a-form-item
        label="部门名称"
        field="name"
        :rules="[
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 10个字符', trigger: 'blur' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input placeholder="请输入部门名称" v-model="form.name"> </a-input>
      </a-form-item>
      <a-form-item
        label="部门编号"
        field="deptCode"
        :rules="[
          { required: true, message: '请输入部门编号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 30个字符', trigger: 'blur' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input placeholder="请输入部门编号" v-model="form.deptCode">
          <template #prepend>dept_code_</template>
        </a-input>
      </a-form-item>
      <a-form-item label="排序" name="order">
        <a-input-number v-model="form.order" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <a-radio-group v-model="form.status">
          <a-radio :value="1">正常</a-radio>
          <a-radio :value="0">禁用</a-radio>
        </a-radio-group>
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
  deptCode: '',
  order: '',
  status: 1
})
</script>
