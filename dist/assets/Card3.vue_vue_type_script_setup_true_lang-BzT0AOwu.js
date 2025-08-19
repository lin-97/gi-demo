import{_ as R}from"./index.vue_vue_type_script_setup_true_lang-C85DDMn8.js";import{h}from"./index-Baw_ZB-J.js";import{_ as F}from"./index-K-cFMhdn.js";import{_ as G}from"./GiForm-Bg7N3DTt.js";import{O as L,a as q}from"./regexp-BWv6Tqg2.js";import{a9 as V}from"./arco-CDZlpuCh.js";import{e as k,r as f,o as j,ac as A,h as o,j as B,k as J,l as n,t,a1 as s,Y as M,y as m}from"./vue-_iYK9Zi6.js";const i=c=>h.get("/area/getAreaList",c),O=`<template>\r
  <a-card title="配置表单-动态级联" :bordered="true" class="gi_margin">\r
    <template #extra>\r
      <GiCodeButton :code="CodeJson"></GiCodeButton>\r
    </template>\r
    <a-row :gutter="30">\r
      <a-col :xs="24" :sm="24" :md="12">\r
        <GiForm ref="formRef" v-model="form" :columns="columns"\r
          :grid-item-props="{ span: { xs: 24, sm: 12, md: 12, lg: 8 } }">\r
          <template #btns>\r
            <a-row justify="end" class="w-full">\r
              <a-space>\r
                <a-button type="primary" @click="save">提交</a-button>\r
                <a-button @click="reset">重置</a-button>\r
              </a-space>\r
            </a-row>\r
          </template>\r
        </GiForm>\r
      </a-col>\r
      <a-col :xs="24" :sm="24" :md="12">\r
        <a-alert type="warning" class="gi_mb">具体配置看源码</a-alert>\r
        <GiCodeView :code-json="JSON.stringify(form, null, '\\t')"></GiCodeView>\r
      </a-col>\r
    </a-row>\r
  </a-card>\r
</template>\r
\r
<script setup lang="ts">\r
import type { ColumnItem } from '@/components/GiForm'\r
import { Message } from '@arco-design/web-vue'\r
import { getAreaList } from '@/apis/area'\r
import GiCodeView from '@/components/GiCodeView/index.vue'\r
import { GiForm } from '@/components/GiForm'\r
import * as Regexp from '@/utils/regexp'\r
import CodeJson from './Card3.vue?raw'\r
\r
const form = reactive({\r
  name: '',\r
  phone: '',\r
  province: '',\r
  city: '',\r
  area: ''\r
})\r
\r
onMounted(() => {\r
  form.province = '440000'\r
  form.city = '440300'\r
  form.area = '440307'\r
})\r
\r
const formRef = useTemplateRef('formRef')\r
\r
const columns: ColumnItem<typeof form>[] = reactive([\r
  {\r
    type: 'input',\r
    label: '姓名',\r
    field: 'name',\r
    span: { xs: 24, sm: 12 },\r
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
    span: { xs: 24, sm: 12 },\r
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
    label: '省',\r
    field: 'province',\r
    request: () => getAreaList({ type: 'province' }),\r
    resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code })),\r
    cascader: ['city'],\r
    init: true\r
  },\r
  {\r
    type: 'select',\r
    label: '市',\r
    field: 'city',\r
    request: (form) => getAreaList({ type: 'city', code: form.province }),\r
    resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code })),\r
    cascader: ['area']\r
  },\r
  {\r
    type: 'select',\r
    label: '区',\r
    field: 'area',\r
    request: (form) => getAreaList({ type: 'area', code: form.city }),\r
    resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code }))\r
  },\r
  {\r
    type: 'input',\r
    label: '',\r
    field: 'btns',\r
    span: 24\r
  }\r
])\r
\r
const save = async () => {\r
  const error = await formRef.value?.formRef?.validate()\r
  if (error) return false\r
  Message.success('验证通过')\r
}\r
\r
const reset = () => {\r
  formRef.value?.formRef?.resetFields()\r
}\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,$=k({__name:"Card3",setup(c){const a=f({name:"",phone:"",province:"",city:"",area:""});j(()=>{a.province="440000",a.city="440300",a.area="440307"});const l=A("formRef"),_=f([{type:"input",label:"姓名",field:"name",span:{xs:24,sm:12},props:{maxLength:4},rules:[{required:!0,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{match:L,message:"仅支持中文姓名"}]},{type:"input",label:"手机",field:"phone",span:{xs:24,sm:12},props:{maxLength:11},rules:[{required:!0,message:"请输入手机号"},{match:q,message:"手机号格式不正确"}]},{type:"select",label:"省",field:"province",request:()=>i({type:"province"}),resultFormat:r=>r.data.map(e=>({label:e.label,value:e.code})),cascader:["city"],init:!0},{type:"select",label:"市",field:"city",request:r=>i({type:"city",code:r.province}),resultFormat:r=>r.data.map(e=>({label:e.label,value:e.code})),cascader:["area"]},{type:"select",label:"区",field:"area",request:r=>i({type:"area",code:r.city}),resultFormat:r=>r.data.map(e=>({label:e.label,value:e.code}))},{type:"input",label:"",field:"btns",span:24}]),y=async()=>{if(await l.value?.formRef?.validate())return!1;V.success("验证通过")},g=()=>{l.value?.formRef?.resetFields()};return(r,e)=>{const b=R,p=o("a-button"),v=o("a-space"),u=o("a-row"),d=o("a-col"),x=o("a-alert"),C=o("a-card");return J(),B(C,{title:"配置表单-动态级联",bordered:!0,class:"gi_margin"},{extra:n(()=>[t(b,{code:s(O)},null,8,["code"])]),default:n(()=>[t(u,{gutter:30},{default:n(()=>[t(d,{xs:24,sm:24,md:12},{default:n(()=>[t(s(G),{ref_key:"formRef",ref:l,modelValue:s(a),"onUpdate:modelValue":e[0]||(e[0]=w=>M(a)?a.value=w:null),columns:s(_),"grid-item-props":{span:{xs:24,sm:12,md:12,lg:8}}},{btns:n(()=>[t(u,{justify:"end",class:"w-full"},{default:n(()=>[t(v,null,{default:n(()=>[t(p,{type:"primary",onClick:y},{default:n(()=>e[1]||(e[1]=[m("提交",-1)])),_:1,__:[1]}),t(p,{onClick:g},{default:n(()=>e[2]||(e[2]=[m("重置",-1)])),_:1,__:[2]})]),_:1})]),_:1})]),_:1},8,["modelValue","columns"])]),_:1}),t(d,{xs:24,sm:24,md:12},{default:n(()=>[t(x,{type:"warning",class:"gi_mb"},{default:n(()=>e[3]||(e[3]=[m("具体配置看源码",-1)])),_:1,__:[3]}),t(F,{"code-json":JSON.stringify(s(a),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{$ as _};
