import{_ as P}from"./index-Zwwi5Ftb.js";import{_ as M}from"./index-DCPFMip6.js";import{_ as Y}from"./GiForm-kVjMZKRM.js";import{_ as z}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{ac as E,a9 as B}from"./arco-DTGWTKTH.js";import{a as j,X as W,e as w,ac as X,h as a,j as k,k as b,a1 as r,l,t as n,A as H,r as I,m as C,am as O,an as K,n as Q,p as Z,F as ee,y as A,Y as ne}from"./vue-CNbhFRxi.js";import{b as q}from"./index-Bf4Op5cr.js";import{_ as F}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-BZ7_A1X3.js";import{_ as oe}from"./index-D1V-3yfm.js";import{u as J}from"./useTable-CK5kmjjD.js";import{g as te}from"./index-CofJN_A4.js";import"./omit-D7h5lgcv.js";import"./useBreakpoint-DHNpXxSV.js";import"./index-Df9C7UWN.js";const R=c=>o=>{const s=j();E.open({title:o.title||c.title,content:()=>W(c.component,{ref:e=>s.value=e,multiple:o.multiple,queryParams:o.queryParams,...c.componentProps}),width:"calc(100% - 20px)",modalStyle:{maxWidth:"1000px"},bodyStyle:{overflow:"hidden",height:"500px",padding:0},onBeforeOk:async()=>{if(!s.value?.getSelectedData)return B.warning("组件必须暴露getSelectedData方法"),!1;const e=s.value?.getSelectedData?.()||[];return e.length?o?.onBeforeOk?await o.onBeforeOk(e):(o.onOk?.(e),!0):(B.warning(c.tip||"请选择数据"),!1)}})},ae=w({__name:"Tree",emits:["node-click"],setup(c,{emit:o}){const s=o,e=X("treeRef"),t=j(!1),u=j([]);(async()=>{try{t.value=!0;const d=await te();u.value=d.data,H(()=>{e.value?.expandAll()})}finally{t.value=!1}})();const _=()=>{s("node-click")};return(d,f)=>{const g=a("a-input-search"),y=a("a-tree"),h=a("a-scrollbar"),i=a("a-spin");return b(),k(i,{loading:r(t),class:"gi_full_column"},{default:l(()=>[n(g,{class:"gi_mb",placeholder:"请输入关键词","allow-clear":""}),n(h,{style:{height:"100%",overflow:"auto"},"outer-style":"flex: 1;overflow: hidden"},{default:l(()=>[n(y,{ref_key:"treeRef",ref:e,"show-line":"",size:"mini",data:r(u),"field-names":{key:"id",title:"name"},onSelect:_},null,8,["data"])]),_:1})]),_:1},8,["loading"])}}}),le=w({__name:"index",props:{multiple:{type:Boolean,default:!1},queryParams:{default:()=>({})}},setup(c,{expose:o}){const s=c,e=I({username:""}),t=[{title:"序号",width:68,align:"center",render:({rowIndex:i})=>n("span",null,[i+1])},{title:"姓名",dataIndex:"name",width:100},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"状态",width:100,align:"center",render:({record:i})=>n(F,{status:i.status},null)}],{loading:u,tableData:m,pagination:_,search:d,select:f,selectAll:g,getSelectedData:y}=J(i=>q.getList({...i,...e,...s.queryParams}),{immediate:!0}),h=()=>{e.username="",d()};return o({getSelectedData:y}),(i,p)=>{const N=a("a-input"),S=a("icon-search"),x=a("a-button"),v=a("icon-refresh"),D=a("a-space"),L=a("a-row"),U=a("a-table"),V=P;return b(),k(V,null,{left:l(()=>[n(ae,{onNodeClick:r(d)},null,8,["onNodeClick"])]),default:l(()=>[n(L,{justify:"end"},{default:l(()=>[n(D,{wrap:""},{default:l(()=>[n(N,{modelValue:r(e).username,"onUpdate:modelValue":p[0]||(p[0]=G=>r(e).username=G),placeholder:"输入用户名搜索","allow-clear":"",style:{"max-width":"250px"}},null,8,["modelValue"]),n(x,{type:"primary",onClick:r(d)},{icon:l(()=>[n(S)]),default:l(()=>[p[1]||(p[1]=C("span",null,"查询",-1))]),_:1,__:[1]},8,["onClick"]),n(x,{onClick:h},{icon:l(()=>[n(v)]),default:l(()=>[p[2]||(p[2]=C("span",null,"重置",-1))]),_:1,__:[2]})]),_:1})]),_:1}),n(U,{class:"gi_table","row-key":"id",loading:r(u),bordered:{cell:!0},columns:t,data:r(m),scroll:{x:"100%",y:"100%"},"row-selection":{type:s.multiple?"checkbox":"radio",showCheckedAll:!0},pagination:r(_),onSelect:r(f),onSelectAll:r(g)},null,8,["loading","data","row-selection","pagination","onSelect","onSelectAll"])]),_:1})}}}),re=w({__name:"index",props:{multiple:{type:Boolean,default:!1},queryParams:{default:()=>({})}},setup(c,{expose:o}){const s=c,e=I({username:""}),t=[{title:"序号",width:68,align:"center",render:({rowIndex:i})=>n("span",null,[i+1])},{title:"姓名",dataIndex:"name",width:180},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"状态",width:100,align:"center",render:({record:i})=>n(F,{status:i.status},null)}],{loading:u,tableData:m,pagination:_,search:d,select:f,selectAll:g,getSelectedData:y}=J(i=>q.getList({...i,...e,...s.queryParams}),{immediate:!0}),h=()=>{e.username="",d()};return o({getSelectedData:y}),(i,p)=>{const N=a("a-input"),S=a("icon-search"),x=a("a-button"),v=a("icon-refresh"),D=a("a-space"),L=a("a-row"),U=a("a-table"),V=P;return b(),k(V,null,{default:l(()=>[n(L,{justify:"end"},{default:l(()=>[n(D,{wrap:""},{default:l(()=>[n(N,{modelValue:r(e).username,"onUpdate:modelValue":p[0]||(p[0]=G=>r(e).username=G),placeholder:"输入用户名搜索","allow-clear":"",style:{"max-width":"250px"}},null,8,["modelValue"]),n(x,{type:"primary",onClick:r(d)},{icon:l(()=>[n(S)]),default:l(()=>[p[1]||(p[1]=C("span",null,"查询",-1))]),_:1,__:[1]},8,["onClick"]),n(x,{onClick:h},{icon:l(()=>[n(v)]),default:l(()=>[p[2]||(p[2]=C("span",null,"重置",-1))]),_:1,__:[2]})]),_:1})]),_:1}),n(U,{class:"gi_table","row-key":"id",loading:r(u),bordered:{cell:!0},columns:t,data:r(m),scroll:{x:"100%",y:"100%"},"row-selection":{type:s.multiple?"checkbox":"radio",showCheckedAll:!0},pagination:r(_),onSelect:r(f),onSelectAll:r(g)},null,8,["loading","data","row-selection","pagination","onSelect","onSelectAll"])]),_:1})}}}),T=R({title:"选择用户",component:re}),se=R({title:"左树右表对话框示例",component:le}),ie=`import type { ListItem as UserListItem } from '@/apis/person'
import { createSelectDialog } from '@/utils/createSelectDialog'
import TreeUserList from './TreeUserList/index.vue'
import UserList from './UserList/index.vue'

