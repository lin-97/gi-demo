import{u as F}from"./index-Dru6jS8c.js";import{h as L}from"./index-nN1PoSln.js";import{_ as f}from"./index-DVUDzxhH.js";import{_ as k}from"./GiForm-DXlAsORr.js";import{O as q,a as G}from"./regexp-BWv6Tqg2.js";import{a9 as j,ad as J}from"./arco-Buj77_8l.js";import{e as A,r as y,o as M,ac as N,h as r,j as O,k as S,l as t,t as a,a1 as n,Y as z,y as m,m as B,X as D}from"./vue-sr_Z8kjA.js";const c=p=>L.get("/area/getAreaList",p),T=`
<template>
  <a-card title="配置表单-动态级联">
    <template #extra>
      <a-button type="primary" status="warning" @click="onViewCode">
        <template #icon><icon-code /></template>
        <span>查看代码</span>
      </a-button>
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
        <GiCodeView :code-json="JSON.stringify(form, null, '	')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { Drawer, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import Card3Json from './code/card3-json'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import * as Regexp from '@/utils/regexp'
import { getAreaList } from '@/apis/area'

const { width } = useWindowSize()

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

const columns: ColumnItem<typeof form>[] = reactive([
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
])

const save = async () => {
  const error = await formRef.value?.formRef?.validate()
  if (error) return false
  Message.success('验证通过')
}

const reset = () => {
  formRef.value?.formRef?.resetFields()
}

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: Card3Json, type: 'vue' }),
    width: width.value < 500 ? '100%' : 560
  })
}
<\/script>

<style lang="scss" scoped></style>
`,E=A({__name:"Card3",setup(p){const{width:_}=F(),s=y({name:"",phone:"",province:"",city:"",area:""});M(()=>{s.province="440000",s.city="440300",s.area="440307"});const l=N("formRef"),g=y([{type:"input",label:"姓名",field:"name",span:{xs:24,sm:12},props:{maxLength:4},rules:[{required:!0,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{match:q,message:"仅支持中文姓名"}]},{type:"input",label:"手机",field:"phone",span:{xs:24,sm:12},props:{maxLength:11},rules:[{required:!0,message:"请输入手机号"},{match:G,message:"手机号格式不正确"}]},{type:"select",label:"省",field:"province",request:()=>c({type:"province"}),resultFormat:o=>o.data.map(e=>({label:e.label,value:e.code})),cascader:["city"],init:!0},{type:"select",label:"市",field:"city",request:o=>c({type:"city",code:o.province}),resultFormat:o=>o.data.map(e=>({label:e.label,value:e.code})),cascader:["area"]},{type:"select",label:"区",field:"area",request:o=>c({type:"area",code:o.city}),resultFormat:o=>o.data.map(e=>({label:e.label,value:e.code}))},{type:"input",label:"",field:"btns",span:24}]),b=async()=>{if(await l.value?.formRef?.validate())return!1;j.success("验证通过")},v=()=>{l.value?.formRef?.resetFields()},w=()=>{J.open({title:"数据结构",content:()=>D(f,{codeJson:T,type:"vue"}),width:_.value<500?"100%":560})};return(o,e)=>{const x=r("icon-code"),i=r("a-button"),C=r("a-space"),u=r("a-row"),d=r("a-col"),h=r("a-alert"),R=r("a-card");return S(),O(R,{title:"配置表单-动态级联",bordered:!0,class:"gi_margin"},{extra:t(()=>[a(i,{type:"primary",status:"warning",onClick:w},{icon:t(()=>[a(x)]),default:t(()=>[e[1]||(e[1]=B("span",null,"查看代码",-1))]),_:1,__:[1]})]),default:t(()=>[a(u,{gutter:30},{default:t(()=>[a(d,{xs:24,sm:24,md:12},{default:t(()=>[a(n(k),{ref_key:"formRef",ref:l,modelValue:n(s),"onUpdate:modelValue":e[0]||(e[0]=V=>z(s)?s.value=V:null),columns:n(g),"grid-item-props":{span:{xs:24,sm:12,md:12,lg:8}}},{btns:t(()=>[a(u,{justify:"end",class:"w-full"},{default:t(()=>[a(C,null,{default:t(()=>[a(i,{type:"primary",onClick:b},{default:t(()=>e[2]||(e[2]=[m("提交",-1)])),_:1,__:[2]}),a(i,{onClick:v},{default:t(()=>e[3]||(e[3]=[m("重置",-1)])),_:1,__:[3]})]),_:1})]),_:1})]),_:1},8,["modelValue","columns"])]),_:1}),a(d,{xs:24,sm:24,md:12},{default:t(()=>[a(h,{type:"warning",class:"gi_mb"},{default:t(()=>e[4]||(e[4]=[m("具体配置看源码",-1)])),_:1,__:[4]}),a(f,{"code-json":JSON.stringify(n(s),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{E as _};
