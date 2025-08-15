import{_ as v}from"./GiForm-DXlAsORr.js";import{u as y}from"./index-Dru6jS8c.js";import{_ as r}from"./index-DVUDzxhH.js";import{a9 as c,ad as V}from"./arco-Buj77_8l.js";import{e as x,r as i,h as t,j as G,k as J,l as e,t as o,a1 as a,Y as S,m as j,X as k}from"./vue-sr_Z8kjA.js";const F=`
<template>
  <a-card title="配置表单-查询">
    <template #extra>
      <a-button type="primary" status="warning" @click="onViewCode">
        <template #icon><icon-code /></template>
        <span>查看代码</span>
      </a-button>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm v-model="form" class="gi_mb" search :columns="columns" @search="search" @reset="reset">
        </GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <GiCodeView :code-json="JSON.stringify(form, null, '	')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import type { ColumnItem } from '@/components/GiForm'
import { Drawer, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import GiCodeView from '@/components/GiCodeView/index.vue'
import Card1Json from './code/card1-json'

const { width } = useWindowSize()

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

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: Card1Json, type: 'vue' }),
    width: width.value < 500 ? '100%' : 560
  })
}

const search = () => {
  Message.info('点击了搜索')
}

const reset = () => {
  Message.info('点击了重置')
}
<\/script>

<style lang="scss" scoped></style>

`,L=x({__name:"Card1",setup(M){const{width:m}=y(),n=i({name:"",phone:"",status:""}),p=i([{type:"input",label:"姓名",field:"name"},{type:"input",label:"手机",field:"phone",props:{maxLength:11}},{type:"select",label:"状态",field:"status",props:{placeholder:"自定义placeholder",options:[{label:"启用",value:1},{label:"禁用",value:0}]}}]),d=()=>{V.open({title:"数据结构",content:()=>k(r,{codeJson:F,type:"vue"}),width:m.value<500?"100%":560})},u=()=>{c.info("点击了搜索")},_=()=>{c.info("点击了重置")};return(N,s)=>{const f=t("icon-code"),w=t("a-button"),h=v,l=t("a-col"),g=t("a-row"),C=t("a-card");return J(),G(C,{title:"配置表单-查询"},{extra:e(()=>[o(w,{type:"primary",status:"warning",onClick:d},{icon:e(()=>[o(f)]),default:e(()=>[s[1]||(s[1]=j("span",null,"查看代码",-1))]),_:1,__:[1]})]),default:e(()=>[o(g,{gutter:30},{default:e(()=>[o(l,{xs:24,sm:24,md:12},{default:e(()=>[o(h,{modelValue:a(n),"onUpdate:modelValue":s[0]||(s[0]=b=>S(n)?n.value=b:null),class:"gi_mb",search:"",columns:a(p),onSearch:u,onReset:_},null,8,["modelValue","columns"])]),_:1}),o(l,{xs:24,sm:24,md:12},{default:e(()=>[o(r,{"code-json":JSON.stringify(a(n),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{L as _};
