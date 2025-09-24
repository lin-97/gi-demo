import{_ as M}from"./index-Zwwi5Ftb.js";import{_ as $}from"./index-RNiDa7HD.js";import{_ as L}from"./GiTable-BfV5Lbdd.js";import{_ as N}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-BZ7_A1X3.js";import{_ as S}from"./GiCellGender.vue_vue_type_script_setup_true_lang-dcSAiGZA.js";import{_ as z}from"./GiCellAvatar.vue_vue_type_script_setup_true_lang-osPNEUVj.js";import{_ as F}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{_ as J}from"./index.vue_vue_type_script_setup_true_lang-ChZBomrs.js";import{b as O}from"./index-Bf4Op5cr.js";import"./index-D1V-3yfm.js";import{u as R}from"./useTable-CK5kmjjD.js";import{a9 as c}from"./arco-DTGWTKTH.js";import{e as V,h as i,j as W,k as j,l as t,t as e,a1 as s,y as r,z as q}from"./vue-CNbhFRxi.js";import"./omit-D7h5lgcv.js";import"./index-DCPFMip6.js";import"./useBreakpoint-DHNpXxSV.js";import"./index-Df9C7UWN.js";const E=`<template>
  <GiPageLayout margin>
    <GiTable row-key="id" title="会员列表" :loading="loading" :data="tableData"
      :scroll="{ x: '100%', y: '100%', minWidth: 1200 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :pagination="pagination" @refresh="getTableData">
      <template #custom-extra>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onMulDelete"></GiButton>
        <GiButton type="import" @click="onImport"></GiButton>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
      </template>
      <template #columns>
        <a-table-column title="序号" :width="66" align="center">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="姓名" data-index="name" :width="120">
          <template #cell="{ record }">
            <GiCellAvatar is-link :avatar="record.avatar" :name="record.name" @click="onClickName(record)">
            </GiCellAvatar>
          </template>
        </a-table-column>
        <a-table-column title="手机号" data-index="phone" :width="150"></a-table-column>
        <a-table-column title="性别" data-index="gender" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellGender :gender="record.gender"></GiCellGender>
          </template>
        </a-table-column>
        <a-table-column title="角色" :width="100" align="center">
          <template #cell>
            <a-tag size="small" color="#7816ff">普通用户</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellStatus :status="record.status"></GiCellStatus>
          </template>
        </a-table-column>
        <a-table-column title="创建时间" data-index="createTime" ellipsis tooltip
          :sortable="{ sortDirections: ['ascend', 'descend'] }"></a-table-column>
        <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
        <a-table-column title="操作" :width="180" align="center">
          <template #cell>
            <a-space>
              <template #split>
                <a-divider direction="vertical" :margin="0" />
              </template>
              <a-link>编辑</a-link>
              <a-link>详情</a-link>
              <a-popconfirm type="warning" content="您确定要删除该项吗?" :ok-button-props="{ status: 'danger' }"
                @before-ok="onDelete">
                <a-link status="danger">删除</a-link>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </GiTable>

    <GiFooter></GiFooter>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { PopconfirmInstance } from '@arco-design/web-vue'
import type * as T from '@/apis/person'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/person'
import { useTable } from '@/hooks'
import CodeJson from './index.vue?raw'

defineOptions({ name: 'TableCustom' })

const { tableData, getTableData, pagination, loading } = useTable((p) => baseAPI.getList(p))

const onClickName = (record: T.ListItem) => {
  Message.success(\`点击了\${record.name}\`)
}

const onAdd = () => {
  Message.info('点击了新增')
}

const onMulDelete = () => {
  Message.info('点击了批量删除')
}

const onImport = () => {
  Message.info('点击了导入')
}

const onDelete: PopconfirmInstance['onBeforeOk'] = () => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))
}
<\/script>

<style lang="scss" scoped></style>
`,de=V({name:"TableCustom",__name:"index",setup(H){const{tableData:d,getTableData:u,pagination:_,loading:g}=R(l=>O.getList(l)),f=l=>{c.success(`点击了${l.name}`)},b=()=>{c.info("点击了新增")},k=()=>{c.info("点击了批量删除")},G=()=>{c.info("点击了导入")},w=()=>new Promise(l=>setTimeout(()=>l(!0),300));return(l,o)=>{const m=J,C=F,n=i("a-table-column"),x=z,h=S,y=i("a-tag"),v=N,T=i("a-divider"),p=i("a-link"),D=i("a-popconfirm"),B=i("a-space"),A=L,I=$,P=M;return j(),W(P,{margin:""},{default:t(()=>[e(A,{"row-key":"id",title:"会员列表",loading:s(g),data:s(d),scroll:{x:"100%",y:"100%",minWidth:1200},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:s(_),onRefresh:s(u)},{"custom-extra":t(()=>[e(m,{type:"add",onClick:b}),e(m,{type:"delete",onClick:k}),e(m,{type:"import",onClick:G}),e(C,{code:s(E)},null,8,["code"])]),columns:t(()=>[e(n,{title:"序号",width:66,align:"center"},{cell:t(a=>[r(q(a.rowIndex+1),1)]),_:1}),e(n,{title:"姓名","data-index":"name",width:120},{cell:t(({record:a})=>[e(x,{"is-link":"",avatar:a.avatar,name:a.name,onClick:K=>f(a)},null,8,["avatar","name","onClick"])]),_:1}),e(n,{title:"手机号","data-index":"phone",width:150}),e(n,{title:"性别","data-index":"gender",width:100,align:"center"},{cell:t(({record:a})=>[e(h,{gender:a.gender},null,8,["gender"])]),_:1}),e(n,{title:"角色",width:100,align:"center"},{cell:t(()=>[e(y,{size:"small",color:"#7816ff"},{default:t(()=>o[0]||(o[0]=[r("普通用户",-1)])),_:1,__:[0]})]),_:1}),e(n,{title:"状态",width:100,align:"center"},{cell:t(({record:a})=>[e(v,{status:a.status},null,8,["status"])]),_:1}),e(n,{title:"创建时间","data-index":"createTime",ellipsis:"",tooltip:"",sortable:{sortDirections:["ascend","descend"]}}),e(n,{title:"地址","data-index":"address",ellipsis:"",tooltip:""}),e(n,{title:"操作",width:180,align:"center"},{cell:t(()=>[e(B,null,{split:t(()=>[e(T,{direction:"vertical",margin:0})]),default:t(()=>[e(p,null,{default:t(()=>o[1]||(o[1]=[r("编辑",-1)])),_:1,__:[1]}),e(p,null,{default:t(()=>o[2]||(o[2]=[r("详情",-1)])),_:1,__:[2]}),e(D,{type:"warning",content:"您确定要删除该项吗?","ok-button-props":{status:"danger"},onBeforeOk:w},{default:t(()=>[e(p,{status:"danger"},{default:t(()=>o[3]||(o[3]=[r("删除",-1)])),_:1,__:[3]})]),_:1})]),_:1})]),_:1})]),_:1},8,["loading","data","pagination","onRefresh"]),e(I)]),_:1})}}});export{de as default};