/** 选择用户列表的对话框 */
export const selectUserListDialog = createSelectDialog<UserListItem[]>({
  title: '选择用户',
  component: UserList
})

/** 左树右表的对话框 */
export const selectTreeUserListDialog = createSelectDialog<UserListItem[]>({
  title: '左树右表对话框示例',
  component: TreeUserList
})
`,ce=w({__name:"index",props:O({placeholder:{default:"请选择"},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},{modelValue:{type:String,default:""},modelModifiers:{}}),emits:O(["search","clear"],["update:modelValue"]),setup(c,{emit:o}){const s=K(c,"modelValue"),e=c,t=o;return(u,m)=>{const _=a("a-input"),d=a("icon-search"),f=a("a-button"),g=a("icon-close"),y=a("a-input-group");return b(),k(y,{class:"gi-input-search"},{default:l(()=>[n(_,{modelValue:s.value,"onUpdate:modelValue":m[0]||(m[0]=h=>s.value=h),placeholder:e.placeholder,readonly:""},null,8,["modelValue","placeholder"]),e.readonly?Z("",!0):(b(),Q(ee,{key:0},[n(f,{disabled:e.disabled,onClick:m[1]||(m[1]=h=>t("search",s.value))},{icon:l(()=>[n(d)]),_:1},8,["disabled"]),n(f,{disabled:e.disabled,onClick:m[2]||(m[2]=h=>t("clear"))},{icon:l(()=>[n(g)]),_:1},8,["disabled"])],64))]),_:1})}}}),$=oe(ce,[["__scopeId","data-v-74a769ae"]]),me=`<template>
  <GiPageLayout margin :body-style="{ overflowY: 'auto' }">
    <a-row align="center" class="gi_mb">
      <a-alert style="margin-right: 8px; flex: 1">通过函数调用表格弹窗</a-alert>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </a-row>

    <GiForm v-model="form" :columns="columns">
    </GiForm>

    <a-alert type="normal" class="gi_mb">通过以下方式可以快速构建表格选择弹窗</a-alert>
    <GiCodeView :code-json="DialogCodeJson"></GiCodeView>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { ColumnItem } from '@/components/GiForm'
import { selectTreeUserListDialog, selectUserListDialog } from '@/components/dialog'
import DialogCodeJson from '@/components/dialog/index.ts?raw'
import GiInputSearch from '@/components/GiInputSearch/index.vue'
import CodeJson from './index.vue?raw'

