import type { FormInstance } from '@arco-design/web-vue'
import { Form, Input, Modal } from '@arco-design/web-vue'
import { reactive } from 'vue'
import * as Regexp from '@/utils/regexp'

// 打开添加用户的弹窗
export const openAddUserModal = () => {
  const form = reactive({
    name: '',
    phone: ''
  })

  const formRef = ref<FormInstance | null>(null)

  const rules: FormInstance['rules'] = {
    name: [
      { required: true, message: '请输入姓名' },
      { match: Regexp.OnlyCh, message: '只能是中文姓名' },
      { minLength: 1, maxLength: 4, message: '名字最长不超过4个字符' }
    ],
    phone: [
      { required: true, message: '请输入手机号' },
      { match: Regexp.Phone, message: '手机号格式不正确' }
    ]
  }

  const saveUserApi = () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(true)
      }, 2000)
    )
  }

  Modal.open({
    title: '添加用户',
    content: () => (
      <Form ref={formRef} model={form} rules={rules} auto-label-width>
        <Form.Item label="用户名" field="name">
          <Input v-model={form.name} placeholder="请输入用户名" max-length={4} allow-clear />
        </Form.Item>
        <Form.Item label="手机号" field="phone">
          <Input v-model={form.phone} placeholder="请输入手机号" max-length={11} allow-clear />
        </Form.Item>
      </Form>
    ),
    width: 'calc(100% - 20px)',
    modalStyle: { maxWidth: '450px' },
    okText: '添加',
    onBeforeOk: async () => {
      const valid = await formRef.value?.validate()
      if (valid) return false
      try {
        await saveUserApi()
        return true
      } catch {
        return false
      }
    }
  })
}
