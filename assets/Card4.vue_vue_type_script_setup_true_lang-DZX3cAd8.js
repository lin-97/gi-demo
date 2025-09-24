import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{_ as v}from"./GiForm-kVjMZKRM.js";import"./index-D1V-3yfm.js";import{u as P}from"./useResetReactive-CYgD-9rV.js";import{O as T,a as B}from"./regexp-BWv6Tqg2.js";import{c as D,d as I}from"./data-DMJbYYJT.js";import{ac as _,a9 as h}from"./arco-DTGWTKTH.js";import{e as M,a as g,c as S,h as p,j as A,k as L,l as n,t,y as u,a1 as s,Y as w,X as k}from"./vue-CNbhFRxi.js";const U=`<template>
  <a-card title="配置表单-弹窗" :bordered="true" class="gi_margin">
    <template #extra>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </template>

    <a-alert>此示例编辑模式会禁用状态、是否隐藏</a-alert>
    <a-card title="表单-模态框" :bordered="true" class="gi_mt">
      <a-space>
        <a-button type="primary" @click="onAdd">新增</a-button>
        <a-button type="primary" status="success" @click="onEdit">编辑</a-button>
      </a-space>
    </a-card>

    <a-card title="表单-抽屉" :bordered="true" class="gi_mt">
      <a-space>
        <a-button type="primary" @click="onAddDrawer">新增</a-button>
        <a-button type="primary" status="success" @click="onEditDrawer">编辑</a-button>
      </a-space>
    </a-card>

    <a-drawer v-model:visible="visible" :title="isEdit ? '编辑' : '新增'" width="100%"
      :drawer-style="{ maxWidth: '600px' }">
      <GiForm v-model="form" :columns="columns"></GiForm>
    </a-drawer>
  </a-card>
</template>

<script setup lang="ts">
import type { ColumnItem } from '@/components/GiForm'
import { Message, Modal } from '@arco-design/web-vue'
import { GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import * as Regexp from '@/utils/regexp'
import CodeJson from './Card4.vue?raw'
import { cityOptions, deptData } from './data'

const isEdit = ref(false)
const [form, resetForm] = useResetReactive({
  name: '',
  remark: '这是备注这是备注',
  status: 1
})

const columns = computed(() => [
  {
    type: 'input',
    label: '姓名',
    field: 'name',
    props: {
      maxLength: 4
    },
    rules: [
      { required: true, message: '请输入姓名' },
      { maxLength: 4, message: '姓名不超过4个字符' },
      { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
    ]
  },
  {
    type: 'input',
    label: '手机',
    field: 'phone',
    props: {
      maxLength: 11
    },
    rules: [
      { required: true, message: '请输入手机号' },
      { match: Regexp.Phone, message: '手机号格式不正确' }
    ]
  },
  {
    type: 'select',
    label: '性别',
    field: 'sex',
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 0 }
      ]
    }
  },
  {
    type: 'date-picker',
    label: '生日',
    field: 'birthday'
  },
  {
    type: 'checkbox-group',
    label: '爱好',
    field: 'hobbys',
    span: 24,
    props: {
      options: [
        { label: '电影', value: '01' },
        { label: '音乐', value: '02' },
        { label: '旅行', value: '03' },
        { label: '游戏', value: '04' }
      ]
    }
  },
  {
    type: 'input-number',
    label: '排序',
    field: 'sort',
    props: {
      min: 0
    }
  },
  {
    type: 'radio-group',
    label: '状态',
    field: 'status',
    props: {
      disabled: isEdit.value,
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  },
  {
    type: 'rate',
    label: '评分',
    field: 'mark'
  },
  {
    type: 'switch',
    label: '是否隐藏',
    field: 'hide',
    formItemProps: { extra: '隐藏成绩项' },
    props: {
      disabled: isEdit.value
    }
  },
  {
    type: 'slider',
    label: '成绩',
    field: 'grade'
  },
  {
    type: 'cascader',
    label: '城市',
    field: 'city',
    props: {
      options: cityOptions
    }
  },
  {
    type: 'tree-select',
    label: '部门',
    field: 'dept',
    props: {
      data: deptData
    }
  },
  {
    type: 'textarea',
    label: '备注',
    field: 'remark',
    span: 24,
    formItemProps: { extra: '这里是额外信息' }
  }
] as ColumnItem<typeof form>[])

const GiFormRef = ref<InstanceType<typeof GiForm>>()
const onAdd = () => {
  resetForm()
  Modal.open({
    title: '新增',
    width: 'calc(100% - 20px)',
    modalStyle: { maxWidth: '600px' },
    bodyStyle: { maxHeight: '500px' },
    content: () =>
      h(GiForm, {
        'ref': (e) => GiFormRef.value = e as InstanceType<typeof GiForm>,
        'columns': columns.value,
        'modelValue': form,
        'onUpdate:modelValue': (e) => Object.assign(form, e)
      }),
    onBeforeOk: async () => {
      try {
        const flag = await GiFormRef.value?.formRef?.validate()
        if (flag) return false
        await new Promise((resolve) => setTimeout(() => resolve(true), 300)) as unknown as Promise<boolean>
        Message.success('新增成功！')
        return true
      } catch {
        return false
      }
    }
  })
}

const onEdit = () => {
  const option = {
    title: '编辑',
    width: 'calc(100% - 20px)',
    modalStyle: { maxWidth: '600px' },
    bodyStyle: { maxHeight: '500px' },
    content: () =>
      h(GiForm, {
        'ref': (e) => GiFormRef.value = e as InstanceType<typeof GiForm>,
        'columns': columns.value,
        'modelValue': form,
        'onUpdate:modelValue': (e) => Object.assign(form, e)
      }),
    onBeforeOk: async () => {
      try {
        const flag = await GiFormRef.value?.formRef?.validate()
        if (flag) return false
        await new Promise((resolve) => setTimeout(() => resolve(true), 300)) as unknown as Promise<boolean>
        Message.success('编辑成功！')
        return true
      } catch {
        return false
      }
    }
  }
  const instance = Modal.open(option)
  // 模拟异步更新
  setTimeout(() => {
    form.name = '张三'
    instance.update(option)
  }, 300)
}

const visible = ref(false)

const onAddDrawer = () => {
  isEdit.value = false
  visible.value = true
}

const onEditDrawer = () => {
  isEdit.value = true
  visible.value = true
}
<\/script>

<style lang="scss" scoped></style>
`,z=M({__name:"Card4",setup(W){const r=g(!1),[a,R]=P({name:"",remark:"这是备注这是备注",status:1}),c=S(()=>[{type:"input",label:"姓名",field:"name",props:{maxLength:4},rules:[{required:!0,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{match:T,message:"仅支持中文姓名"}]},{type:"input",label:"手机",field:"phone",props:{maxLength:11},rules:[{required:!0,message:"请输入手机号"},{match:B,message:"手机号格式不正确"}]},{type:"select",label:"性别",field:"sex",props:{options:[{label:"男",value:1},{label:"女",value:0}]}},{type:"date-picker",label:"生日",field:"birthday"},{type:"checkbox-group",label:"爱好",field:"hobbys",span:24,props:{options:[{label:"电影",value:"01"},{label:"音乐",value:"02"},{label:"旅行",value:"03"},{label:"游戏",value:"04"}]}},{type:"input-number",label:"排序",field:"sort",props:{min:0}},{type:"radio-group",label:"状态",field:"status",props:{disabled:r.value,options:[{label:"启用",value:1},{label:"禁用",value:0}]}},{type:"rate",label:"评分",field:"mark"},{type:"switch",label:"是否隐藏",field:"hide",formItemProps:{extra:"隐藏成绩项"},props:{disabled:r.value}},{type:"slider",label:"成绩",field:"grade"},{type:"cascader",label:"城市",field:"city",props:{options:D}},{type:"tree-select",label:"部门",field:"dept",props:{data:I}},{type:"textarea",label:"备注",field:"remark",span:24,formItemProps:{extra:"这里是额外信息"}}]),m=g(),C=()=>{R(),_.open({title:"新增",width:"calc(100% - 20px)",modalStyle:{maxWidth:"600px"},bodyStyle:{maxHeight:"500px"},content:()=>k(v,{ref:l=>m.value=l,columns:c.value,modelValue:a,"onUpdate:modelValue":l=>Object.assign(a,l)}),onBeforeOk:async()=>{try{return await m.value?.formRef?.validate()?!1:(await new Promise(e=>setTimeout(()=>e(!0),300)),h.success("新增成功！"),!0)}catch{return!1}}})},F=()=>{const l={title:"编辑",width:"calc(100% - 20px)",modalStyle:{maxWidth:"600px"},bodyStyle:{maxHeight:"500px"},content:()=>k(v,{ref:o=>m.value=o,columns:c.value,modelValue:a,"onUpdate:modelValue":o=>Object.assign(a,o)}),onBeforeOk:async()=>{try{return await m.value?.formRef?.validate()?!1:(await new Promise(f=>setTimeout(()=>f(!0),300)),h.success("编辑成功！"),!0)}catch{return!1}}},e=_.open(l);setTimeout(()=>{a.name="张三",e.update(l)},300)},i=g(!1),G=()=>{r.value=!1,i.value=!0},O=()=>{r.value=!0,i.value=!0};return(l,e)=>{const o=V,f=p("a-alert"),d=p("a-button"),x=p("a-space"),b=p("a-card"),E=p("a-drawer");return L(),A(b,{title:"配置表单-弹窗",bordered:!0,class:"gi_margin"},{extra:n(()=>[t(o,{code:s(U)},null,8,["code"])]),default:n(()=>[t(f,null,{default:n(()=>e[2]||(e[2]=[u("此示例编辑模式会禁用状态、是否隐藏",-1)])),_:1,__:[2]}),t(b,{title:"表单-模态框",bordered:!0,class:"gi_mt"},{default:n(()=>[t(x,null,{default:n(()=>[t(d,{type:"primary",onClick:C},{default:n(()=>e[3]||(e[3]=[u("新增",-1)])),_:1,__:[3]}),t(d,{type:"primary",status:"success",onClick:F},{default:n(()=>e[4]||(e[4]=[u("编辑",-1)])),_:1,__:[4]})]),_:1})]),_:1}),t(b,{title:"表单-抽屉",bordered:!0,class:"gi_mt"},{default:n(()=>[t(x,null,{default:n(()=>[t(d,{type:"primary",onClick:G},{default:n(()=>e[5]||(e[5]=[u("新增",-1)])),_:1,__:[5]}),t(d,{type:"primary",status:"success",onClick:O},{default:n(()=>e[6]||(e[6]=[u("编辑",-1)])),_:1,__:[6]})]),_:1})]),_:1}),t(E,{visible:s(i),"onUpdate:visible":e[1]||(e[1]=y=>w(i)?i.value=y:null),title:s(r)?"编辑":"新增",width:"100%","drawer-style":{maxWidth:"600px"}},{default:n(()=>[t(s(v),{modelValue:s(a),"onUpdate:modelValue":e[0]||(e[0]=y=>w(a)?a.value=y:null),columns:s(c)},null,8,["modelValue","columns"])]),_:1},8,["visible","title"])]),_:1})}}});export{z as _};
