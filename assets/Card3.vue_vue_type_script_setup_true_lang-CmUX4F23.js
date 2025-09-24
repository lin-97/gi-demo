import{_ as R}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{h}from"./index-D1V-3yfm.js";import{_ as F}from"./index-DCPFMip6.js";import{_ as G}from"./GiForm-kVjMZKRM.js";import{O as L,a as q}from"./regexp-BWv6Tqg2.js";import{a9 as V}from"./arco-DTGWTKTH.js";import{e as k,r as f,o as j,ac as A,h as s,j as B,k as J,l as a,t,a1 as r,Y as M,y as m}from"./vue-CNbhFRxi.js";const i=c=>h.get("/area/getAreaList",c),O=`<template>
  <a-card title="配置表单-动态级联" :bordered="true" class="gi_margin">
    <template #extra>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm ref="formRef" v-model="form" :columns="columns"
          :grid-item-props="{ span: { xs: 24, sm: 12, md: 12, lg: 8 } }">
          <template #btns>
            <a-row justify="end" class="w-full">
              <a-space>
                <a-button type="primary" @click="save">提交</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-row>
          </template>
        </GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <a-alert type="warning" class="gi_mb">具体配置看源码</a-alert>
        <GiCodeView :code-json="JSON.stringify(form, null, '\\t')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import type { ColumnItem } from '@/components/GiForm'
import { Message } from '@arco-design/web-vue'
import { getAreaList } from '@/apis/area'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { GiForm } from '@/components/GiForm'
import * as Regexp from '@/utils/regexp'
import CodeJson from './Card3.vue?raw'

const form = reactive({
  name: '',
  phone: '',
  province: '',
  city: '',
  area: ''
})

onMounted(() => {
  form.province = '440000'
  form.city = '440300'
  form.area = '440307'
})

const formRef = useTemplateRef('formRef')

const columns = reactive([
  {
    type: 'input',
    label: '姓名',
    field: 'name',
    span: { xs: 24, sm: 12 },
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
    span: { xs: 24, sm: 12 },
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
    label: '省',
    field: 'province',
    request: () => getAreaList({ type: 'province' }),
    resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code })),
    cascader: ['city'],
    init: true
  },
  {
    type: 'select',
    label: '市',
    field: 'city',
    request: (form) => getAreaList({ type: 'city', code: form.province }),
    resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code })),
    cascader: ['area']
  },
  {
    type: 'select',
    label: '区',
    field: 'area',
    request: (form) => getAreaList({ type: 'area', code: form.city }),
    resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code }))
  },
  {
    type: 'input',
    label: '',
    field: 'btns',
    span: 24
  }
] as ColumnItem<typeof form>[])

const save = async () => {
  const error = await formRef.value?.formRef?.validate()
  if (error) return false
  Message.success('验证通过')
}

const reset = () => {
  formRef.value?.formRef?.resetFields()
}
<\/script>

<style lang="scss" scoped></style>
`,$=k({__name:"Card3",setup(c){const o=f({name:"",phone:"",province:"",city:"",area:""});j(()=>{o.province="440000",o.city="440300",o.area="440307"});const l=A("formRef"),_=f([{type:"input",label:"姓名",field:"name",span:{xs:24,sm:12},props:{maxLength:4},rules:[{required:!0,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{match:L,message:"仅支持中文姓名"}]},{type:"input",label:"手机",field:"phone",span:{xs:24,sm:12},props:{maxLength:11},rules:[{required:!0,message:"请输入手机号"},{match:q,message:"手机号格式不正确"}]},{type:"select",label:"省",field:"province",request:()=>i({type:"province"}),resultFormat:n=>n.data.map(e=>({label:e.label,value:e.code})),cascader:["city"],init:!0},{type:"select",label:"市",field:"city",request:n=>i({type:"city",code:n.province}),resultFormat:n=>n.data.map(e=>({label:e.label,value:e.code})),cascader:["area"]},{type:"select",label:"区",field:"area",request:n=>i({type:"area",code:n.city}),resultFormat:n=>n.data.map(e=>({label:e.label,value:e.code}))},{type:"input",label:"",field:"btns",span:24}]),y=async()=>{if(await l.value?.formRef?.validate())return!1;V.success("验证通过")},g=()=>{l.value?.formRef?.resetFields()};return(n,e)=>{const b=R,p=s("a-button"),v=s("a-space"),u=s("a-row"),d=s("a-col"),x=s("a-alert"),C=s("a-card");return J(),B(C,{title:"配置表单-动态级联",bordered:!0,class:"gi_margin"},{extra:a(()=>[t(b,{code:r(O)},null,8,["code"])]),default:a(()=>[t(u,{gutter:30},{default:a(()=>[t(d,{xs:24,sm:24,md:12},{default:a(()=>[t(r(G),{ref_key:"formRef",ref:l,modelValue:r(o),"onUpdate:modelValue":e[0]||(e[0]=w=>M(o)?o.value=w:null),columns:r(_),"grid-item-props":{span:{xs:24,sm:12,md:12,lg:8}}},{btns:a(()=>[t(u,{justify:"end",class:"w-full"},{default:a(()=>[t(v,null,{default:a(()=>[t(p,{type:"primary",onClick:y},{default:a(()=>e[1]||(e[1]=[m("提交",-1)])),_:1,__:[1]}),t(p,{onClick:g},{default:a(()=>e[2]||(e[2]=[m("重置",-1)])),_:1,__:[2]})]),_:1})]),_:1})]),_:1},8,["modelValue","columns"])]),_:1}),t(d,{xs:24,sm:24,md:12},{default:a(()=>[t(x,{type:"warning",class:"gi_mb"},{default:a(()=>e[3]||(e[3]=[m("具体配置看源码",-1)])),_:1,__:[3]}),t(F,{"code-json":JSON.stringify(r(o),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{$ as _};
