import{_ as P}from"./index-BSd_cXen.js";import{_ as M}from"./index-B0F3QaLf.js";import{_ as Y}from"./GiForm-tldj1e4O.js";import{_ as z}from"./index.vue_vue_type_script_setup_true_lang-9YK9MTJc.js";import{ac as E,a9 as B}from"./arco-BfMEPP4p.js";import{a as j,X as W,e as w,ac as X,h as a,j as k,k as b,$ as l,l as r,t as n,A as H,r as I,m as C,am as O,an as K,n as Q,p as Z,F as ee,y as A,Y as ne}from"./vue-N_SRJc_9.js";import{b as q}from"./index-w68tMyEK.js";import{_ as F}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-CblanbWY.js";import{_ as oe}from"./index-ClEKbW6k.js";import{u as J}from"./useTable-Ddq4CYHh.js";import{g as te}from"./index-OObeJPPc.js";import"./omit-BYpQlN8i.js";import"./useBreakpoint-B4ZW6O9T.js";import"./index-BxvfgDl6.js";const R=c=>o=>{const s=j();E.open({title:o.title||c.title,content:()=>W(c.component,{ref:e=>s.value=e,multiple:o.multiple,queryParams:o.queryParams,...c.componentProps}),width:"calc(100% - 20px)",modalStyle:{maxWidth:"1000px"},bodyStyle:{overflow:"hidden",height:"500px",padding:0},onBeforeOk:async()=>{if(!s.value?.getSelectedData)return B.warning("组件必须暴露getSelectedData方法"),!1;const e=s.value?.getSelectedData?.()||[];return e.length?o?.onBeforeOk?await o.onBeforeOk(e):(o.onOk?.(e),!0):(B.warning(c.tip||"请选择数据"),!1)}})},ae=w({__name:"Tree",emits:["node-click"],setup(c,{emit:o}){const s=o,e=X("treeRef"),t=j(!1),u=j([]);(async()=>{try{t.value=!0;const d=await te();u.value=d.data,H(()=>{e.value?.expandAll()})}finally{t.value=!1}})();const _=()=>{s("node-click")};return(d,f)=>{const g=a("a-input-search"),y=a("a-tree"),h=a("a-scrollbar"),i=a("a-spin");return b(),k(i,{loading:l(t),class:"gi_full_column"},{default:r(()=>[n(g,{class:"gi_mb",placeholder:"请输入关键词","allow-clear":""}),n(h,{style:{height:"100%",overflow:"auto"},"outer-style":"flex: 1;overflow: hidden"},{default:r(()=>[n(y,{ref_key:"treeRef",ref:e,"show-line":"",size:"mini",data:l(u),"field-names":{key:"id",title:"name"},onSelect:_},null,8,["data"])]),_:1})]),_:1},8,["loading"])}}}),re=w({__name:"index",props:{multiple:{type:Boolean,default:!1},queryParams:{default:()=>({})}},setup(c,{expose:o}){const s=c,e=I({username:""}),t=[{title:"序号",width:68,align:"center",render:({rowIndex:i})=>n("span",null,[i+1])},{title:"姓名",dataIndex:"name",width:100},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"状态",width:100,align:"center",render:({record:i})=>n(F,{status:i.status},null)}],{loading:u,tableData:m,pagination:_,search:d,select:f,selectAll:g,getSelectedData:y}=J(i=>q.getList({...i,...e,...s.queryParams}),{immediate:!0}),h=()=>{e.username="",d()};return o({getSelectedData:y}),(i,p)=>{const N=a("a-input"),S=a("icon-search"),x=a("a-button"),v=a("icon-refresh"),D=a("a-space"),L=a("a-row"),U=a("a-table"),V=P;return b(),k(V,null,{left:r(()=>[n(ae,{onNodeClick:l(d)},null,8,["onNodeClick"])]),default:r(()=>[n(L,{justify:"end"},{default:r(()=>[n(D,{wrap:""},{default:r(()=>[n(N,{modelValue:l(e).username,"onUpdate:modelValue":p[0]||(p[0]=G=>l(e).username=G),placeholder:"输入用户名搜索","allow-clear":"",style:{"max-width":"250px"}},null,8,["modelValue"]),n(x,{type:"primary",onClick:l(d)},{icon:r(()=>[n(S)]),default:r(()=>[p[1]||(p[1]=C("span",null,"查询",-1))]),_:1,__:[1]},8,["onClick"]),n(x,{onClick:h},{icon:r(()=>[n(v)]),default:r(()=>[p[2]||(p[2]=C("span",null,"重置",-1))]),_:1,__:[2]})]),_:1})]),_:1}),n(U,{class:"gi_table","row-key":"id",loading:l(u),bordered:{cell:!0},columns:t,data:l(m),scroll:{x:"100%",y:"100%"},"row-selection":{type:s.multiple?"checkbox":"radio",showCheckedAll:!0},pagination:l(_),onSelect:l(f),onSelectAll:l(g)},null,8,["loading","data","row-selection","pagination","onSelect","onSelectAll"])]),_:1})}}}),le=w({__name:"index",props:{multiple:{type:Boolean,default:!1},queryParams:{default:()=>({})}},setup(c,{expose:o}){const s=c,e=I({username:""}),t=[{title:"序号",width:68,align:"center",render:({rowIndex:i})=>n("span",null,[i+1])},{title:"姓名",dataIndex:"name",width:180},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"状态",width:100,align:"center",render:({record:i})=>n(F,{status:i.status},null)}],{loading:u,tableData:m,pagination:_,search:d,select:f,selectAll:g,getSelectedData:y}=J(i=>q.getList({...i,...e,...s.queryParams}),{immediate:!0}),h=()=>{e.username="",d()};return o({getSelectedData:y}),(i,p)=>{const N=a("a-input"),S=a("icon-search"),x=a("a-button"),v=a("icon-refresh"),D=a("a-space"),L=a("a-row"),U=a("a-table"),V=P;return b(),k(V,null,{default:r(()=>[n(L,{justify:"end"},{default:r(()=>[n(D,{wrap:""},{default:r(()=>[n(N,{modelValue:l(e).username,"onUpdate:modelValue":p[0]||(p[0]=G=>l(e).username=G),placeholder:"输入用户名搜索","allow-clear":"",style:{"max-width":"250px"}},null,8,["modelValue"]),n(x,{type:"primary",onClick:l(d)},{icon:r(()=>[n(S)]),default:r(()=>[p[1]||(p[1]=C("span",null,"查询",-1))]),_:1,__:[1]},8,["onClick"]),n(x,{onClick:h},{icon:r(()=>[n(v)]),default:r(()=>[p[2]||(p[2]=C("span",null,"重置",-1))]),_:1,__:[2]})]),_:1})]),_:1}),n(U,{class:"gi_table","row-key":"id",loading:l(u),bordered:{cell:!0},columns:t,data:l(m),scroll:{x:"100%",y:"100%"},"row-selection":{type:s.multiple?"checkbox":"radio",showCheckedAll:!0},pagination:l(_),onSelect:l(f),onSelectAll:l(g)},null,8,["loading","data","row-selection","pagination","onSelect","onSelectAll"])]),_:1})}}}),T=R({title:"选择用户",component:le}),se=R({title:"左树右表对话框示例",component:re}),ie=`import type { ListItem as UserListItem } from '@/apis/person'\r
import { createSelectDialog } from '@/utils/createSelectDialog'\r
import TreeUserList from './TreeUserList/index.vue'\r
import UserList from './UserList/index.vue'\r
\r
/** 选择用户列表的对话框 */\r
export const selectUserListDialog = createSelectDialog<UserListItem[]>({\r
  title: '选择用户',\r
  component: UserList\r
})\r
\r
/** 左树右表的对话框 */\r
export const selectTreeUserListDialog = createSelectDialog<UserListItem[]>({\r
  title: '左树右表对话框示例',\r
  component: TreeUserList\r
})\r
`,ce=w({__name:"index",props:O({placeholder:{default:"请选择"},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},{modelValue:{type:String,default:""},modelModifiers:{}}),emits:O(["search","clear"],["update:modelValue"]),setup(c,{emit:o}){const s=K(c,"modelValue"),e=c,t=o;return(u,m)=>{const _=a("a-input"),d=a("icon-search"),f=a("a-button"),g=a("icon-close"),y=a("a-input-group");return b(),k(y,{class:"gi-input-search"},{default:r(()=>[n(_,{modelValue:s.value,"onUpdate:modelValue":m[0]||(m[0]=h=>s.value=h),placeholder:e.placeholder,readonly:""},null,8,["modelValue","placeholder"]),e.readonly?Z("",!0):(b(),Q(ee,{key:0},[n(f,{disabled:e.disabled,onClick:m[1]||(m[1]=h=>t("search",s.value))},{icon:r(()=>[n(d)]),_:1},8,["disabled"]),n(f,{disabled:e.disabled,onClick:m[2]||(m[2]=h=>t("clear"))},{icon:r(()=>[n(g)]),_:1},8,["disabled"])],64))]),_:1})}}}),$=oe(ce,[["__scopeId","data-v-0949cd83"]]),me=`<template>\r
  <GiPageLayout margin :body-style="{ overflowY: 'auto' }">\r
    <a-row align="center" class="gi_mb">\r
      <a-alert style="margin-right: 8px; flex: 1">通过函数调用表格弹窗</a-alert>\r
      <GiCodeButton :code="CodeJson"></GiCodeButton>\r
    </a-row>\r
