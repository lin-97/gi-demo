import{_ as J}from"./index-BSd_cXen.js";import{_ as V}from"./index-B0F3QaLf.js";import{_ as L}from"./GiEditTable-Dk8icuk_.js";import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-9YK9MTJc.js";import"./index-ClEKbW6k.js";import"./dept-DEF04NIx.js";import{u as S}from"./useDict-B4mBI_5g.js";import"./role-Cg_-WBBn.js";import{a as z}from"./regexp-BWv6Tqg2.js";import{a9 as f}from"./arco-BfMEPP4p.js";import{e as B,a as O,c as _,ac as $,r as q,h as l,j as F,k as M,l as t,t as n,y as i,m as W,$ as o}from"./vue-N_SRJc_9.js";const Y=`<template>\r
  <GiPageLayout :body-style="{ overflowY: 'auto' }">\r
    <a-alert>此示例基于GiEditTable实现了双击单元格编辑</a-alert>\r
\r
    <a-row class="gi_mt" justify="end">\r
      <a-space wrap>\r
        <a-button type="primary" @click="addTableRow">\r
          <template #icon><icon-plus /></template>\r
          <span>新增</span>\r
        </a-button>\r
        <GiCodeButton :code="CodeJson"></GiCodeButton>\r
      </a-space>\r
    </a-row>\r
\r
    <gi-edit-table ref="GiEditTableRef" :scroll="{ minWidth: 1200 }" :columns="columns" :data="data"\r
      :cell-disabled="cellDisabled" @td-dblclick="tdDblclick">\r
      <template #action="{ rowIndex }">\r
        <a-space>\r
          <a-button type="primary" status="success" size="mini"\r
            :disabled="!(currentCell.rowIndex >= 0 && currentCell.rowIndex === rowIndex)" @click="onSave()">\r
            保存\r
          </a-button>\r
          <a-button type="primary" status="danger" size="mini" @click="onDelete(rowIndex)">\r
            删除\r
          </a-button>\r
        </a-space>\r
      </template>\r
    </gi-edit-table>\r
\r
    <a-row justify="end" class="gi_mt">\r
      <a-space wrap>\r
        <a-button @click="reset">重置</a-button>\r
        <a-button type="primary" @click="submit">验证并提交</a-button>\r
      </a-space>\r
    </a-row>\r
    <GiCodeView :code-json="tableDataJson"></GiCodeView>\r
  </GiPageLayout>\r