const form = reactive({
  radioId: '',
  radioName: '',
  checkboxId: '',
  checkboxName: '',
  asyncId: '',
  asyncName: '',
  demoId: '',
  demoName: ''
})

const columns = reactive([
  {
    type: 'input-search',
    label: '单选',
    field: 'radioId',
    fieldName: 'radioName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectUserListDialog({
          onOk: (data) => {
            form.radioId = data[0].id
            form.radioName = data[0].name
          }
        })
      },
      onClear: () => {
        form.radioId = ''
        form.radioName = ''
      }
    }
  },
  {
    type: 'input-search',
    label: '多选',
    field: 'checkboxId',
    fieldName: 'checkboxName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectUserListDialog({
          multiple: true,
          onOk: (data) => {
            form.checkboxId = data.map((i) => i.id).join(',')
            form.checkboxName = data.map((i) => i.name).join(',')
          }
        })
      },
      onClear: () => {
        form.checkboxId = ''
        form.checkboxName = ''
      }
    }
  },
  {
    type: GiInputSearch,
    label: '异步',
    field: 'asyncId',
    fieldName: 'asyncName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectUserListDialog({
          multiple: true,
          onBeforeOk: async (data) => {
            await new Promise((reslove) => setTimeout(() => reslove(true), 1000))
            form.asyncId = data.map((i) => i.id).join(',')
            form.asyncName = data.map((i) => i.name).join(',')
            return true
          }
        })
      },
      onClear: () => {
        form.asyncId = ''
        form.asyncName = ''
      }
    }
  },
  {
    type: GiInputSearch,
    label: '左树右表',
    field: 'demoId',
    fieldName: 'demoName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectTreeUserListDialog({
          multiple: true,
          onOk: (data) => {
            form.demoId = data.map((i) => i.id).join(',')
            form.demoName = data.map((i) => i.name).join(',')
          }
        })
      },
      onClear: () => {
        form.demoId = ''
        form.demoName = ''
      }
    }
  }
] as ColumnItem[])
<\/script>

<style lang="scss" scoped></style>
`,Ne=w({__name:"index",setup(c){const o=I({radioId:"",radioName:"",checkboxId:"",checkboxName:"",asyncId:"",asyncName:"",demoId:"",demoName:""}),s=I([{type:"input-search",label:"单选",field:"radioId",fieldName:"radioName",props:{allowClear:!0,onSearch:()=>{T({onOk:e=>{o.radioId=e[0].id,o.radioName=e[0].name}})},onClear:()=>{o.radioId="",o.radioName=""}}},{type:"input-search",label:"多选",field:"checkboxId",fieldName:"checkboxName",props:{allowClear:!0,onSearch:()=>{T({multiple:!0,onOk:e=>{o.checkboxId=e.map(t=>t.id).join(","),o.checkboxName=e.map(t=>t.name).join(",")}})},onClear:()=>{o.checkboxId="",o.checkboxName=""}}},{type:$,label:"异步",field:"asyncId",fieldName:"asyncName",props:{allowClear:!0,onSearch:()=>{T({multiple:!0,onBeforeOk:async e=>(await new Promise(t=>setTimeout(()=>t(!0),1e3)),o.asyncId=e.map(t=>t.id).join(","),o.asyncName=e.map(t=>t.name).join(","),!0)})},onClear:()=>{o.asyncId="",o.asyncName=""}}},{type:$,label:"左树右表",field:"demoId",fieldName:"demoName",props:{allowClear:!0,onSearch:()=>{se({multiple:!0,onOk:e=>{o.demoId=e.map(t=>t.id).join(","),o.demoName=e.map(t=>t.name).join(",")}})},onClear:()=>{o.demoId="",o.demoName=""}}}]);return(e,t)=>{const u=a("a-alert"),m=z,_=a("a-row"),d=Y,f=M,g=P;return b(),k(g,{margin:"","body-style":{overflowY:"auto"}},{default:l(()=>[n(_,{align:"center",class:"gi_mb"},{default:l(()=>[n(u,{style:{"margin-right":"8px",flex:"1"}},{default:l(()=>t[1]||(t[1]=[A("通过函数调用表格弹窗",-1)])),_:1,__:[1]}),n(m,{code:r(me)},null,8,["code"])]),_:1}),n(d,{modelValue:r(o),"onUpdate:modelValue":t[0]||(t[0]=y=>ne(o)?o.value=y:null),columns:r(s)},null,8,["modelValue","columns"]),n(u,{type:"normal",class:"gi_mb"},{default:l(()=>t[2]||(t[2]=[A("通过以下方式可以快速构建表格选择弹窗",-1)])),_:1,__:[2]}),n(f,{"code-json":r(ie)},null,8,["code-json"])]),_:1})}}});export{Ne as default};
