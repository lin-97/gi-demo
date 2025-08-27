import{_ as S}from"./index-Bow7kxvS.js";import{_ as B}from"./index-CCUzGR4u.js";import{_ as M}from"./GiEditTable-BCvdcZvI.js";import{_ as O}from"./index.vue_vue_type_script_setup_true_lang-DkAyNBdy.js";import"./index-B70cmoY5.js";import"./dept-BSg8qeXU.js";import{u as $}from"./useDict-Du0qKvqH.js";import"./role-Dunc4HEg.js";import{a as q}from"./regexp-BWv6Tqg2.js";import{a9 as d}from"./arco-B8E_0xxC.js";import{e as F,a as y,c as x,ac as W,h as i,j as f,k as b,l as e,t,y as o,m as A,a1 as l}from"./vue-Bh0u9iwh.js";const Y=`<template>\r
  <GiPageLayout :body-style="{ overflowY: 'auto' }">\r
    <a-alert>此示例基于GiEditTable实现了行编辑，以及行双击编辑</a-alert>\r
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
      :cell-disabled="cellDisabled" @tr-dblclick="customRowDblclick" @row-dblclick="rowDblclick">\r
      <template #action="{ rowIndex }">\r
        <a-space>\r
          <a-button v-if="rowIndex !== currentRowIndex" type="primary" size="mini" @click="onEdit(rowIndex)">\r
            编辑\r
          </a-button>\r
          <a-button v-else type="primary" status="success" size="mini" @click="onSave()">保存</a-button>\r
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
import type { ColumnItem, Disabled } from '@/components/GiEditTable'\r
import { Message } from '@arco-design/web-vue'\r
import { useDict } from '@/hooks/app'\r
import * as Regexp from '@/utils/regexp'\r
import CodeJson from './Pane2.vue?raw'\r
\r
defineOptions({ name: 'FormTable' })\r
\r
const { data: status_options } = useDict({ code: 'status' })\r
\r
const currentRowIndex = ref(-1) // 当前编辑的行\r
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
// 行双击 GiEditTable自定义的双击事件，参数有rowIndex\r
const customRowDblclick = (e: { rowIndex: number }) => {\r
  currentRowIndex.value = e.rowIndex\r
  Message.success('GiEditTable自定义的双击事件，参数有rowIndex')\r
}\r
\r
// 行双击\r
const rowDblclick = () => {\r
  Message.info('Arco表格原生自带双击事件')\r
}\r
\r
const onEdit = (index: number) => {\r
  currentRowIndex.value = index\r
}\r
\r
const onSave = () => {\r
  currentRowIndex.value = -1\r
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
const cellDisabled: Disabled<DataItem> = ({ rowIndex }) => {\r
  if (currentRowIndex.value === rowIndex) return false\r
  return true\r
}\r
<\/script>\r
\r
<style lang='scss' scoped></style>\r
`,sn=F({name:"FormTable",__name:"Pane2",setup(H){const{data:g}=$({code:"status"}),s=y(-1),u=y([{name:"张三",phone:"",address:"广州市",rate:3,status:0,num:0}]),v=x(()=>JSON.stringify(u.value,null,"	")),c=W("GiEditTableRef"),I=x(()=>[{type:"input",title:"姓名",dataIndex:"name",required:!0},{type:"input",title:"手机号",dataIndex:"phone",required:!0,rules:[{match:q,message:"手机号格式不正确"}]},{type:"select",title:"状态",dataIndex:"status",props:{options:g.value}},{type:"rate",title:"评分",dataIndex:"rate",columnProps:{width:200}},{type:"input-number",title:"小数",dataIndex:"num",columnProps:{width:120}},{type:"textarea",title:"地址",dataIndex:"address",props:{autoSize:!0,maxLength:200,showWordLimit:!0},columnProps:{width:250}},{type:"",title:"操作",dataIndex:"action",slotName:"action",columnProps:{width:140,align:"center",fixed:"right"},formItemProps:{contentClass:"arco-table-cell-align-center"}}]),R=()=>{u.value.push({name:"",phone:"",address:"",rate:0,status:0,num:0})},k=r=>{s.value=r.rowIndex,d.success("GiEditTable自定义的双击事件，参数有rowIndex")},D=()=>{d.info("Arco表格原生自带双击事件")},C=r=>{s.value=r},G=()=>{s.value=-1},T=r=>{u.value.splice(r,1)},E=()=>{c.value?.formRef?.resetFields(),c.value?.formRef?.clearValidate()},h=async()=>{const r=await c.value?.formRef?.validate();if(r){const n=Object.values(r);d.warning(n[0].message);return}d.success("验证通过~")},P=({rowIndex:r})=>s.value!==r;return(r,n)=>{const j=i("a-alert"),z=i("icon-plus"),a=i("a-button"),J=O,m=i("a-space"),_=i("a-row"),V=M,L=B,N=S;return b(),f(N,{"body-style":{overflowY:"auto"}},{default:e(()=>[t(j,null,{default:e(()=>n[1]||(n[1]=[o("此示例基于GiEditTable实现了行编辑，以及行双击编辑",-1)])),_:1,__:[1]}),t(_,{class:"gi_mt",justify:"end"},{default:e(()=>[t(m,{wrap:""},{default:e(()=>[t(a,{type:"primary",onClick:R},{icon:e(()=>[t(z)]),default:e(()=>[n[2]||(n[2]=A("span",null,"新增",-1))]),_:1,__:[2]}),t(J,{code:l(Y)},null,8,["code"])]),_:1})]),_:1}),t(V,{ref_key:"GiEditTableRef",ref:c,scroll:{minWidth:1200},columns:l(I),data:l(u),"cell-disabled":P,onTrDblclick:k,onRowDblclick:D},{action:e(({rowIndex:p})=>[t(m,null,{default:e(()=>[p!==l(s)?(b(),f(a,{key:0,type:"primary",size:"mini",onClick:w=>C(p)},{default:e(()=>n[3]||(n[3]=[o(" 编辑 ",-1)])),_:2,__:[3]},1032,["onClick"])):(b(),f(a,{key:1,type:"primary",status:"success",size:"mini",onClick:n[0]||(n[0]=w=>G())},{default:e(()=>n[4]||(n[4]=[o("保存",-1)])),_:1,__:[4]})),t(a,{type:"primary",status:"danger",size:"mini",onClick:w=>T(p)},{default:e(()=>n[5]||(n[5]=[o(" 删除 ",-1)])),_:2,__:[5]},1032,["onClick"])]),_:2},1024)]),_:1},8,["columns","data"]),t(_,{justify:"end",class:"gi_mt"},{default:e(()=>[t(m,{wrap:""},{default:e(()=>[t(a,{onClick:E},{default:e(()=>n[6]||(n[6]=[o("重置",-1)])),_:1,__:[6]}),t(a,{type:"primary",onClick:h},{default:e(()=>n[7]||(n[7]=[o("验证并提交",-1)])),_:1,__:[7]})]),_:1})]),_:1}),t(L,{"code-json":l(v)},null,8,["code-json"])]),_:1})}}});export{sn as _};
