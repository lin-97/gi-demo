import{_ as O}from"./index-Zwwi5Ftb.js";import{_ as E}from"./index-DCPFMip6.js";import{_ as j}from"./GiEditTable-BjRJOWqZ.js";import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import"./index-D1V-3yfm.js";import"./dept-BHuwfU5l.js";import{u as F}from"./useDict-Btldr1OX.js";import"./role-B9mLd4Sk.js";import{a as J}from"./regexp-BWv6Tqg2.js";import L from"./FilterAddress-CRJMOek7.js";import{a9 as p}from"./arco-DTGWTKTH.js";import{e as N,a as _,c as y,ac as B,t as e,h as r,j as z,k as A,l as n,a1 as o,y as d,z as M,m as S}from"./vue-CNbhFRxi.js";const $=`<template>
  <GiPageLayout :body-style="{ overflowY: 'auto' }">
    <a-row justify="end">
      <a-space wrap>
        <a-button type="primary" :status="isReadOnly ? 'success' : 'warning'" @click="toggleReadOnly">
          {{ isReadOnly ? '编辑' : '只读' }}
        </a-button>
        <a-button type="primary" @click="addTableRow">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
      </a-space>
    </a-row>

    <gi-edit-table ref="GiEditTableRef" :scroll="{ minWidth: 1200 }" :columns="columns" :data="data"
      :cell-disabled="cellDisabled">
      <template #action="{ rowIndex }">
        <a-space>
          <a-button type="primary" status="danger" size="mini" :disabled="rowIndex === 0" @click="onDelete(rowIndex)">
            删除
          </a-button>
        </a-space>
      </template>
    </gi-edit-table>

    <a-row justify="end" class="gi_mt">
      <a-space wrap>
        <a-button @click="reset">重置</a-button>
        <a-button type="primary" @click="submit">验证并提交</a-button>
      </a-space>
    </a-row>
    <GiCodeView :code-json="tableDataJson"></GiCodeView>
  </GiPageLayout>
</template>

<script lang='tsx' setup>
import type { ColumnItem, Disabled } from '@/components/GiEditTable'
import { Message } from '@arco-design/web-vue'
import { useDict } from '@/hooks/app'
import * as Regexp from '@/utils/regexp'
import FilterAddress from './FilterAddress.vue'
import CodeJson from './Pane1.vue?raw'

defineOptions({ name: 'FormTable' })

const { data: status_options } = useDict({ code: 'status' })

const isReadOnly = ref(false)

type DataItem = { name: string, phone: string, address: string, rate: number, status: 1 | 0, num: number }
const data = ref<DataItem[]>([{ name: '张三', phone: '', address: '广州市', rate: 3, status: 0, num: 0 }])
const tableDataJson = computed(() => {
  return JSON.stringify(data.value, null, '\\t')
})
const GiEditTableRef = useTemplateRef('GiEditTableRef')
const columns = computed<ColumnItem[]>(() => [
  {
    type: 'input',
    title: '姓名',
    dataIndex: 'name',
    required: true
  },
  {
    type: 'input',
    title: '手机号',
    dataIndex: 'phone',
    required: true,
    rules: [{ match: Regexp.Phone, message: '手机号格式不正确' }]
  },
  {
    type: 'select',
    title: '状态',
    dataIndex: 'status',
    props: {
      options: status_options.value
    }
  },
  {
    type: 'rate',
    title: '评分',
    dataIndex: 'rate',
    columnProps: {
      width: 200
    }
  },
  {
    type: 'input-number',
    title: '小数',
    dataIndex: 'num',
    columnProps: {
      width: 120
    }
  },
  {
    type: 'textarea',
    title: '地址',
    dataIndex: 'address',
    props: {
      autoSize: true,
      maxLength: 200,
      showWordLimit: true
    },
    columnProps: {
      width: 250,
      title: () => (
        <a-space>
          <span>地址 </span>
          <FilterAddress onConfirm={(value: string) => {
            Message.success(\`点击了确认，查询值为: \${value || '空'}\`)
          }}
          >
          </FilterAddress>
        </a-space>
      )
    }
  },
  {
    type: '',
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    columnProps: {
      width: 100,
      align: 'center',
      fixed: 'right'
    },
    formItemProps: {
      contentClass: 'arco-table-cell-align-center'
    }
  }
])

const addTableRow = () => {
  data.value.push({ name: '', phone: '', address: '', rate: 0, status: 0, num: 0 })
}

const onDelete = (index: number) => {
  data.value.splice(index, 1)
}

const toggleReadOnly = () => {
  isReadOnly.value = !isReadOnly.value
  if (isReadOnly.value) {
    GiEditTableRef.value?.formRef?.clearValidate()
  }
}

const reset = () => {
  GiEditTableRef.value?.formRef?.resetFields()
  GiEditTableRef.value?.formRef?.clearValidate()
}

const submit = async () => {
  const valid = await GiEditTableRef.value?.formRef?.validate()
  if (valid) {
    const arr = Object.values(valid)
    Message.warning(arr[0].message)
    return
  }
  Message.success('验证通过~')
}

const cellDisabled: Disabled<DataItem> = ({ rowIndex, col }) => {
  if (isReadOnly.value) return true
  if (col.dataIndex === 'name' && rowIndex === 0) return true
  return false
}
<\/script>

<style lang='scss' scoped></style>
`,oe=N({name:"FormTable",__name:"Pane1",setup(q){const{data:b}=F({code:"status"}),s=_(!1),u=_([{name:"张三",phone:"",address:"广州市",rate:3,status:0,num:0}]),g=y(()=>JSON.stringify(u.value,null,"	")),i=B("GiEditTableRef"),v=y(()=>[{type:"input",title:"姓名",dataIndex:"name",required:!0},{type:"input",title:"手机号",dataIndex:"phone",required:!0,rules:[{match:J,message:"手机号格式不正确"}]},{type:"select",title:"状态",dataIndex:"status",props:{options:b.value}},{type:"rate",title:"评分",dataIndex:"rate",columnProps:{width:200}},{type:"input-number",title:"小数",dataIndex:"num",columnProps:{width:120}},{type:"textarea",title:"地址",dataIndex:"address",props:{autoSize:!0,maxLength:200,showWordLimit:!0},columnProps:{width:250,title:()=>e(r("a-space"),null,{default:()=>[e("span",null,[d("地址 ")]),e(L,{onConfirm:a=>{p.success(`点击了确认，查询值为: ${a||"空"}`)}},null)]})}},{type:"",title:"操作",dataIndex:"action",slotName:"action",columnProps:{width:100,align:"center",fixed:"right"},formItemProps:{contentClass:"arco-table-cell-align-center"}}]),w=()=>{u.value.push({name:"",phone:"",address:"",rate:0,status:0,num:0})},x=a=>{u.value.splice(a,1)},R=()=>{s.value=!s.value,s.value&&i.value?.formRef?.clearValidate()},I=()=>{i.value?.formRef?.resetFields(),i.value?.formRef?.clearValidate()},h=async()=>{const a=await i.value?.formRef?.validate();if(a){const t=Object.values(a);p.warning(t[0].message);return}p.success("验证通过~")},C=({rowIndex:a,col:t})=>!!(s.value||t.dataIndex==="name"&&a===0);return(a,t)=>{const l=r("a-button"),G=r("icon-plus"),T=V,c=r("a-space"),m=r("a-row"),D=j,P=E,k=O;return A(),z(k,{"body-style":{overflowY:"auto"}},{default:n(()=>[e(m,{justify:"end"},{default:n(()=>[e(c,{wrap:""},{default:n(()=>[e(l,{type:"primary",status:o(s)?"success":"warning",onClick:R},{default:n(()=>[d(M(o(s)?"编辑":"只读"),1)]),_:1},8,["status"]),e(l,{type:"primary",onClick:w},{icon:n(()=>[e(G)]),default:n(()=>[t[0]||(t[0]=S("span",null,"新增",-1))]),_:1,__:[0]}),e(T,{code:o($)},null,8,["code"])]),_:1})]),_:1}),e(D,{ref_key:"GiEditTableRef",ref:i,scroll:{minWidth:1200},columns:o(v),data:o(u),"cell-disabled":C},{action:n(({rowIndex:f})=>[e(c,null,{default:n(()=>[e(l,{type:"primary",status:"danger",size:"mini",disabled:f===0,onClick:W=>x(f)},{default:n(()=>t[1]||(t[1]=[d(" 删除 ",-1)])),_:2,__:[1]},1032,["disabled","onClick"])]),_:2},1024)]),_:1},8,["columns","data"]),e(m,{justify:"end",class:"gi_mt"},{default:n(()=>[e(c,{wrap:""},{default:n(()=>[e(l,{onClick:I},{default:n(()=>t[2]||(t[2]=[d("重置",-1)])),_:1,__:[2]}),e(l,{type:"primary",onClick:h},{default:n(()=>t[3]||(t[3]=[d("验证并提交",-1)])),_:1,__:[3]})]),_:1})]),_:1}),e(P,{"code-json":o(g)},null,8,["code-json"])]),_:1})}}});export{oe as _};
