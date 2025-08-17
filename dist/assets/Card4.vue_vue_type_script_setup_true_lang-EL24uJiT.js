import{u as P}from"./index-BPv1vC5v.js";import{_ as T}from"./index-6ia8nwMc.js";import{_ as v}from"./GiForm-ILBznYo5.js";import"./index-BJpBVVpn.js";import{u as I}from"./useResetReactive-8TRckTE7.js";import{O as M,a as B}from"./regexp-BWv6Tqg2.js";import{c as S,d as W}from"./data-DMJbYYJT.js";import{ac as h,a9 as x,ad as j}from"./arco-CDZlpuCh.js";import{e as A,a as w,c as L,h as i,j as U,k as J,l as t,t as a,y as d,a1 as n,Y as k,m as q,X as g}from"./vue-_iYK9Zi6.js";const z=`
<template>
  <a-card title="配置表单-弹窗">
    <template #extra>
      <a-button type="primary" status="warning" @click="onViewCode">
        <template #icon><icon-code /></template>
        <span>查看代码</span>
      </a-button>
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

    <a-drawer v-model:visible="visible" :title="isEdit ? '编辑' : '新增'" :width="width >= 600 ? 600 : '100%'">
      <GiForm v-model="form" :columns="columns"></GiForm>
    </a-drawer>
  </a-card>
</template>

<script setup lang="ts">
import { Drawer, Message, Modal } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { cityOptions, deptData } from './data'
import Card4Json from './code/card4-json'
import * as Regexp from '@/utils/regexp'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import GiCodeView from '@/components/GiCodeView/index.vue'

const { width } = useWindowSize()

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
    width: '90%',
    modalStyle: { maxWidth: '600px' },
    fullscreen: width.value < 600,
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
    width: '90%',
    modalStyle: { maxWidth: '600px' },
    fullscreen: width.value < 600,
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

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: Card4Json, type: 'vue' }),
    width: width.value < 500 ? '100%' : 560
  })
}
<\/script>

<style lang="scss" scoped></style>
`,ae=A({__name:"Card4",setup(N){const{width:m}=P(),u=w(!1),[o,C]=I({name:"",remark:"这是备注这是备注",status:1}),f=L(()=>[{type:"input",label:"姓名",field:"name",props:{maxLength:4},rules:[{required:!0,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{match:M,message:"仅支持中文姓名"}]},{type:"input",label:"手机",field:"phone",props:{maxLength:11},rules:[{required:!0,message:"请输入手机号"},{match:B,message:"手机号格式不正确"}]},{type:"select",label:"性别",field:"sex",props:{options:[{label:"男",value:1},{label:"女",value:0}]}},{type:"date-picker",label:"生日",field:"birthday"},{type:"checkbox-group",label:"爱好",field:"hobbys",span:24,props:{options:[{label:"电影",value:"01"},{label:"音乐",value:"02"},{label:"旅行",value:"03"},{label:"游戏",value:"04"}]}},{type:"input-number",label:"排序",field:"sort",props:{min:0}},{type:"radio-group",label:"状态",field:"status",props:{disabled:u.value,options:[{label:"启用",value:1},{label:"禁用",value:0}]}},{type:"rate",label:"评分",field:"mark"},{type:"switch",label:"是否隐藏",field:"hide",formItemProps:{extra:"隐藏成绩项"},props:{disabled:u.value}},{type:"slider",label:"成绩",field:"grade"},{type:"cascader",label:"城市",field:"city",props:{options:S}},{type:"tree-select",label:"部门",field:"dept",props:{data:W}},{type:"textarea",label:"备注",field:"remark",span:24,formItemProps:{extra:"这里是额外信息"}}]),c=w(),R=()=>{C(),h.open({title:"新增",width:"90%",modalStyle:{maxWidth:"600px"},fullscreen:m.value<600,content:()=>g(v,{ref:l=>c.value=l,columns:f.value,modelValue:o,"onUpdate:modelValue":l=>Object.assign(o,l)}),onBeforeOk:async()=>{try{return await c.value?.formRef?.validate()?!1:(await new Promise(e=>setTimeout(()=>e(!0),300)),x.success("新增成功！"),!0)}catch{return!1}}})},V=()=>{const l={title:"编辑",width:"90%",modalStyle:{maxWidth:"600px"},fullscreen:m.value<600,content:()=>g(v,{ref:r=>c.value=r,columns:f.value,modelValue:o,"onUpdate:modelValue":r=>Object.assign(o,r)}),onBeforeOk:async()=>{try{return await c.value?.formRef?.validate()?!1:(await new Promise(s=>setTimeout(()=>s(!0),300)),x.success("编辑成功！"),!0)}catch{return!1}}},e=h.open(l);setTimeout(()=>{o.name="张三",e.update(l)},300)},p=w(!1),F=()=>{u.value=!1,p.value=!0},G=()=>{u.value=!0,p.value=!0},O=()=>{j.open({title:"数据结构",content:()=>g(T,{codeJson:z,type:"vue"}),width:m.value<500?"100%":560})};return(l,e)=>{const r=i("icon-code"),s=i("a-button"),E=i("a-alert"),_=i("a-space"),b=i("a-card"),D=i("a-drawer");return J(),U(b,{title:"配置表单-弹窗",bordered:!0,class:"gi_margin"},{extra:t(()=>[a(s,{type:"primary",status:"warning",onClick:O},{icon:t(()=>[a(r)]),default:t(()=>[e[2]||(e[2]=q("span",null,"查看代码",-1))]),_:1,__:[2]})]),default:t(()=>[a(E,null,{default:t(()=>e[3]||(e[3]=[d("此示例编辑模式会禁用状态、是否隐藏",-1)])),_:1,__:[3]}),a(b,{title:"表单-模态框",bordered:!0,class:"gi_mt"},{default:t(()=>[a(_,null,{default:t(()=>[a(s,{type:"primary",onClick:R},{default:t(()=>e[4]||(e[4]=[d("新增",-1)])),_:1,__:[4]}),a(s,{type:"primary",status:"success",onClick:V},{default:t(()=>e[5]||(e[5]=[d("编辑",-1)])),_:1,__:[5]})]),_:1})]),_:1}),a(b,{title:"表单-抽屉",bordered:!0,class:"gi_mt"},{default:t(()=>[a(_,null,{default:t(()=>[a(s,{type:"primary",onClick:F},{default:t(()=>e[6]||(e[6]=[d("新增",-1)])),_:1,__:[6]}),a(s,{type:"primary",status:"success",onClick:G},{default:t(()=>e[7]||(e[7]=[d("编辑",-1)])),_:1,__:[7]})]),_:1})]),_:1}),a(D,{visible:n(p),"onUpdate:visible":e[1]||(e[1]=y=>k(p)?p.value=y:null),title:n(u)?"编辑":"新增",width:n(m)>=600?600:"100%"},{default:t(()=>[a(n(v),{modelValue:n(o),"onUpdate:modelValue":e[0]||(e[0]=y=>k(o)?o.value=y:null),columns:n(f)},null,8,["modelValue","columns"])]),_:1},8,["visible","title","width"])]),_:1})}}});export{ae as _};
