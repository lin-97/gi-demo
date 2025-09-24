import{_ as S}from"./index-Zwwi5Ftb.js";import{_ as B}from"./index-DCPFMip6.js";import{_ as M}from"./GiEditTable-BjRJOWqZ.js";import{_ as O}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import"./index-D1V-3yfm.js";import"./dept-BHuwfU5l.js";import{u as $}from"./useDict-Btldr1OX.js";import"./role-B9mLd4Sk.js";import{a as q}from"./regexp-BWv6Tqg2.js";import{a9 as d}from"./arco-DTGWTKTH.js";import{e as F,a as y,c as x,ac as W,h as r,j as f,k as b,l as e,t,y as s,m as A,a1 as l}from"./vue-CNbhFRxi.js";const Y=`<template>
  <GiPageLayout :body-style="{ overflowY: 'auto' }">
    <a-alert>此示例基于GiEditTable实现了行编辑，以及行双击编辑</a-alert>

    <a-row class="gi_mt" justify="end">
      <a-space wrap>
        <a-button type="primary" @click="addTableRow">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
      </a-space>
    </a-row>

    <gi-edit-table ref="GiEditTableRef" :scroll="{ minWidth: 1200 }" :columns="columns" :data="data"
      :cell-disabled="cellDisabled" @tr-dblclick="customRowDblclick" @row-dblclick="rowDblclick">
      <template #action="{ rowIndex }">
        <a-space>
          <a-button v-if="rowIndex !== currentRowIndex" type="primary" size="mini" @click="onEdit(rowIndex)">
            编辑
          </a-button>
          <a-button v-else type="primary" status="success" size="mini" @click="onSave()">保存</a-button>
          <a-button type="primary" status="danger" size="mini" @click="onDelete(rowIndex)">
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
import CodeJson from './Pane2.vue?raw'

defineOptions({ name: 'FormTable' })

const { data: status_options } = useDict({ code: 'status' })

const currentRowIndex = ref(-1) // 当前编辑的行

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
      width: 250
    }
  },
  {
    type: '',
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    columnProps: {
      width: 140,
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

// 行双击 GiEditTable自定义的双击事件，参数有rowIndex
const customRowDblclick = (e: { rowIndex: number }) => {
  currentRowIndex.value = e.rowIndex
  Message.success('GiEditTable自定义的双击事件，参数有rowIndex')
}

// 行双击
const rowDblclick = () => {
  Message.info('Arco表格原生自带双击事件')
}

const onEdit = (index: number) => {
  currentRowIndex.value = index
}

const onSave = () => {
  currentRowIndex.value = -1
}

const onDelete = (index: number) => {
  data.value.splice(index, 1)
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

const cellDisabled: Disabled<DataItem> = ({ rowIndex }) => {
  if (currentRowIndex.value === rowIndex) return false
  return true
}
<\/script>

<style lang='scss' scoped></style>
`,rn=F({name:"FormTable",__name:"Pane2",setup(H){const{data:g}=$({code:"status"}),i=y(-1),u=y([{name:"张三",phone:"",address:"广州市",rate:3,status:0,num:0}]),v=x(()=>JSON.stringify(u.value,null,"	")),c=W("GiEditTableRef"),I=x(()=>[{type:"input",title:"姓名",dataIndex:"name",required:!0},{type:"input",title:"手机号",dataIndex:"phone",required:!0,rules:[{match:q,message:"手机号格式不正确"}]},{type:"select",title:"状态",dataIndex:"status",props:{options:g.value}},{type:"rate",title:"评分",dataIndex:"rate",columnProps:{width:200}},{type:"input-number",title:"小数",dataIndex:"num",columnProps:{width:120}},{type:"textarea",title:"地址",dataIndex:"address",props:{autoSize:!0,maxLength:200,showWordLimit:!0},columnProps:{width:250}},{type:"",title:"操作",dataIndex:"action",slotName:"action",columnProps:{width:140,align:"center",fixed:"right"},formItemProps:{contentClass:"arco-table-cell-align-center"}}]),R=()=>{u.value.push({name:"",phone:"",address:"",rate:0,status:0,num:0})},k=a=>{i.value=a.rowIndex,d.success("GiEditTable自定义的双击事件，参数有rowIndex")},D=()=>{d.info("Arco表格原生自带双击事件")},C=a=>{i.value=a},G=()=>{i.value=-1},T=a=>{u.value.splice(a,1)},E=()=>{c.value?.formRef?.resetFields(),c.value?.formRef?.clearValidate()},h=async()=>{const a=await c.value?.formRef?.validate();if(a){const n=Object.values(a);d.warning(n[0].message);return}d.success("验证通过~")},P=({rowIndex:a})=>i.value!==a;return(a,n)=>{const j=r("a-alert"),z=r("icon-plus"),o=r("a-button"),J=O,m=r("a-space"),_=r("a-row"),V=M,L=B,N=S;return b(),f(N,{"body-style":{overflowY:"auto"}},{default:e(()=>[t(j,null,{default:e(()=>n[1]||(n[1]=[s("此示例基于GiEditTable实现了行编辑，以及行双击编辑",-1)])),_:1,__:[1]}),t(_,{class:"gi_mt",justify:"end"},{default:e(()=>[t(m,{wrap:""},{default:e(()=>[t(o,{type:"primary",onClick:R},{icon:e(()=>[t(z)]),default:e(()=>[n[2]||(n[2]=A("span",null,"新增",-1))]),_:1,__:[2]}),t(J,{code:l(Y)},null,8,["code"])]),_:1})]),_:1}),t(V,{ref_key:"GiEditTableRef",ref:c,scroll:{minWidth:1200},columns:l(I),data:l(u),"cell-disabled":P,onTrDblclick:k,onRowDblclick:D},{action:e(({rowIndex:p})=>[t(m,null,{default:e(()=>[p!==l(i)?(b(),f(o,{key:0,type:"primary",size:"mini",onClick:w=>C(p)},{default:e(()=>n[3]||(n[3]=[s(" 编辑 ",-1)])),_:2,__:[3]},1032,["onClick"])):(b(),f(o,{key:1,type:"primary",status:"success",size:"mini",onClick:n[0]||(n[0]=w=>G())},{default:e(()=>n[4]||(n[4]=[s("保存",-1)])),_:1,__:[4]})),t(o,{type:"primary",status:"danger",size:"mini",onClick:w=>T(p)},{default:e(()=>n[5]||(n[5]=[s(" 删除 ",-1)])),_:2,__:[5]},1032,["onClick"])]),_:2},1024)]),_:1},8,["columns","data"]),t(_,{justify:"end",class:"gi_mt"},{default:e(()=>[t(m,{wrap:""},{default:e(()=>[t(o,{onClick:E},{default:e(()=>n[6]||(n[6]=[s("重置",-1)])),_:1,__:[6]}),t(o,{type:"primary",onClick:h},{default:e(()=>n[7]||(n[7]=[s("验证并提交",-1)])),_:1,__:[7]})]),_:1})]),_:1}),t(L,{"code-json":l(v)},null,8,["code-json"])]),_:1})}}});export{rn as _};
