import{_ as g}from"./GiForm-kVjMZKRM.js";import{_ as C}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{_ as b}from"./index-DCPFMip6.js";import{a9 as r}from"./arco-DTGWTKTH.js";import{e as v,r as c,h as s,j as x,k as w,l as e,t as n,a1 as t,Y as y}from"./vue-CNbhFRxi.js";const G=`<template>
  <a-card title="配置表单-查询">
    <template #extra>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm v-model="form" class="gi_mb" search :columns="columns" @search="search" @reset="reset">
        </GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <GiCodeView :code-json="JSON.stringify(form, null, '\\t')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import type { ColumnItem } from '@/components/GiForm'
import { Message } from '@arco-design/web-vue'
import GiCodeView from '@/components/GiCodeView/index.vue'
import CodeJson from './Card1.vue?raw'

const form = reactive({
  name: '',
  phone: '',
  status: ''
})

const columns = reactive([
  {
    type: 'input',
    label: '姓名',
    field: 'name'
  },
  {
    type: 'input',
    label: '手机',
    field: 'phone',
    props: {
      maxLength: 11
    }
  },
  {
    type: 'select',
    label: '状态',
    field: 'status',
    props: {
      placeholder: '自定义placeholder',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  }
] as ColumnItem[])

const search = () => {
  Message.info('点击了搜索')
}

const reset = () => {
  Message.info('点击了重置')
}
<\/script>

<style lang="scss" scoped></style>
`,N=v({__name:"Card1",setup(V){const o=c({name:"",phone:"",status:""}),m=c([{type:"input",label:"姓名",field:"name"},{type:"input",label:"手机",field:"phone",props:{maxLength:11}},{type:"select",label:"状态",field:"status",props:{placeholder:"自定义placeholder",options:[{label:"启用",value:1},{label:"禁用",value:0}]}}]),p=()=>{r.info("点击了搜索")},i=()=>{r.info("点击了重置")};return(B,a)=>{const u=C,d=g,l=s("a-col"),_=s("a-row"),f=s("a-card");return w(),x(f,{title:"配置表单-查询"},{extra:e(()=>[n(u,{code:t(G)},null,8,["code"])]),default:e(()=>[n(_,{gutter:30},{default:e(()=>[n(l,{xs:24,sm:24,md:12},{default:e(()=>[n(d,{modelValue:t(o),"onUpdate:modelValue":a[0]||(a[0]=h=>y(o)?o.value=h:null),class:"gi_mb",search:"",columns:t(m),onSearch:p,onReset:i},null,8,["modelValue","columns"])]),_:1}),n(l,{xs:24,sm:24,md:12},{default:e(()=>[n(b,{"code-json":JSON.stringify(t(o),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{N as _};
