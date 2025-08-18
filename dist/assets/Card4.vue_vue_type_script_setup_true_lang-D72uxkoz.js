import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-8NeouZCX.js";import{u as T}from"./index-BPv1vC5v.js";import{_ as g}from"./GiForm-LHeu3RKG.js";import"./index-DBvjnvFZ.js";import{u as B}from"./useResetReactive-C4hw2Er8.js";import{O as D,a as I}from"./regexp-BWv6Tqg2.js";import{c as M,d as S}from"./data-DMJbYYJT.js";import{ac as h,a9 as x}from"./arco-CDZlpuCh.js";import{e as W,a as _,c as A,h as u,j as L,k as U,l as r,t as n,y as p,a1 as l,Y as k,X as R}from"./vue-_iYK9Zi6.js";const j=`<template>\r
  <a-card title="配置表单-弹窗" :bordered="true" class="gi_margin">\r
    <template #extra>\r
      <GiCodeButton :code="CodeJson"></GiCodeButton>\r
    </template>\r
\r
    <a-alert>此示例编辑模式会禁用状态、是否隐藏</a-alert>\r
    <a-card title="表单-模态框" :bordered="true" class="gi_mt">\r
      <a-space>\r
        <a-button type="primary" @click="onAdd">新增</a-button>\r
        <a-button type="primary" status="success" @click="onEdit">编辑</a-button>\r
      </a-space>\r
    </a-card>\r
\r
    <a-card title="表单-抽屉" :bordered="true" class="gi_mt">\r
      <a-space>\r
        <a-button type="primary" @click="onAddDrawer">新增</a-button>\r
        <a-button type="primary" status="success" @click="onEditDrawer">编辑</a-button>\r
      </a-space>\r
    </a-card>\r
\r
    <a-drawer v-model:visible="visible" :title="isEdit ? '编辑' : '新增'" :width="width >= 600 ? 600 : '100%'">\r
      <GiForm v-model="form" :columns="columns"></GiForm>\r
    </a-drawer>\r
  </a-card>\r
