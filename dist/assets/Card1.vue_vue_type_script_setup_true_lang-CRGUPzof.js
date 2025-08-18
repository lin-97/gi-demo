import{_ as g}from"./GiForm-LHeu3RKG.js";import{_ as C}from"./index.vue_vue_type_script_setup_true_lang-8NeouZCX.js";import{_ as b}from"./index-BaD06Mqp.js";import{a9 as l}from"./arco-CDZlpuCh.js";import{e as v,r as c,h as t,j as x,k as w,l as e,t as n,a1 as o,Y as y}from"./vue-_iYK9Zi6.js";const G=`<template>\r
  <a-card title="配置表单-查询">\r
    <template #extra>\r
      <GiCodeButton :code="CodeJson"></GiCodeButton>\r
    </template>\r
    <a-row :gutter="30">\r
      <a-col :xs="24" :sm="24" :md="12">\r
        <GiForm v-model="form" class="gi_mb" search :columns="columns" @search="search" @reset="reset">\r
        </GiForm>\r
      </a-col>\r
      <a-col :xs="24" :sm="24" :md="12">\r
        <GiCodeView :code-json="JSON.stringify(form, null, '\\t')"></GiCodeView>\r
      </a-col>\r
    </a-row>\r
  </a-card>\r
</template>\r
\r
<script setup lang="ts">\r
import type { ColumnItem } from '@/components/GiForm'\r
import { Message } from '@arco-design/web-vue'\r
import GiCodeView from '@/components/GiCodeView/index.vue'\r
import CodeJson from './Card1.vue?raw'\r
\r
const form = reactive({\r
  name: '',\r
  phone: '',\r
  status: ''\r
})\r
\r
const columns = reactive([\r
  {\r
    type: 'input',\r
    label: '姓名',\r
    field: 'name'\r
  },\r
  {\r
    type: 'input',\r
    label: '手机',\r
    field: 'phone',\r
    props: {\r
      maxLength: 11\r
    }\r
  },\r
  {\r
    type: 'select',\r
    label: '状态',\r
    field: 'status',\r
    props: {\r
      placeholder: '自定义placeholder',\r
      options: [\r
        { label: '启用', value: 1 },\r
        { label: '禁用', value: 0 }\r
      ]\r
    }\r
  }\r
] as ColumnItem[])\r
\r
const search = () => {\r
  Message.info('点击了搜索')\r
}\r
\r
const reset = () => {\r
  Message.info('点击了重置')\r
}\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,N=v({__name:"Card1",setup(V){const r=c({name:"",phone:"",status:""}),m=c([{type:"input",label:"姓名",field:"name"},{type:"input",label:"手机",field:"phone",props:{maxLength:11}},{type:"select",label:"状态",field:"status",props:{placeholder:"自定义placeholder",options:[{label:"启用",value:1},{label:"禁用",value:0}]}}]),p=()=>{l.info("点击了搜索")},i=()=>{l.info("点击了重置")};return(B,s)=>{const u=C,d=g,a=t("a-col"),_=t("a-row"),f=t("a-card");return w(),x(f,{title:"配置表单-查询"},{extra:e(()=>[n(u,{code:o(G)},null,8,["code"])]),default:e(()=>[n(_,{gutter:30},{default:e(()=>[n(a,{xs:24,sm:24,md:12},{default:e(()=>[n(d,{modelValue:o(r),"onUpdate:modelValue":s[0]||(s[0]=h=>y(r)?r.value=h:null),class:"gi_mb",search:"",columns:o(m),onSearch:p,onReset:i},null,8,["modelValue","columns"])]),_:1}),n(a,{xs:24,sm:24,md:12},{default:e(()=>[n(b,{"code-json":JSON.stringify(o(r),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{N as _};
