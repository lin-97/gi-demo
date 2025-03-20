<!--
  @file GiForm 组件
  @description 动态表单组件，支持多种表单项类型、栅格布局、搜索模式等功能
-->
<template>
  <a-form ref="formRef" v-bind="formProps" :model="modelValue">
    <a-grid class="w-full" :col-gap="8" v-bind="props.gridProps" :collapsed="collapsed">
      <!-- 表单项列表 -->
      <template v-for="item in columns" :key="item.field">
        <a-grid-item v-if="item.show !== undefined ? isShow(item) : !isHide(item)"
          v-bind="item.gridItemProps || defaultGridItemProps"
          :span="item.span || item.gridItemProps?.span || defaultGridItemProps?.span">
          <a-form-item v-bind="item.formItemProps" :field="item.field" :rules="getFormItemRules(item)"
            :disabled="isDisabled(item)">
            <!-- 表单项标签 -->
            <template #label>
              <template v-if="typeof item.label === 'string'">{{ item.label }}</template>
              <component :is="item.label" v-else></component>
            </template>

            <!-- 表单项内容 -->
            <slot v-if="!['group-title'].includes(item.type || '')" :name="item.field"
              v-bind="{ disabled: isDisabled(item) }">
              <component :is="`a-${item.type}`" v-bind="getComponentBindProps(item)"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="updateValue($event, item.field)">
                <!-- 组件插槽 -->
                <template v-for="(slotValue, slotKey) in item?.slots" :key="slotKey" #[slotKey]="scope">
                  <template v-if="typeof slotValue === 'string'">{{ slotValue }}</template>
                  <template v-else-if="slotValue">
                    <component :is="slotValue(scope)"></component>
                  </template>
                </template>
              </component>
            </slot>

            <!-- 分组标题 -->
            <slot v-else name="group-title">
              <a-alert v-bind="item.props">{{ item.label }}</a-alert>
            </slot>

            <!-- 表单项插槽 -->
            <template v-for="(slotValue, slotKey) in item?.formItemSlots" :key="slotKey" #[slotKey]>
              <template v-if="typeof slotValue === 'string'">{{ slotValue }}</template>
              <component :is="slotValue" v-else></component>
            </template>
          </a-form-item>
        </a-grid-item>
      </template>

      <!-- 搜索按钮组 -->
      <a-grid-item v-if="props.search" :key="!props.suffix ? String(collapsed) : undefined"
        v-bind="defaultGridItemProps" :span="defaultGridItemProps?.span"
        :suffix="props.search && (props.suffix || (!props.suffix && collapsed))">
        <a-space wrap>
          <slot name="suffix">
            <a-button type="primary" @click="emit('search')">
              <template #icon><icon-search /></template>
              <template #default>{{ props.searchBtnText }}</template>
            </a-button>
            <a-button @click="emit('reset')">重置</a-button>
            <a-button v-if="!props.hideFoldBtn" class="gi-form__fold-btn" type="text" size="mini"
              @click="collapsed = !collapsed">
              <template #icon>
                <icon-up v-if="!collapsed" />
                <icon-down v-else />
              </template>
              <template #default>{{ collapsed ? '展开' : '收起' }}</template>
            </a-button>
          </slot>
        </a-space>
      </a-grid-item>
    </a-grid>
  </a-form>
</template>

<script setup lang="ts">
import { cloneDeep, omit } from 'lodash-es'
import type { FormInstance, GridItemProps, GridProps } from '@arco-design/web-vue'
import type { ColumnItem } from './type'

/** Props 类型定义 */
interface Props {
  /** 表单数据对象 */
  modelValue: any
  /** 表单布局方式 */
  layout?: FormInstance['layout']
  /** 表单尺寸 */
  size?: FormInstance['size']
  /** 标签布局属性 */
  labelColProps?: FormInstance['labelColProps']
  /** 表单项布局属性 */
  wrapperColProps?: FormInstance['wrapperColProps']
  /** 标签对齐方式 */
  labelAlign?: FormInstance['labelAlign']
  /** 是否禁用表单 */
  disabled?: FormInstance['disabled']
  /** 表单校验规则 */
  rules?: FormInstance['rules']
  /** 自动标签宽度 */
  autoLabelWidth?: FormInstance['autoLabelWidth']
  /** 表单ID */
  id?: FormInstance['id']
  /** 是否滚动到第一个错误项 */
  scrollToFirstError?: FormInstance['scrollToFirstError']
  /** 表单列配置 */
  columns: ColumnItem[]
  /** 栅格布局属性 */
  gridProps?: GridProps
  /** 栅格项属性 */
  gridItemProps?: GridItemProps
  /** 是否为搜索模式 */
  search?: boolean
  /** 默认是否折叠 */
  defaultCollapsed?: boolean
  /** 搜索按钮文字 */
  searchBtnText?: string
  /** 是否隐藏折叠按钮 */
  hideFoldBtn?: boolean
  /** 是否显示后缀 */
  suffix?: boolean
}

// Props 默认值
const props = withDefaults(defineProps<Props>(), {
  autoLabelWidth: true,
  scrollToFirstError: true,
  defaultCollapsed: false,
  search: false,
  gridItemProps: () => ({ span: { xs: 24, sm: 12 } }),
  searchBtnText: '搜索',
  hideFoldBtn: false,
  suffix: true
})

/** Emits 类型定义 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'search'): void
  (e: 'reset'): void
}>()

/** 表单属性计算 */
const formProps = computed(() => {
  const baseProps = omit(props, [
    'columns',
    'gridProps',
    'gridItemProps',
    'search',
    'defaultCollapsed',
    'searchBtnText',
    'hideFoldBtn',
    'suffix',
    'layout'
  ])
  return {
    layout: ((props.search ? 'inline' : 'horizontal') as FormInstance['layout']),
    ...baseProps
  }
})