</template>\r
\r
<script setup lang="ts">\r
import type { ColumnItem } from '@/components/GiForm'\r
import { Message, Modal } from '@arco-design/web-vue'\r
import { useWindowSize } from '@vueuse/core'\r
import { GiForm } from '@/components/GiForm'\r
import { useResetReactive } from '@/hooks'\r
import * as Regexp from '@/utils/regexp'\r
import CodeJson from './Card4.vue?raw'\r
import { cityOptions, deptData } from './data'\r
\r
const { width } = useWindowSize()\r
\r
const isEdit = ref(false)\r
const [form, resetForm] = useResetReactive({\r
  name: '',\r
  remark: '这是备注这是备注',\r
  status: 1\r
})\r
\r
const columns = computed(() => [\r
  {\r
    type: 'input',\r
    label: '姓名',\r
    field: 'name',\r
    props: {\r
      maxLength: 4\r
    },\r
    rules: [\r
      { required: true, message: '请输入姓名' },\r
      { maxLength: 4, message: '姓名不超过4个字符' },\r
      { match: Regexp.OnlyCh, message: '仅支持中文姓名' }\r
    ]\r
  },\r
  {\r
    type: 'input',\r
    label: '手机',\r
    field: 'phone',\r
    props: {\r
      maxLength: 11\r
    },\r
    rules: [\r
      { required: true, message: '请输入手机号' },\r
      { match: Regexp.Phone, message: '手机号格式不正确' }\r
    ]\r
  },\r
  {\r
    type: 'select',\r
    label: '性别',\r
    field: 'sex',\r
    props: {\r
      options: [\r
        { label: '男', value: 1 },\r
        { label: '女', value: 0 }\r
      ]\r
    }\r
  },\r
  {\r
    type: 'date-picker',\r
    label: '生日',\r
    field: 'birthday'\r
  },\r
  {\r
    type: 'checkbox-group',\r
    label: '爱好',\r
    field: 'hobbys',\r
    span: 24,\r
    props: {\r
      options: [\r
        { label: '电影', value: '01' },\r
        { label: '音乐', value: '02' },\r
        { label: '旅行', value: '03' },\r
        { label: '游戏', value: '04' }\r
      ]\r
    }\r
  },\r
  {\r
    type: 'input-number',\r
    label: '排序',\r
    field: 'sort',\r
    props: {\r
      min: 0\r
    }\r
  },\r
  {\r
    type: 'radio-group',\r
    label: '状态',\r
    field: 'status',\r
    props: {\r
      disabled: isEdit.value,\r
      options: [\r
        { label: '启用', value: 1 },\r
        { label: '禁用', value: 0 }\r
      ]\r
    }\r
  },\r
  {\r
    type: 'rate',\r
    label: '评分',\r
    field: 'mark'\r
  },\r
  {\r
    type: 'switch',\r
    label: '是否隐藏',\r
    field: 'hide',\r
    formItemProps: { extra: '隐藏成绩项' },\r
    props: {\r
      disabled: isEdit.value\r
    }\r
  },\r
  {\r
    type: 'slider',\r
    label: '成绩',\r
    field: 'grade'\r
  },\r
  {\r
    type: 'cascader',\r
    label: '城市',\r
    field: 'city',\r
    props: {\r
      options: cityOptions\r
    }\r
  },\r
  {\r
    type: 'tree-select',\r
    label: '部门',\r
    field: 'dept',\r
    props: {\r
      data: deptData\r
    }\r
  },\r
  {\r
    type: 'textarea',\r
    label: '备注',\r
    field: 'remark',\r
    span: 24,\r
    formItemProps: { extra: '这里是额外信息' }\r
  }\r
] as ColumnItem<typeof form>[])\r
\r
const GiFormRef = ref<InstanceType<typeof GiForm>>()\r
const onAdd = () => {\r
  resetForm()\r
  Modal.open({\r
    title: '新增',\r
    width: '90%',\r
    modalStyle: { maxWidth: '600px' },\r
    fullscreen: width.value < 600,\r
    content: () =>\r
      h(GiForm, {\r
        'ref': (e) => GiFormRef.value = e as InstanceType<typeof GiForm>,\r
        'columns': columns.value,\r
        'modelValue': form,\r
        'onUpdate:modelValue': (e) => Object.assign(form, e)\r
      }),\r
    onBeforeOk: async () => {\r
      try {\r
        const flag = await GiFormRef.value?.formRef?.validate()\r
        if (flag) return false\r
        await new Promise((resolve) => setTimeout(() => resolve(true), 300)) as unknown as Promise<boolean>\r
        Message.success('新增成功！')\r
        return true\r
      } catch {\r
        return false\r
      }\r
    }\r
  })\r
}\r
\r
const onEdit = () => {\r
  const option = {\r
    title: '编辑',\r
    width: '90%',\r
    modalStyle: { maxWidth: '600px' },\r
    fullscreen: width.value < 600,\r
    content: () =>\r
      h(GiForm, {\r
        'ref': (e) => GiFormRef.value = e as InstanceType<typeof GiForm>,\r
        'columns': columns.value,\r
        'modelValue': form,\r
        'onUpdate:modelValue': (e) => Object.assign(form, e)\r
      }),\r
    onBeforeOk: async () => {\r
      try {\r
        const flag = await GiFormRef.value?.formRef?.validate()\r
        if (flag) return false\r
        await new Promise((resolve) => setTimeout(() => resolve(true), 300)) as unknown as Promise<boolean>\r
        Message.success('编辑成功！')\r
        return true\r
      } catch {\r
        return false\r
      }\r
    }\r
  }\r
  const instance = Modal.open(option)\r
  // 模拟异步更新\r
  setTimeout(() => {\r
    form.name = '张三'\r
    instance.update(option)\r
  }, 300)\r
}\r
\r
const visible = ref(false)\r
\r
const onAddDrawer = () => {\r
  isEdit.value = false\r
  visible.value = true\r
}\r
\r
const onEditDrawer = () => {\r
  isEdit.value = true\r
  visible.value = true\r
}\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,Z=W({__name:"Card4",setup(q){const{width:c}=T(),s=_(!1),[t,C]=B({name:"",remark:"这是备注这是备注",status:1}),f=A(()=>[{type:"input",label:"姓名",field:"name",props:{maxLength:4},rules:[{required:!0,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{match:D,message:"仅支持中文姓名"}]},{type:"input",label:"手机",field:"phone",props:{maxLength:11},rules:[{required:!0,message:"请输入手机号"},{match:I,message:"手机号格式不正确"}]},{type:"select",label:"性别",field:"sex",props:{options:[{label:"男",value:1},{label:"女",value:0}]}},{type:"date-picker",label:"生日",field:"birthday"},{type:"checkbox-group",label:"爱好",field:"hobbys",span:24,props:{options:[{label:"电影",value:"01"},{label:"音乐",value:"02"},{label:"旅行",value:"03"},{label:"游戏",value:"04"}]}},{type:"input-number",label:"排序",field:"sort",props:{min:0}},{type:"radio-group",label:"状态",field:"status",props:{disabled:s.value,options:[{label:"启用",value:1},{label:"禁用",value:0}]}},{type:"rate",label:"评分",field:"mark"},{type:"switch",label:"是否隐藏",field:"hide",formItemProps:{extra:"隐藏成绩项"},props:{disabled:s.value}},{type:"slider",label:"成绩",field:"grade"},{type:"cascader",label:"城市",field:"city",props:{options:M}},{type:"tree-select",label:"部门",field:"dept",props:{data:S}},{type:"textarea",label:"备注",field:"remark",span:24,formItemProps:{extra:"这里是额外信息"}}]),m=_(),F=()=>{C(),h.open({title:"新增",width:"90%",modalStyle:{maxWidth:"600px"},fullscreen:c.value<600,content:()=>R(g,{ref:a=>m.value=a,columns:f.value,modelValue:t,"onUpdate:modelValue":a=>Object.assign(t,a)}),onBeforeOk:async()=>{try{return await m.value?.formRef?.validate()?!1:(await new Promise(e=>setTimeout(()=>e(!0),300)),x.success("新增成功！"),!0)}catch{return!1}}})},G=()=>{const a={title:"编辑",width:"90%",modalStyle:{maxWidth:"600px"},fullscreen:c.value<600,content:()=>R(g,{ref:o=>m.value=o,columns:f.value,modelValue:t,"onUpdate:modelValue":o=>Object.assign(t,o)}),onBeforeOk:async()=>{try{return await m.value?.formRef?.validate()?!1:(await new Promise(b=>setTimeout(()=>b(!0),300)),x.success("编辑成功！"),!0)}catch{return!1}}},e=h.open(a);setTimeout(()=>{t.name="张三",e.update(a)},300)},i=_(!1),O=()=>{s.value=!1,i.value=!0},E=()=>{s.value=!0,i.value=!0};return(a,e)=>{const o=P,b=u("a-alert"),d=u("a-button"),w=u("a-space"),y=u("a-card"),V=u("a-drawer");return U(),L(y,{title:"配置表单-弹窗",bordered:!0,class:"gi_margin"},{extra:r(()=>[n(o,{code:l(j)},null,8,["code"])]),default:r(()=>[n(b,null,{default:r(()=>e[2]||(e[2]=[p("此示例编辑模式会禁用状态、是否隐藏",-1)])),_:1,__:[2]}),n(y,{title:"表单-模态框",bordered:!0,class:"gi_mt"},{default:r(()=>[n(w,null,{default:r(()=>[n(d,{type:"primary",onClick:F},{default:r(()=>e[3]||(e[3]=[p("新增",-1)])),_:1,__:[3]}),n(d,{type:"primary",status:"success",onClick:G},{default:r(()=>e[4]||(e[4]=[p("编辑",-1)])),_:1,__:[4]})]),_:1})]),_:1}),n(y,{title:"表单-抽屉",bordered:!0,class:"gi_mt"},{default:r(()=>[n(w,null,{default:r(()=>[n(d,{type:"primary",onClick:O},{default:r(()=>e[5]||(e[5]=[p("新增",-1)])),_:1,__:[5]}),n(d,{type:"primary",status:"success",onClick:E},{default:r(()=>e[6]||(e[6]=[p("编辑",-1)])),_:1,__:[6]})]),_:1})]),_:1}),n(V,{visible:l(i),"onUpdate:visible":e[1]||(e[1]=v=>k(i)?i.value=v:null),title:l(s)?"编辑":"新增",width:l(c)>=600?600:"100%"},{default:r(()=>[n(l(g),{modelValue:l(t),"onUpdate:modelValue":e[0]||(e[0]=v=>k(t)?t.value=v:null),columns:l(f)},null,8,["modelValue","columns"])]),_:1},8,["visible","title","width"])]),_:1})}}});export{Z as _};