</template>\r
\r
<script lang='tsx' setup>\r
import type { TableColumnData } from '@arco-design/web-vue'\r
import type { ColumnItem, Disabled } from '@/components/GiEditTable'\r
import { Message } from '@arco-design/web-vue'\r
import { useDict } from '@/hooks/app'\r
import * as Regexp from '@/utils/regexp'\r
import CodeJson from './Pane3.vue?raw'\r
\r
defineOptions({ name: 'FormTable' })\r
\r
const { data: status_options } = useDict({ code: 'status' })\r
\r
type DataItem = { name: string, phone: string, address: string, rate: number, status: 1 | 0, num: number }\r
const data = ref<DataItem[]>([{ name: '张三', phone: '', address: '广州市', rate: 3, status: 0, num: 0 }])\r
const tableDataJson = computed(() => {\r
  return JSON.stringify(data.value, null, '\\t')\r
})\r
const GiEditTableRef = useTemplateRef('GiEditTableRef')\r
\r
const columns = computed<ColumnItem[]>(() => [\r
  {\r
    type: 'input',\r
    title: '姓名',\r
    dataIndex: 'name',\r
    required: true\r
  },\r
  {\r
    type: 'input',\r
    title: '手机号',\r
    dataIndex: 'phone',\r
    required: true,\r
    rules: [{ match: Regexp.Phone, message: '手机号格式不正确' }]\r
  },\r
  {\r
    type: 'select',\r
    title: '状态',\r
    dataIndex: 'status',\r
    props: {\r
      options: status_options.value\r
    }\r
  },\r
  {\r
    type: 'rate',\r
    title: '评分',\r
    dataIndex: 'rate',\r
    columnProps: {\r
      width: 200\r
    }\r
  },\r
  {\r
    type: 'input-number',\r
    title: '小数',\r
    dataIndex: 'num',\r
    columnProps: {\r
      width: 120\r
    }\r
  },\r
  {\r
    type: 'textarea',\r
    title: '地址',\r
    dataIndex: 'address',\r
    props: {\r
      autoSize: true,\r
      maxLength: 200,\r
      showWordLimit: true\r
    },\r
    columnProps: {\r
      width: 250\r
    }\r
  },\r
  {\r
    type: '',\r
    title: '操作',\r
    dataIndex: 'action',\r
    slotName: 'action',\r
    columnProps: {\r
      width: 140,\r
      align: 'center',\r
      fixed: 'right'\r
    },\r
    formItemProps: {\r
      contentClass: 'arco-table-cell-align-center'\r
    }\r
  }\r
])\r
\r
const addTableRow = () => {\r
  data.value.push({ name: '', phone: '', address: '', rate: 0, status: 0, num: 0 })\r
}\r
\r
const currentCell = reactive({ rowIndex: -1, dataIndex: '' })\r
const tdDblclick = (e: { rowIndex: number, column: TableColumnData }) => {\r
  currentCell.rowIndex = e.rowIndex\r
  currentCell.dataIndex = e.column.dataIndex as string\r
}\r
\r
const onSave = () => {\r
  currentCell.rowIndex = -1\r
  currentCell.dataIndex = ''\r
}\r
\r
const onDelete = (index: number) => {\r
  data.value.splice(index, 1)\r
}\r
\r
const reset = () => {\r
  GiEditTableRef.value?.formRef?.resetFields()\r
  GiEditTableRef.value?.formRef?.clearValidate()\r
}\r
\r
const submit = async () => {\r
  const valid = await GiEditTableRef.value?.formRef?.validate()\r
  if (valid) {\r
    const arr = Object.values(valid)\r
    Message.warning(arr[0].message)\r
    return\r
  }\r
  Message.success('验证通过~')\r
}\r
\r
const cellDisabled: Disabled<DataItem> = ({ rowIndex, col }) => {\r
  if (currentCell.rowIndex === rowIndex && currentCell.dataIndex === col.dataIndex) return false\r
  return true\r
}\r
<\/script>\r
\r
<style lang='scss' scoped></style>\r
`,oe=B({name:"FormTable",__name:"Pane3",setup(A){const{data:b}=S({code:"status"}),d=O([{name:"张三",phone:"",address:"广州市",rate:3,status:0,num:0}]),x=_(()=>JSON.stringify(d.value,null,"	")),u=$("GiEditTableRef"),w=_(()=>[{type:"input",title:"姓名",dataIndex:"name",required:!0},{type:"input",title:"手机号",dataIndex:"phone",required:!0,rules:[{match:z,message:"手机号格式不正确"}]},{type:"select",title:"状态",dataIndex:"status",props:{options:b.value}},{type:"rate",title:"评分",dataIndex:"rate",columnProps:{width:200}},{type:"input-number",title:"小数",dataIndex:"num",columnProps:{width:120}},{type:"textarea",title:"地址",dataIndex:"address",props:{autoSize:!0,maxLength:200,showWordLimit:!0},columnProps:{width:250}},{type:"",title:"操作",dataIndex:"action",slotName:"action",columnProps:{width:140,align:"center",fixed:"right"},formItemProps:{contentClass:"arco-table-cell-align-center"}}]),y=()=>{d.value.push({name:"",phone:"",address:"",rate:0,status:0,num:0})},a=q({rowIndex:-1,dataIndex:""}),I=r=>{a.rowIndex=r.rowIndex,a.dataIndex=r.column.dataIndex},g=()=>{a.rowIndex=-1,a.dataIndex=""},v=r=>{d.value.splice(r,1)},C=()=>{u.value?.formRef?.resetFields(),u.value?.formRef?.clearValidate()},D=async()=>{const r=await u.value?.formRef?.validate();if(r){const e=Object.values(r);f.warning(e[0].message);return}f.success("验证通过~")},T=({rowIndex:r,col:e})=>!(a.rowIndex===r&&a.dataIndex===e.dataIndex);return(r,e)=>{const R=l("a-alert"),k=l("icon-plus"),s=l("a-button"),G=N,c=l("a-space"),m=l("a-row"),h=L,P=V,E=J;return M(),F(E,{"body-style":{overflowY:"auto"}},{default:t(()=>[n(R,null,{default:t(()=>e[1]||(e[1]=[i("此示例基于GiEditTable实现了双击单元格编辑",-1)])),_:1,__:[1]}),n(m,{class:"gi_mt",justify:"end"},{default:t(()=>[n(c,{wrap:""},{default:t(()=>[n(s,{type:"primary",onClick:y},{icon:t(()=>[n(k)]),default:t(()=>[e[2]||(e[2]=W("span",null,"新增",-1))]),_:1,__:[2]}),n(G,{code:o(Y)},null,8,["code"])]),_:1})]),_:1}),n(h,{ref_key:"GiEditTableRef",ref:u,scroll:{minWidth:1200},columns:o(w),data:o(d),"cell-disabled":T,onTdDblclick:I},{action:t(({rowIndex:p})=>[n(c,null,{default:t(()=>[n(s,{type:"primary",status:"success",size:"mini",disabled:!(o(a).rowIndex>=0&&o(a).rowIndex===p),onClick:e[0]||(e[0]=j=>g())},{default:t(()=>e[3]||(e[3]=[i(" 保存 ",-1)])),_:2,__:[3]},1032,["disabled"]),n(s,{type:"primary",status:"danger",size:"mini",onClick:j=>v(p)},{default:t(()=>e[4]||(e[4]=[i(" 删除 ",-1)])),_:2,__:[4]},1032,["onClick"])]),_:2},1024)]),_:1},8,["columns","data"]),n(m,{justify:"end",class:"gi_mt"},{default:t(()=>[n(c,{wrap:""},{default:t(()=>[n(s,{onClick:C},{default:t(()=>e[5]||(e[5]=[i("重置",-1)])),_:1,__:[5]}),n(s,{type:"primary",onClick:D},{default:t(()=>e[6]||(e[6]=[i("验证并提交",-1)])),_:1,__:[6]})]),_:1})]),_:1}),n(P,{"code-json":o(x)},null,8,["code-json"])]),_:1})}}});export{oe as _};