/** 默认栅格项属性 */
const defaultGridItemProps = computed(() => props.gridItemProps)

/** 组件状态 */
const formRef = useTemplateRef('formRef')
/** 是否折叠 */
const collapsed = ref(props.defaultCollapsed)
/** 数据字典 */
const dicData: Record<string, any> = reactive({})

/** 静态配置 */
const STATIC_PROPS = new Map<ColumnItem['type'], Partial<ColumnItem['props']>>([
  ['input', { allowClear: true, maxLength: 20 }],
  ['textarea', { allowClear: false, maxLength: 200 }],
  ['input-tag', { allowClear: true }],
  ['mention', { allowClear: true }],
  ['select', { allowClear: true }],
  ['tree-select', { allowClear: true }],
  ['cascader', { allowClear: true }],
  ['date-picker', { allowClear: true }],
  ['time-picker', { allowClear: true }]
])

/** 获取组件默认占位 */
const getPlaceholder = (item: ColumnItem) => {
  if (!item.type) return undefined
  if (['input', 'input-tag', 'mention'].includes(item.type)) {
    return `请输入${item.label}`
  }
  if (['textarea'].includes(item.type)) {
    return `请填写${item.label}`
  }
  if (['select', 'tree-select', 'cascader'].includes(item.type)) {
    return `请选择${item.label}`
  }
  if (['date-picker'].includes(item.type)) {
    return '请选择日期'
  }
  if (['time-picker'].includes(item.type)) {
    return '请选择时间'
  }
  return undefined
}

/** 获取选项数据 */
const getOptions = (item: ColumnItem): any[] | undefined => {
  if (!item.type) return undefined
  /** 需要选项数据的组件类型 */
  const arr = ['select', 'tree-select', 'cascader', 'radio-group', 'checkbox-group']
  if (arr.includes(item.type)) {
    return dicData[item.field] || []
  }
  return undefined
}

/** 获取组件绑定属性 */
const getComponentBindProps = (item: ColumnItem) => {
  return {
    ...STATIC_PROPS.get(item.type) || {},
    placeholder: getPlaceholder(item),
    options: getOptions(item),
    ...item.props
  }
}

/** 表单数据更新处理 */
const updateValue = (value: any, field: string) => {
  emit('update:modelValue', Object.assign(props.modelValue, { [field]: value }))
}

/** 获取表单项校验规则 */
const getFormItemRules = (item: ColumnItem) => {
  if (item.required) {
    return [
      { required: true, message: `${item.label}为必填项` },
      ...(Array.isArray(item.rules) ? item.rules : [])
    ]
  }
  return item.rules
}

/** 判断表单项是否显示 */
const isShow = (item: ColumnItem) => {
  if (typeof item.show === 'boolean') return item.show
  if (typeof item.show === 'function') {
    return item.show(props.modelValue)
  }
}

/** 判断表单项是否隐藏 */
const isHide = (item: ColumnItem) => {
  if (item.hide === undefined) return false
  if (typeof item.hide === 'boolean') return item.hide
  if (typeof item.hide === 'function') {
    return item.hide(props.modelValue)
  }
}

/** 判断表单项是否禁用 */
const isDisabled = (item: ColumnItem) => {
  if (item.disabled === undefined) return false
  if (typeof item.disabled === 'boolean') return item.disabled
  if (typeof item.disabled === 'function') {
    return item.disabled(props.modelValue)
  }
}

/** 初始化数据字典 */
props.columns.forEach((item) => {
  if (item.request && typeof item.request === 'function' && item?.init) {
    item.request(props.modelValue).then((res) => {
      dicData[item.field] = item.resultFormat ? item.resultFormat(res) : res.data
    })
  }
})

// 先找出有级联的项
// 如果这个字段改变了值，那么就找出它的cascader属性对应的字段项，去请求里面的request
const hasCascaderColumns: ColumnItem[] = []
props.columns.forEach((item) => {
  const arr = hasCascaderColumns.map((i) => i.field)
  if (item.cascader?.length && !arr.includes(item.field)) {
    hasCascaderColumns.push(item)
  }
})

/** 监听表单数据变化，处理级联更新 */
const cloneForm = computed(() => cloneDeep(props.modelValue))

watch(cloneForm as any, (newVal, oldVal) => {
  hasCascaderColumns.forEach((item) => {
    if (newVal[item.field] !== oldVal[item.field]) {
      const cascaderItems = props.columns.filter((a) => item?.cascader?.includes(a.field))
      cascaderItems.forEach((i) => {
        if (i.request && Boolean(newVal[item.field])) {
          i.request(props.modelValue).then((res) => {
            dicData[i.field] = i.resultFormat ? i.resultFormat(res) : res.data
            // 如果当前值不在选项中，重置字段值
            if (!dicData[i.field].map((opt: any) => opt.value).includes(props.modelValue[i.field])) {
              emit('update:modelValue', Object.assign(props.modelValue, {
                [i.field]: Array.isArray(props.modelValue[i.field]) ? [] : ''
              }))
            }
          })
        } else if (i.request && !newVal[item.field]) {
          dicData[i.field] = []
          emit('update:modelValue', Object.assign(props.modelValue, {
            [i.field]: Array.isArray(props.modelValue[i.field]) ? [] : ''
          }))
        }
      })
    }
  })
})

defineExpose({ formRef })
</script>

<style lang="scss" scoped>
.gi-form__fold-btn {
  padding: 0 5px;
}
</style>
