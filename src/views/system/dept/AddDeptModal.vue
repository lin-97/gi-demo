<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :width="isPhone() ? 360 : 'auto'"
    :mask-closable="false"
    @before-ok="save"
    @close="close"
  >
    <a-form ref="FormRef" :model="form" :rules="rules" size="medium" auto-label-width>
      <a-form-item label="上级部门" field="parentId">
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
      <a-form-item label="部门名称" field="name">
        <a-input v-model="form.name" placeholder="请输入部门名称" allow-clear></a-input>
      </a-form-item>
      <a-form-item label="排序" field="sort">
        <a-input-number v-model="form.sort" style="width: 120px" />
      </a-form-item>
      <a-form-item label="描述" field="description">
        <a-textarea
          v-model="form.description"
          :max-length="200"
          placeholder="请填写描述"
          :auto-size="{ minRows: 3 }"
          show-word-limit
        />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <a-switch
          type="round"
          v-model="form.status"
          :checked-value="1"
          :unchecked-value="0"
          checked-text="正常"
          unchecked-text="禁用"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { useDept } from '@/hooks/app'
import { getSystemDeptDetil, saveSystemDept } from '@/apis'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { isPhone } from '@/utils/common'

const FormRef = ref<FormInstance>()
const deptId = ref('')
const visible = ref(false)
const isEdit = computed(() => !!deptId.value)
const title = computed(() => (isEdit.value ? '编辑部门' : '新增部门'))
const { deptList, getDeptList } = useDept()
getDeptList()

const form = reactive({
  id: '',
  parentId: '',
  name: '',
  sort: 0,
  status: 1,
  description: ''
})

const rules = {
  name: [
    { required: true, message: '请输入部门名称' },
    { min: 3, max: 10, message: '长度在 3 - 10个字符' }
  ]
}

const add = () => {
  deptId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  if (!deptList.value.length) {
    await getDeptList()
  }
  deptId.value = id
  const res = await getSystemDeptDetil({ id })
  Object.assign(form, res.data)
  visible.value = true
}

const close = () => {
  FormRef.value?.resetFields()
}

defineExpose({ add, edit })

const save = async () => {
  try {
    const res = await saveSystemDept(form)
    if (res.data) {
      Message.success('模拟保存成功')
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}
</script>
