<template>
  <a-modal v-model:visible="visible" title="新增用户">
    <a-form ref="formRef" :model="form" :labelCol="{ span: 4 }" auto-label-width>
      <a-form-item
        label="姓名"
        field="userName"
        :rules="[
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 - 4个字符', trigger: 'blur' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input placeholder="请输入用户姓名" v-model="form.userName"></a-input>
      </a-form-item>
      <a-form-item label="头像" field="avatar">
        <a-avatar :size="60" :trigger-icon-style="{ color: '#3491FA' }">
          <img src="@/assets/images/avatar.jpg" />
          <template #trigger-icon>
            <IconCamera />
          </template>
        </a-avatar>
      </a-form-item>
      <a-form-item label="性别" field="sex">
        <a-radio-group v-model="form.sex">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="0">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="地址" field="address">
        <a-cascader
          v-model="form.address"
          :options="treeData"
          :field-names="{ value: 'code', label: 'label' }"
          placeholder="请选择省市区"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useArea } from '@/hooks'
const { getAreaTreeData } = useArea()

const emit = defineEmits(['update:modelValue'])

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

const form = reactive({
  userName: '',
  sex: 0,
  address: ''
})

const treeData = ref([])
treeData.value = getAreaTreeData()

const visible = computed<boolean>({
  get: () => {
    return props.modelValue
  },
  set: (v) => {
    emit('update:modelValue', v)
  }
})
</script>