\r
    <GiForm v-model="form" :columns="columns">\r
    </GiForm>\r
\r
    <a-alert type="normal" class="gi_mb">通过以下方式可以快速构建表格选择弹窗</a-alert>\r
    <GiCodeView :code-json="DialogCodeJson"></GiCodeView>\r
  </GiPageLayout>\r
</template>\r
\r
<script setup lang="ts">\r
import type { ColumnItem } from '@/components/GiForm'\r
import { selectTreeUserListDialog, selectUserListDialog } from '@/components/dialog'\r
import DialogCodeJson from '@/components/dialog/index.ts?raw'\r
import GiInputSearch from '@/components/GiInputSearch/index.vue'\r
import CodeJson from './index.vue?raw'\r
\r
const form = reactive({\r
  radioId: '',\r
  radioName: '',\r
  checkboxId: '',\r
  checkboxName: '',\r
  asyncId: '',\r
  asyncName: '',\r
  demoId: '',\r
  demoName: ''\r
})\r
\r
const columns = reactive([\r
  {\r
    type: 'input-search',\r
    label: '单选',\r
    field: 'radioId',\r
    fieldName: 'radioName',\r
    props: {\r
      allowClear: true,\r
      onSearch: () => {\r
        selectUserListDialog({\r
          onOk: (data) => {\r
            form.radioId = data[0].id\r
            form.radioName = data[0].name\r
          }\r
        })\r
      },\r
      onClear: () => {\r
        form.radioId = ''\r
        form.radioName = ''\r
      }\r
    }\r
  },\r
  {\r
    type: 'input-search',\r
    label: '多选',\r
    field: 'checkboxId',\r
    fieldName: 'checkboxName',\r
    props: {\r
      allowClear: true,\r
      onSearch: () => {\r
        selectUserListDialog({\r
          multiple: true,\r
          onOk: (data) => {\r
            form.checkboxId = data.map((i) => i.id).join(',')\r
            form.checkboxName = data.map((i) => i.name).join(',')\r
          }\r
        })\r
      },\r
      onClear: () => {\r
        form.checkboxId = ''\r
        form.checkboxName = ''\r
      }\r
    }\r
  },\r
  {\r
    type: GiInputSearch,\r
    label: '异步',\r
    field: 'asyncId',\r
    fieldName: 'asyncName',\r
    props: {\r
      allowClear: true,\r
      onSearch: () => {\r
        selectUserListDialog({\r
          multiple: true,\r
          onBeforeOk: async (data) => {\r
            await new Promise((reslove) => setTimeout(() => reslove(true), 1000))\r
            form.asyncId = data.map((i) => i.id).join(',')\r
            form.asyncName = data.map((i) => i.name).join(',')\r
            return true\r
          }\r
        })\r
      },\r
      onClear: () => {\r
        form.asyncId = ''\r
        form.asyncName = ''\r
      }\r
    }\r
  },\r
  {\r
    type: GiInputSearch,\r
    label: '左树右表',\r
    field: 'demoId',\r
    fieldName: 'demoName',\r
    props: {\r
      allowClear: true,\r
      onSearch: () => {\r
        selectTreeUserListDialog({\r
          multiple: true,\r
          onOk: (data) => {\r
            form.demoId = data.map((i) => i.id).join(',')\r
            form.demoName = data.map((i) => i.name).join(',')\r
          }\r
        })\r
      },\r
      onClear: () => {\r
        form.demoId = ''\r
        form.demoName = ''\r
      }\r
    }\r
  }\r
] as ColumnItem[])\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,Ne=w({__name:"index",setup(c){const o=I({radioId:"",radioName:"",checkboxId:"",checkboxName:"",asyncId:"",asyncName:"",demoId:"",demoName:""}),s=I([{type:"input-search",label:"单选",field:"radioId",fieldName:"radioName",props:{allowClear:!0,onSearch:()=>{T({onOk:e=>{o.radioId=e[0].id,o.radioName=e[0].name}})},onClear:()=>{o.radioId="",o.radioName=""}}},{type:"input-search",label:"多选",field:"checkboxId",fieldName:"checkboxName",props:{allowClear:!0,onSearch:()=>{T({multiple:!0,onOk:e=>{o.checkboxId=e.map(t=>t.id).join(","),o.checkboxName=e.map(t=>t.name).join(",")}})},onClear:()=>{o.checkboxId="",o.checkboxName=""}}},{type:$,label:"异步",field:"asyncId",fieldName:"asyncName",props:{allowClear:!0,onSearch:()=>{T({multiple:!0,onBeforeOk:async e=>(await new Promise(t=>setTimeout(()=>t(!0),1e3)),o.asyncId=e.map(t=>t.id).join(","),o.asyncName=e.map(t=>t.name).join(","),!0)})},onClear:()=>{o.asyncId="",o.asyncName=""}}},{type:$,label:"左树右表",field:"demoId",fieldName:"demoName",props:{allowClear:!0,onSearch:()=>{se({multiple:!0,onOk:e=>{o.demoId=e.map(t=>t.id).join(","),o.demoName=e.map(t=>t.name).join(",")}})},onClear:()=>{o.demoId="",o.demoName=""}}}]);return(e,t)=>{const u=a("a-alert"),m=z,_=a("a-row"),d=Y,f=M,g=P;return b(),k(g,{margin:"","body-style":{overflowY:"auto"}},{default:r(()=>[n(_,{align:"center",class:"gi_mb"},{default:r(()=>[n(u,{style:{"margin-right":"8px",flex:"1"}},{default:r(()=>t[1]||(t[1]=[A("通过函数调用表格弹窗",-1)])),_:1,__:[1]}),n(m,{code:l(me)},null,8,["code"])]),_:1}),n(d,{modelValue:l(o),"onUpdate:modelValue":t[0]||(t[0]=y=>ne(o)?o.value=y:null),columns:l(s)},null,8,["modelValue","columns"]),n(u,{type:"normal",class:"gi_mb"},{default:r(()=>t[2]||(t[2]=[A("通过以下方式可以快速构建表格选择弹窗",-1)])),_:1,__:[2]}),n(f,{"code-json":l(ie)},null,8,["code-json"])]),_:1})}}});export{Ne as default};
