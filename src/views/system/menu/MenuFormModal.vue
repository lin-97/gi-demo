<template>
  <a-modal v-model:visible="visible" :title="title" width="calc(100% - 20px)" :modal-style="{ maxWidth: '625px' }"
    :body-style="{ maxHeight: '70vh' }" :mask-closable="false" @before-ok="save" @close="close">
    <GiForm ref="GiFormRef" :model-value="form" :columns="formColumns" :grid-item-props="{ span: 24 }"
      @update:model-value="Object.assign(form, $event)">
      <template #icon>
        <a-input-group>
          <a-select v-model="form.iconType" placeholder="请选择图标类型" style="width: 150px" @change="handleChangeIconType">
            <a-option value="arco">Arco</a-option>
            <a-option value="custom">自定义</a-option>
          </a-select>
          <GiIconSelector :key="form.iconType" v-model="form.icon" :type="form.iconType" />
        </a-input-group>
      </template>
    </GiForm>
  </a-modal>
</template>

<script setup lang="ts">
import type * as T from '@/apis/system/menu'
import type { FormColumnItem } from '@/components/index'
import { Message, Tag } from '@arco-design/web-vue'
import { h, watch } from 'vue'
import { mapTree } from 'xe-utils'
import { baseAPI } from '@/apis/system/menu'
import { GiForm, GiIconSelector } from '@/components/index'
import { useResetReactive } from '@/hooks'
import { filterTree, transformPathToName } from '@/utils'
import { isExternal } from '@/utils/validate'

interface Props {
  menus?: T.ListItem[]
}

const props = withDefaults(defineProps<Props>(), {
  menus: () => []
})

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const menuSelectTree = computed(() => {
  const menus = JSON.parse(JSON.stringify(props.menus)) as T.ListItem[]
  const data = filterTree(menus, (i) => [1, 2].includes(i.type))
  return mapTree(data, (i) => ({
    id: i.id,
    title: i.title,
    children: i.children
  }))
})

const GiFormRef = useTemplateRef<InstanceType<typeof GiForm>>('GiFormRef')
const menuId = ref('')
const visible = ref(false)
const isEdit = computed(() => !!menuId.value)
const title = computed(() => (isEdit.value ? '编辑菜单' : '新增菜单'))

const [form, resetForm] = useResetReactive({
  type: 1,
  icon: '',
  iconType: 'arco' as 'arco' | 'custom',
  title: '',
  sort: 0,
  status: 1,
  path: '',
  component: '',
  keepAlive: false,
  hidden: true,
  parentId: '',
  redirect: '',
  isExternalUrl: false,
  breadcrumb: true,
  showInTabs: true,
  alwaysShow: false,
  permission: '',
  activeMenu: '',
  children: [],
  id: '',
  roles: [],
  affix: false
} as T.ListItem & { iconType: 'arco' | 'custom', isExternalUrl: boolean })

const routeName = computed(() => transformPathToName(form.path))

const col3Span = { xs: 24, sm: 12, md: 8, lg: 8, xl: 8, xxl: 8 }

const handleChangeIconType = () => {
  form.icon = ''
}

watch(() => form.iconType, () => {
  form.icon = ''
})

watch(() => form.type, () => {
  GiFormRef.value?.formRef?.clearValidate()
})

