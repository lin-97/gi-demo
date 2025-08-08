import{_ as P}from"./GiForm-q03IWsLD.js";import{u as A}from"./index-BPv1vC5v.js";import{b as M}from"./index-D6v7xbu4.js";import{_ as U}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-Dsi2Injn.js";import"./index-COakebNL.js";import{u as q}from"./useTable-B8Y9iGJZ.js";import{e as V,r as b,h as a,n as F,k as S,t,l as o,a1 as n,m as C,a as T,X as I,j as W,Y as z}from"./vue-_iYK9Zi6.js";import{ac as L,a9 as x,ad as R}from"./arco-BuJQNAYO.js";import{_ as k}from"./index-Bs0L_RZk.js";const $=V({__name:"Table",props:{multiple:{type:Boolean,default:!1},queryParams:{default:()=>({})}},setup(l,{expose:c}){const e=l,i=b({username:""}),f=[{title:"序号",width:68,render:({rowIndex:s})=>t("span",null,[s+1])},{title:"姓名",dataIndex:"name",width:180},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"状态",width:100,align:"center",render:({record:s})=>t(U,{status:s.status},null)}],{loading:w,tableData:d,pagination:m,selectedKeys:u,search:p,select:h,selectAll:g}=q(s=>M.getList({...s,...i,...e.queryParams}),{immediate:!0});function _(){return d.value.filter(s=>u.value.includes(s.id))}const y=()=>{i.username="",p()};return c({getSelectedData:_}),(s,r)=>{const N=a("a-input"),D=a("icon-search"),v=a("a-button"),G=a("icon-refresh"),B=a("a-space"),O=a("a-row"),J=a("a-table");return S(),F("div",null,[t(O,{justify:"end"},{default:o(()=>[t(B,{wrap:""},{default:o(()=>[t(N,{modelValue:n(i).username,"onUpdate:modelValue":r[0]||(r[0]=j=>n(i).username=j),placeholder:"输入用户名搜索","allow-clear":"",style:{"max-width":"250px"}},null,8,["modelValue"]),t(v,{type:"primary",onClick:n(p)},{icon:o(()=>[t(D)]),default:o(()=>[r[1]||(r[1]=C("span",null,"查询",-1))]),_:1,__:[1]},8,["onClick"]),t(v,{onClick:y},{icon:o(()=>[t(G)]),default:o(()=>[r[2]||(r[2]=C("span",null,"重置",-1))]),_:1,__:[2]})]),_:1})]),_:1}),t(J,{class:"gi_table","row-key":"id",loading:n(w),bordered:{cell:!0},columns:f,data:n(d),scroll:{x:"100%",y:"500px"},"row-selection":{type:e.multiple?"checkbox":"radio",showCheckedAll:!0},pagination:n(m),onSelect:n(h),onSelectAll:n(g)},null,8,["loading","data","row-selection","pagination","onSelect","onSelectAll"])])}}});function E(l){const c=T();L.open({title:l?.title||"选择用户",content:()=>I($,{ref:e=>c.value=e,queryParams:l?.queryParams}),width:"90%",modalStyle:{maxWidth:"1000px"},onBeforeOk:async()=>{const e=c.value?.getSelectedData()||[];return e.length?l?.onBeforeOk?await l.onBeforeOk(e):(l?.onOk?.(e),!0):(x.warning("请选择用户"),!1)}})}const K=`
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
import { Drawer, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import Card1Json from './code/card1-json'
import type { ColumnItem } from '@/components/GiForm'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { selectUserDialog } from '@/components/dialog'

const { width } = useWindowSize()

const form = reactive({
  userId: '',
  userName: '',
  phone: '',
  status: ''
})

const columns = reactive([
  {
    type: 'input-search',
    label: '用户',
    field: 'userName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectUserDialog({
          onOk: (data) => {
            form.userId = data[0].id
            form.userName = data[0].name
          }
        })
      },
      onClear: () => {
        form.userId = ''
        form.userName = ''
      }
    }
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

`,ne=V({__name:"Card1",setup(l){const{width:c}=A(),e=b({userId:"",userName:"",phone:"",status:""}),i=b([{type:"input-search",label:"用户",field:"userName",props:{allowClear:!0,onSearch:()=>{E({onOk:m=>{e.userId=m[0].id,e.userName=m[0].name}})},onClear:()=>{e.userId="",e.userName=""}}},{type:"input",label:"手机",field:"phone",props:{maxLength:11}},{type:"select",label:"状态",field:"status",props:{placeholder:"自定义placeholder",options:[{label:"启用",value:1},{label:"禁用",value:0}]}}]),f=()=>{R.open({title:"数据结构",content:()=>I(k,{codeJson:K,type:"vue"}),width:c.value<500?"100%":560})},w=()=>{x.info("点击了搜索")},d=()=>{x.info("点击了重置")};return(m,u)=>{const p=a("icon-code"),h=a("a-button"),g=P,_=a("a-col"),y=a("a-row"),s=a("a-card");return S(),W(s,{title:"配置表单-查询"},{extra:o(()=>[t(h,{type:"primary",status:"warning",onClick:f},{icon:o(()=>[t(p)]),default:o(()=>[u[1]||(u[1]=C("span",null,"查看代码",-1))]),_:1,__:[1]})]),default:o(()=>[t(y,{gutter:30},{default:o(()=>[t(_,{xs:24,sm:24,md:12},{default:o(()=>[t(g,{modelValue:n(e),"onUpdate:modelValue":u[0]||(u[0]=r=>z(e)?e.value=r:null),class:"gi_mb",search:"",columns:n(i),onSearch:w,onReset:d},null,8,["modelValue","columns"])]),_:1}),t(_,{xs:24,sm:24,md:12},{default:o(()=>[t(k,{"code-json":JSON.stringify(n(e),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{ne as _};
