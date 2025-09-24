import{_ as J}from"./index-Zwwi5Ftb.js";import{_ as V}from"./index-DCPFMip6.js";import{_ as L}from"./GiEditTable-BjRJOWqZ.js";import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import"./index-D1V-3yfm.js";import"./dept-BHuwfU5l.js";import{u as S}from"./useDict-Btldr1OX.js";import"./role-B9mLd4Sk.js";import{a as z}from"./regexp-BWv6Tqg2.js";import{a9 as f}from"./arco-DTGWTKTH.js";import{e as B,a as O,c as _,ac as q,r as F,h as l,j as M,k as W,l as t,t as n,y as i,m as $,a1 as s}from"./vue-CNbhFRxi.js";const Y=`<template>
  <GiPageLayout :body-style="{ overflowY: 'auto' }">
    <a-alert>此示例基于GiEditTable实现了双击单元格编辑</a-alert>

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
      :cell-disabled="cellDisabled" @td-dblclick="tdDblclick">
      <template #action="{ rowIndex }">
        <a-space>
          <a-button type="primary" status="success" size="mini"
            :disabled="!(currentCell.rowIndex >= 0 && currentCell.rowIndex === rowIndex)" @click="onSave()">
            保存
          </a-button>
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
import type { TableColumnData } from '@arco-design/web-vue'
import type { ColumnItem, Disabled } from '@/components/GiEditTable'
import { Message } from '@arco-design/web-vue'
import { useDict } from '@/hooks/app'
import * as Regexp from '@/utils/regexp'
import CodeJson from './Pane3.vue?raw'

defineOptions({ name: 'FormTable' })

const { data: status_options } = useDict({ code: 'status' })

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

const currentCell = reactive({ rowIndex: -1, dataIndex: '' })
const tdDblclick = (e: { rowIndex: number, column: TableColumnData }) => {
  currentCell.rowIndex = e.rowIndex
  currentCell.dataIndex = e.column.dataIndex as string
}

const onSave = () => {
  currentCell.rowIndex = -1
  currentCell.dataIndex = ''
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

const cellDisabled: Disabled<DataItem> = ({ rowIndex, col }) => {
  if (currentCell.rowIndex === rowIndex && currentCell.dataIndex === col.dataIndex) return false
  return true
}
<\/script>

<style lang='scss' scoped></style>
`,se=B({name:"FormTable",__name:"Pane3",setup(A){const{data:b}=S({code:"status"}),d=O([{name:"张三",phone:"",address:"广州市",rate:3,status:0,num:0}]),x=_(()=>JSON.stringify(d.value,null,"	")),u=q("GiEditTableRef"),w=_(()=>[{type:"input",title:"姓名",dataIndex:"name",required:!0},{type:"input",title:"手机号",dataIndex:"phone",required:!0,rules:[{match:z,message:"手机号格式不正确"}]},{type:"select",title:"状态",dataIndex:"status",props:{options:b.value}},{type:"rate",title:"评分",dataIndex:"rate",columnProps:{width:200}},{type:"input-number",title:"小数",dataIndex:"num",columnProps:{width:120}},{type:"textarea",title:"地址",dataIndex:"address",props:{autoSize:!0,maxLength:200,showWordLimit:!0},columnProps:{width:250}},{type:"",title:"操作",dataIndex:"action",slotName:"action",columnProps:{width:140,align:"center",fixed:"right"},formItemProps:{contentClass:"arco-table-cell-align-center"}}]),y=()=>{d.value.push({name:"",phone:"",address:"",rate:0,status:0,num:0})},o=F({rowIndex:-1,dataIndex:""}),I=a=>{o.rowIndex=a.rowIndex,o.dataIndex=a.column.dataIndex},g=()=>{o.rowIndex=-1,o.dataIndex=""},v=a=>{d.value.splice(a,1)},C=()=>{u.value?.formRef?.resetFields(),u.value?.formRef?.clearValidate()},D=async()=>{const a=await u.value?.formRef?.validate();if(a){const e=Object.values(a);f.warning(e[0].message);return}f.success("验证通过~")},T=({rowIndex:a,col:e})=>!(o.rowIndex===a&&o.dataIndex===e.dataIndex);return(a,e)=>{const R=l("a-alert"),k=l("icon-plus"),r=l("a-button"),G=N,c=l("a-space"),m=l("a-row"),h=L,P=V,E=J;return W(),M(E,{"body-style":{overflowY:"auto"}},{default:t(()=>[n(R,null,{default:t(()=>e[1]||(e[1]=[i("此示例基于GiEditTable实现了双击单元格编辑",-1)])),_:1,__:[1]}),n(m,{class:"gi_mt",justify:"end"},{default:t(()=>[n(c,{wrap:""},{default:t(()=>[n(r,{type:"primary",onClick:y},{icon:t(()=>[n(k)]),default:t(()=>[e[2]||(e[2]=$("span",null,"新增",-1))]),_:1,__:[2]}),n(G,{code:s(Y)},null,8,["code"])]),_:1})]),_:1}),n(h,{ref_key:"GiEditTableRef",ref:u,scroll:{minWidth:1200},columns:s(w),data:s(d),"cell-disabled":T,onTdDblclick:I},{action:t(({rowIndex:p})=>[n(c,null,{default:t(()=>[n(r,{type:"primary",status:"success",size:"mini",disabled:!(s(o).rowIndex>=0&&s(o).rowIndex===p),onClick:e[0]||(e[0]=j=>g())},{default:t(()=>e[3]||(e[3]=[i(" 保存 ",-1)])),_:2,__:[3]},1032,["disabled"]),n(r,{type:"primary",status:"danger",size:"mini",onClick:j=>v(p)},{default:t(()=>e[4]||(e[4]=[i(" 删除 ",-1)])),_:2,__:[4]},1032,["onClick"])]),_:2},1024)]),_:1},8,["columns","data"]),n(m,{justify:"end",class:"gi_mt"},{default:t(()=>[n(c,{wrap:""},{default:t(()=>[n(r,{onClick:C},{default:t(()=>e[5]||(e[5]=[i("重置",-1)])),_:1,__:[5]}),n(r,{type:"primary",onClick:D},{default:t(()=>e[6]||(e[6]=[i("验证并提交",-1)])),_:1,__:[6]})]),_:1})]),_:1}),n(P,{"code-json":s(x)},null,8,["code-json"])]),_:1})}}});export{se as _};