const formColumns = computed<FormColumnItem[]>(() => [
  {
    type: 'radio-group',
    label: '菜单类型',
    field: 'type',
    props: {
      type: 'button',
      options: [
        { label: '目录', value: 1 },
        { label: '菜单', value: 2 },
        { label: '按钮', value: 3 }
      ]
    },
    disabled: () => isEdit.value
  },
  {
    type: 'tree-select',
    label: '上级菜单',
    field: 'parentId',
    required: form.type === 3,
    rules: form.type === 3 ? [{ required: true, message: '请选择上级菜单' }] : undefined,
    props: {
      data: menuSelectTree.value,
      fieldNames: { key: 'id', title: 'title', children: 'children' },
      allowClear: true,
      allowSearch: true
    },
    disabled: () => isEdit.value
  },
  {
    type: 'slot',
    label: '菜单图标',
    field: 'icon',
    hide: () => ![1, 2].includes(form.type)
  },
  {
    type: 'input',
    label: '菜单标题',
    field: 'title',
    required: true,
    rules: [{ required: true, message: '请输入菜单标题' }],
    props: { maxLength: 10 }
  },
  {
    type: 'input',
    label: '路由路径',
    field: 'path',
    required: [1, 2].includes(form.type),
    rules: [1, 2].includes(form.type) ? [{ required: true, message: '请输入路由路径' }] : undefined,
    hide: () => ![1, 2].includes(form.type),
    props: { maxLength: 50 },
    formItemSlots: {
      extra: () => h('div', { class: 'flex items-center gap-2 mt-1' }, [
        h('span', '路由名称由系统自动生成：'),
        routeName.value ? h(Tag, {}, () => routeName.value) : null
      ])
    }
  },
  {
    type: 'input',
    label: '重定向',
    field: 'redirect',
    hide: () => ![1, 2].includes(form.type) || form.isExternalUrl,
    props: { maxLength: 50 }
  },
  {
    type: 'radio-group',
    label: '是否外链',
    field: 'isExternalUrl',
    hide: () => ![1, 2].includes(form.type),
    props: {
      type: 'button',
      options: [
        { label: '是', value: true },
        { label: '否', value: false }
      ]
    }
  },
  {
    type: 'input',
    label: '组件路径',
    field: 'component',
    required: form.type === 2,
    rules: form.type === 2 ? [{ required: true, message: '请输入组件路径' }] : undefined,
    hide: () => form.type !== 2,
    props: { maxLength: 50 },
    slots: {
      prepend: () => (form.isExternalUrl ? null : h('span', '@/views/')),
      append: () => (form.isExternalUrl ? null : h('span', '.vue'))
    }
  },
  {
    type: 'switch',
    label: '状态',
    field: 'status',
    hide: () => ![1, 2].includes(form.type),
    props: { type: 'round', checkedValue: 1, uncheckedValue: 0, checkedText: '启用', uncheckedText: '禁用' },
    gridItemProps: { span: col3Span }
  },
  {
    type: 'switch',
    label: '是否隐藏',
    field: 'hidden',
    hide: () => ![1, 2].includes(form.type),
    props: { type: 'round', checkedValue: true, uncheckedValue: false, checkedText: '是', uncheckedText: '否' },
    gridItemProps: { span: col3Span }
  },
  {
    type: 'switch',
    label: '是否缓存',
    field: 'keepAlive',
    hide: () => ![1, 2].includes(form.type),
    props: { type: 'round', checkedValue: true, uncheckedValue: false, checkedText: '是', uncheckedText: '否' },
    gridItemProps: { span: col3Span }
  },
  {
    type: 'switch',
    label: '面包屑',
    field: 'breadcrumb',
    hide: () => ![1, 2].includes(form.type),
    props: { type: 'round', checkedValue: true, uncheckedValue: false, checkedText: '显示', uncheckedText: '隐藏' },
    gridItemProps: { span: col3Span }
  },
  {
    type: 'switch',
    label: '总是显示',
    field: 'alwaysShow',
    hide: () => form.type !== 1,
    props: { type: 'round', checkedValue: true, uncheckedValue: false, checkedText: '显示', uncheckedText: '隐藏' },
    gridItemProps: { span: col3Span }
  },
  {
    type: 'switch',
    label: '页签显示',
    field: 'showInTabs',
    hide: () => form.type !== 2,
    props: { type: 'round', checkedValue: true, uncheckedValue: false, checkedText: '显示', uncheckedText: '隐藏' },
    gridItemProps: { span: col3Span }
  },
  {
    type: 'input',
    label: '权限标识',
    field: 'permission',
    required: form.type === 3,
    rules: form.type === 3 ? [{ required: true, message: '请输入权限标识' }] : undefined,
    hide: () => form.type !== 3,
    props: { maxLength: 20, placeholder: 'sys:btn:add' }
  },
  {
    type: 'input-number',
    label: '菜单排序',
    field: 'sort',
    props: { min: 1, mode: 'button', style: { width: '120px' } }
  }
] as FormColumnItem[])

const add = () => {
  menuId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  visible.value = true
  menuId.value = id
  const res = await baseAPI.getDetail({ id })
  Object.assign(form, res.data)
  form.isExternalUrl = isExternal(form.path)
}

const close = () => {
  GiFormRef.value?.formRef?.resetFields()
  resetForm()
}

const save = async () => {
  try {
    const valid = await GiFormRef.value?.formRef?.validate()
    if (valid) return false
    const res = await new Promise((resolve) => setTimeout(() => resolve(true), 300))
    if (res) {
      Message.success('模拟保存成功')
      emit('save-success')
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}

defineExpose({ add, edit })
</script>
