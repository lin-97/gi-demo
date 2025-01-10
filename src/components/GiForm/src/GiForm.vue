<template>
  <a-form ref="formRef" :auto-label-width="true" v-bind="options.form" :model="modelValue">
    <a-grid class="w-full" :col-gap="8" v-bind="options.grid" :collapsed="collapsed">
      <template v-for="item in columns" :key="item.field">
        <a-grid-item v-if="item.show !== undefined ? isShow(item) : !isHide(item)"
          v-bind="item.gridItemProps || props.options.gridItem"
          :span="item.span || item.gridItemProps?.span || options.gridItem?.span">
          <a-form-item v-bind="item.formItemProps" :field="item.field" :rules="getFormItemRules(item)"
            :disabled="isDisabled(item)">
            <template #label>
              <template v-if="typeof item.label === 'string'">{{ item.label }}</template>
              <component :is="item.label" v-else></component>
            </template>
            <slot v-if="!['group-title'].includes(item.type || '')" :name="item.field"
              v-bind="{ disabled: isDisabled(item) }">
              <component :is="`a-${item.type}`" v-bind="getComponentBindProps(item)"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="valueChange($event, item.field)">
                <template v-for="(slotValue, slotKey) in item?.slots" :key="slotKey" #[slotKey]="scope">
                  <template v-if="typeof slotValue === 'string'">{{ slotValue }}</template>
                  <template v-else-if="slotValue">
                    <component :is="slotValue(scope)"></component>
                  </template>
                </template>
              </component>
            </slot>
            <slot v-else name="group-title">
              <a-alert v-bind="item.props">{{ item.label }}</a-alert>
            </slot>
            <template v-for="(slotValue, slotKey) in item?.formItemSlots" :key="slotKey" #[slotKey]>
              <template v-if="typeof slotValue === 'string'">{{ slotValue }}</template>
              <component :is="slotValue" v-else></component>
            </template>
          </a-form-item>
        </a-grid-item>
      </template>
      <a-grid-item v-if="!options.btns?.hide" :suffix="options.fold?.enable">
        <a-space wrap>
          <slot name="suffix">
            <a-button type="primary" @click="emit('search')">
              <template #icon><icon-search /></template>
              <template #default>{{ options.btns?.searchBtnText || '搜索' }}</template>
            </a-button>
            <a-button @click="emit('reset')">重置</a-button>
            <a-button v-if="options.fold?.enable" class="gi-form__fold-btn" type="text" size="mini"
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
import { cloneDeep } from 'lodash-es'
import type { ColumnsItem, Options } from './type'

interface Props {
  modelValue: any
  options?: Options
  columns: ColumnsItem[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({})
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'search'): void
  (e: 'reset'): void
}>()

const options = computed(() => ({
  grid: { cols: 2 },
  gridItem: { span: { xs: 2, sm: 1 } },
  ...props.options
}
))

const formRef = useTemplateRef('formRef')
const collapsed = ref(props.options.fold?.defaultCollapsed ?? false)
const dicData: Record<string, any> = reactive({})

// 组件的默认props配置
const getComponentBindProps = (item: ColumnsItem) => {
  // 组件默认配置映射表
  const ConfigMap = new Map<ColumnsItem['type'], Partial<ColumnsItem['props'] & { placeholder: string }>>([
    ['input', { allowClear: true, placeholder: `请输入${item.label}`, maxLength: 20 }],
    ['input-number', { placeholder: `请输入${item.label}` }],
    ['textarea', { allowClear: false, placeholder: `请填写${item.label}`, maxLength: 200 }],
    ['input-tag', { allowClear: true, placeholder: `请输入${item.label}` }],
    ['mention', { allowClear: true, placeholder: `请输入${item.label}` }],
    ['select', { allowClear: true, placeholder: `请选择${item.label}`, options: dicData[item.field] || item.options }],
    ['tree-select', { allowClear: true, placeholder: `请选择${item.label}` }],
    ['cascader', { allowClear: true, placeholder: `请选择${item.label}`, options: dicData[item.field] || item.options }],
    ['radio-group', { options: dicData[item.field] || item.options }],
    ['checkbox-group', { options: dicData[item.field] || item.options }],
    ['date-picker', { allowClear: true, placeholder: '请选择日期' }],
    ['time-picker', { allowClear: true, placeholder: '请选择时间' }]
  ])
  // 获取默认配置
  const defaultProps = ConfigMap.get(item.type) || {}
  // 合并默认配置和自定义配置
  return { ...defaultProps, ...item.props }
}

/** 表单数据更新  */
const valueChange = (value: any, field: string) => {
  emit('update:modelValue', Object.assign(props.modelValue, { [field]: value }))
}

/** 表单项校验规则 */
const getFormItemRules = (item: ColumnsItem) => {
  if (item.required) {
    return [{ required: true, message: `${item.label}为必填项` }, ...(Array.isArray(item.rules) ? item.rules : [])]
  }
  return item.rules
}

/** 显示表单项 */
const isShow = (item: ColumnsItem) => {
  if (typeof item.show === 'boolean') return item.show
  if (typeof item.show === 'function') {
    return item.show(props.modelValue)
  }
}

/** 隐藏表单项 */
const isHide = (item: ColumnsItem) => {
  if (item.hide === undefined) return false
  if (typeof item.hide === 'boolean') return item.hide
  if (typeof item.hide === 'function') {
    return item.hide(props.modelValue)
  }
}

/** 禁用表单项 */
const isDisabled = (item: ColumnsItem) => {
  if (item.disabled === undefined) return false
  if (typeof item.disabled === 'boolean') return item.disabled
  if (typeof item.disabled === 'function') {
    return item.disabled(props.modelValue)
  }
}

props.columns.forEach((item) => {
  if (item.request && typeof item.request === 'function' && item?.init) {
    item.request(props.modelValue).then((res) => {
      dicData[item.field] = item.resultFormat ? item.resultFormat(res) : res.data
      // console.log('dicData', dicData)
    })
  }
})

// 先找出有级联的项
// 如果这个字段改变了值，那么就找出它的cascader属性对应的字段项，去请求里面的request
const hasCascaderColumns: ColumnsItem[] = []
props.columns.forEach((item) => {
  const arr = hasCascaderColumns.map((i) => i.field)
  if (item.cascader?.length && !arr.includes(item.field)) {
    hasCascaderColumns.push(item)
  }
})

// 要深克隆，否则无法监听新旧值变化
const cloneForm = computed(() => cloneDeep(props.modelValue))

watch(cloneForm as any, (newVal, oldVal) => {
  hasCascaderColumns.forEach((item) => {
    if (newVal[item.field] !== oldVal[item.field]) {
      const arr = props.columns.filter((a) => {
        return item?.cascader?.includes(a.field)
      })
      arr.forEach((i) => {
        if (i.request && Boolean(newVal[item.field])) {
          i.request(props.modelValue).then((res) => {
            dicData[i.field] = i.resultFormat ? i.resultFormat(res) : res.data
            if (!dicData[i.field].map((i: any) => i.value).includes(props.modelValue[i.field])) {
              emit('update:modelValue', Object.assign(props.modelValue, { [i.field]: '' }))
            }
          })
        } else if (i.request && !newVal[item.field]) {
          dicData[i.field] = []
          emit('update:modelValue', Object.assign(props.modelValue, { [i.field]: '' }))
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
