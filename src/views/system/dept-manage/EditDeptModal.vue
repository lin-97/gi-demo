<template>
  <a-modal v-model:visible="visible" :title="title">
    <a-form ref="formRef" :model="form" size="medium" auto-label-width>
      <a-form-item label="上级部门" name="parentId">
        <a-tree-select
          v-model="form.parentId"
          allow-clear
          :data="deptList"
          placeholder="请选择"
          :fieldNames="{
            key: 'id',
            title: 'name',
            children: 'children'
          }"
        ></a-tree-select>
      </a-form-item>
      <a-form-item
        label="部门名称"
        field="name"
        :rules="[
          { required: true, message: '请输入部门名称' },
          { min: 3, max: 10, message: '长度在 3 - 10个字符' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.name" placeholder="请输入部门名称" allow-clear></a-input>
      </a-form-item>
      <a-form-item label="排序" name="sort" :rules="[{ required: true, message: '请输入排序序号' }]">
        <a-input-number v-model="form.sort" style="width: 120px" />
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
import { reactive, computed, ref } from 'vue'
import { useApiDept } from '@/hooks'

const deptId = ref('')
const visible = ref(false)
const title = computed(() => (!!deptId.value ? '编辑部门' : '新增部门'))
const { deptList, getDeptList } = useApiDept()

const form = reactive({
  id: '',
  parentId: '',
  name: '',
  sort: 0,
  status: 1
})

const add = () => {
  deptId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  if (!deptList.value.length) {
    await getDeptList()
  }
  deptId.value = id
  visible.value = true
}

defineExpose({ add, edit })
</script>
