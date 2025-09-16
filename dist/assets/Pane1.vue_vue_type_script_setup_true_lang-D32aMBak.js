import{_ as O}from"./index-BSd_cXen.js";import{_ as E}from"./index-B0F3QaLf.js";import{_ as j}from"./GiEditTable-Dk8icuk_.js";import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-9YK9MTJc.js";import"./index-ClEKbW6k.js";import"./dept-DEF04NIx.js";import{u as F}from"./useDict-B4mBI_5g.js";import"./role-Cg_-WBBn.js";import{a as J}from"./regexp-BWv6Tqg2.js";import L from"./FilterAddress-DWh99qYL.js";import{a9 as p}from"./arco-BfMEPP4p.js";import{e as N,a as _,c as y,ac as B,t as e,h as l,j as $,k as z,l as n,$ as s,y as d,z as A,m as M}from"./vue-N_SRJc_9.js";const S=`<template>\r
  <GiPageLayout :body-style="{ overflowY: 'auto' }">\r
    <a-row justify="end">\r
      <a-space wrap>\r
        <a-button type="primary" :status="isReadOnly ? 'success' : 'warning'" @click="toggleReadOnly">\r
          {{ isReadOnly ? '编辑' : '只读' }}\r
        </a-button>\r
        <a-button type="primary" @click="addTableRow">\r
          <template #icon><icon-plus /></template>\r
          <span>新增</span>\r
        </a-button>\r
        <GiCodeButton :code="CodeJson"></GiCodeButton>\r
      </a-space>\r
    </a-row>\r
\r
    <gi-edit-table ref="GiEditTableRef" :scroll="{ minWidth: 1200 }" :columns="columns" :data="data"\r
      :cell-disabled="cellDisabled">\r
      <template #action="{ rowIndex }">\r
        <a-space>\r
          <a-button type="primary" status="danger" size="mini" :disabled="rowIndex === 0" @click="onDelete(rowIndex)">\r
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
import FilterAddress from './FilterAddress.vue'\r
import CodeJson from './Pane1.vue?raw'\r
\r
defineOptions({ name: 'FormTable' })\r
\r
const { data: status_options } = useDict({ code: 'status' })\r
\r
const isReadOnly = ref(false)\r
\r
type DataItem = { name: string, phone: string, address: string, rate: number, status: 1 | 0, num: number }\r
const data = ref<DataItem[]>([{ name: '张三', phone: '', address: '广州市', rate: 3, status: 0, num: 0 }])\r
const tableDataJson = computed(() => {\r
  return JSON.stringify(data.value, null, '\\t')\r
})\r
const GiEditTableRef = useTemplateRef('GiEditTableRef')\r
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
      width: 250,\r
      title: () => (\r
        <a-space>\r
          <span>地址 </span>\r
          <FilterAddress onConfirm={(value: string) => {\r
            Message.success(\`点击了确认，查询值为: \${value || '空'}\`)\r
          }}\r
          >\r
          </FilterAddress>\r
        </a-space>\r
      )\r
    }\r
  },\r
  {\r
    type: '',\r
    title: '操作',\r
    dataIndex: 'action',\r
    slotName: 'action',\r
    columnProps: {\r
      width: 100,\r
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
const onDelete = (index: number) => {\r
  data.value.splice(index, 1)\r
}\r
\r
const toggleReadOnly = () => {\r
  isReadOnly.value = !isReadOnly.value\r
  if (isReadOnly.value) {\r
    GiEditTableRef.value?.formRef?.clearValidate()\r
  }\r
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
  if (isReadOnly.value) return true\r
  if (col.dataIndex === 'name' && rowIndex === 0) return true\r
  return false\r
}\r
<\/script>\r
\r
<style lang='scss' scoped></style>\r
`,se=N({name:"FormTable",__name:"Pane1",setup(q){const{data:b}=F({code:"status"}),a=_(!1),u=_([{name:"张三",phone:"",address:"广州市",rate:3,status:0,num:0}]),g=y(()=>JSON.stringify(u.value,null,"	")),o=B("GiEditTableRef"),v=y(()=>[{type:"input",title:"姓名",dataIndex:"name",required:!0},{type:"input",title:"手机号",dataIndex:"phone",required:!0,rules:[{match:J,message:"手机号格式不正确"}]},{type:"select",title:"状态",dataIndex:"status",props:{options:b.value}},{type:"rate",title:"评分",dataIndex:"rate",columnProps:{width:200}},{type:"input-number",title:"小数",dataIndex:"num",columnProps:{width:120}},{type:"textarea",title:"地址",dataIndex:"address",props:{autoSize:!0,maxLength:200,showWordLimit:!0},columnProps:{width:250,title:()=>e(l("a-space"),null,{default:()=>[e("span",null,[d("地址 ")]),e(L,{onConfirm:r=>{p.success(`点击了确认，查询值为: ${r||"空"}`)}},null)]})}},{type:"",title:"操作",dataIndex:"action",slotName:"action",columnProps:{width:100,align:"center",fixed:"right"},formItemProps:{contentClass:"arco-table-cell-align-center"}}]),w=()=>{u.value.push({name:"",phone:"",address:"",rate:0,status:0,num:0})},x=r=>{u.value.splice(r,1)},R=()=>{a.value=!a.value,a.value&&o.value?.formRef?.clearValidate()},I=()=>{o.value?.formRef?.resetFields(),o.value?.formRef?.clearValidate()},h=async()=>{const r=await o.value?.formRef?.validate();if(r){const t=Object.values(r);p.warning(t[0].message);return}p.success("验证通过~")},C=({rowIndex:r,col:t})=>!!(a.value||t.dataIndex==="name"&&r===0);return(r,t)=>{const i=l("a-button"),G=l("icon-plus"),T=V,c=l("a-space"),m=l("a-row"),D=j,P=E,k=O;return z(),$(k,{"body-style":{overflowY:"auto"}},{default:n(()=>[e(m,{justify:"end"},{default:n(()=>[e(c,{wrap:""},{default:n(()=>[e(i,{type:"primary",status:s(a)?"success":"warning",onClick:R},{default:n(()=>[d(A(s(a)?"编辑":"只读"),1)]),_:1},8,["status"]),e(i,{type:"primary",onClick:w},{icon:n(()=>[e(G)]),default:n(()=>[t[0]||(t[0]=M("span",null,"新增",-1))]),_:1,__:[0]}),e(T,{code:s(S)},null,8,["code"])]),_:1})]),_:1}),e(D,{ref_key:"GiEditTableRef",ref:o,scroll:{minWidth:1200},columns:s(v),data:s(u),"cell-disabled":C},{action:n(({rowIndex:f})=>[e(c,null,{default:n(()=>[e(i,{type:"primary",status:"danger",size:"mini",disabled:f===0,onClick:W=>x(f)},{default:n(()=>t[1]||(t[1]=[d(" 删除 ",-1)])),_:2,__:[1]},1032,["disabled","onClick"])]),_:2},1024)]),_:1},8,["columns","data"]),e(m,{justify:"end",class:"gi_mt"},{default:n(()=>[e(c,{wrap:""},{default:n(()=>[e(i,{onClick:I},{default:n(()=>t[2]||(t[2]=[d("重置",-1)])),_:1,__:[2]}),e(i,{type:"primary",onClick:h},{default:n(()=>t[3]||(t[3]=[d("验证并提交",-1)])),_:1,__:[3]})]),_:1})]),_:1}),e(P,{"code-json":s(g)},null,8,["code-json"])]),_:1})}}});export{se as _};
