import{_ as M}from"./index-BSd_cXen.js";import{_ as $}from"./index-CzbSt5z9.js";import{_ as L}from"./GiTable-DKjXAraV.js";import{_ as N}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-CblanbWY.js";import{_ as S}from"./GiCellGender.vue_vue_type_script_setup_true_lang-BVtkuWsX.js";import{_ as z}from"./GiCellAvatar.vue_vue_type_script_setup_true_lang-CLYbhcar.js";import{_ as F}from"./index.vue_vue_type_script_setup_true_lang-9YK9MTJc.js";import{_ as J}from"./index.vue_vue_type_script_setup_true_lang-DJhiOHUY.js";import{b as O}from"./index-w68tMyEK.js";import"./index-ClEKbW6k.js";import{u as R}from"./useTable-Ddq4CYHh.js";import{a9 as c}from"./arco-BfMEPP4p.js";import{e as V,h as l,j as W,k as j,l as t,t as e,$ as i,y as s,z as q}from"./vue-N_SRJc_9.js";import"./omit-BYpQlN8i.js";import"./index-B0F3QaLf.js";import"./useBreakpoint-B4ZW6O9T.js";import"./index-BxvfgDl6.js";const E=`<template>\r
  <GiPageLayout margin>\r
    <GiTable row-key="id" title="会员列表" :loading="loading" :data="tableData"\r
      :scroll="{ x: '100%', y: '100%', minWidth: 1200 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"\r
      :pagination="pagination" @refresh="getTableData">\r
      <template #custom-extra>\r
        <GiButton type="add" @click="onAdd"></GiButton>\r
        <GiButton type="delete" @click="onMulDelete"></GiButton>\r
        <GiButton type="import" @click="onImport"></GiButton>\r
        <GiCodeButton :code="CodeJson"></GiCodeButton>\r
      </template>\r
      <template #columns>\r
        <a-table-column title="序号" :width="66" align="center">\r
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>\r
        </a-table-column>\r
        <a-table-column title="姓名" data-index="name" :width="120">\r
          <template #cell="{ record }">\r
            <GiCellAvatar is-link :avatar="record.avatar" :name="record.name" @click="onClickName(record)">\r
            </GiCellAvatar>\r
          </template>\r
        </a-table-column>\r
        <a-table-column title="手机号" data-index="phone" :width="150"></a-table-column>\r
        <a-table-column title="性别" data-index="gender" :width="100" align="center">\r
          <template #cell="{ record }">\r
            <GiCellGender :gender="record.gender"></GiCellGender>\r
          </template>\r
        </a-table-column>\r
        <a-table-column title="角色" :width="100" align="center">\r
          <template #cell>\r
            <a-tag size="small" color="#7816ff">普通用户</a-tag>\r
          </template>\r
        </a-table-column>\r
        <a-table-column title="状态" :width="100" align="center">\r
          <template #cell="{ record }">\r
            <GiCellStatus :status="record.status"></GiCellStatus>\r
          </template>\r
        </a-table-column>\r
        <a-table-column title="创建时间" data-index="createTime" ellipsis tooltip\r
          :sortable="{ sortDirections: ['ascend', 'descend'] }"></a-table-column>\r
        <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>\r
        <a-table-column title="操作" :width="180" align="center">\r
          <template #cell>\r
            <a-space>\r
              <template #split>\r
                <a-divider direction="vertical" :margin="0" />\r
              </template>\r
              <a-link>编辑</a-link>\r
              <a-link>详情</a-link>\r
              <a-popconfirm type="warning" content="您确定要删除该项吗?" :ok-button-props="{ status: 'danger' }"\r
                @before-ok="onDelete">\r
                <a-link status="danger">删除</a-link>\r
              </a-popconfirm>\r
            </a-space>\r
          </template>\r
        </a-table-column>\r
      </template>\r
    </GiTable>\r
\r
    <GiFooter></GiFooter>\r
  </GiPageLayout>\r
</template>\r
\r
<script setup lang="ts">\r
import type { PopconfirmInstance } from '@arco-design/web-vue'\r
import type * as T from '@/apis/person'\r
import { Message } from '@arco-design/web-vue'\r
import { baseAPI } from '@/apis/person'\r
import { useTable } from '@/hooks'\r
import CodeJson from './index.vue?raw'\r
\r
defineOptions({ name: 'TableCustom' })\r
\r
const { tableData, getTableData, pagination, loading } = useTable((p) => baseAPI.getList(p))\r
\r
const onClickName = (record: T.ListItem) => {\r
  Message.success(\`点击了\${record.name}\`)\r
}\r
\r
const onAdd = () => {\r
  Message.info('点击了新增')\r
}\r
\r
const onMulDelete = () => {\r
  Message.info('点击了批量删除')\r
}\r
\r
const onImport = () => {\r
  Message.info('点击了导入')\r
}\r
\r
const onDelete: PopconfirmInstance['onBeforeOk'] = () => {\r
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))\r
}\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,de=V({name:"TableCustom",__name:"index",setup(H){const{tableData:d,getTableData:u,pagination:_,loading:g}=R(r=>O.getList(r)),f=r=>{c.success(`点击了${r.name}`)},b=()=>{c.info("点击了新增")},k=()=>{c.info("点击了批量删除")},G=()=>{c.info("点击了导入")},w=()=>new Promise(r=>setTimeout(()=>r(!0),300));return(r,o)=>{const m=J,C=F,n=l("a-table-column"),x=z,h=S,y=l("a-tag"),v=N,T=l("a-divider"),p=l("a-link"),D=l("a-popconfirm"),B=l("a-space"),A=L,I=$,P=M;return j(),W(P,{margin:""},{default:t(()=>[e(A,{"row-key":"id",title:"会员列表",loading:i(g),data:i(d),scroll:{x:"100%",y:"100%",minWidth:1200},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:i(_),onRefresh:i(u)},{"custom-extra":t(()=>[e(m,{type:"add",onClick:b}),e(m,{type:"delete",onClick:k}),e(m,{type:"import",onClick:G}),e(C,{code:i(E)},null,8,["code"])]),columns:t(()=>[e(n,{title:"序号",width:66,align:"center"},{cell:t(a=>[s(q(a.rowIndex+1),1)]),_:1}),e(n,{title:"姓名","data-index":"name",width:120},{cell:t(({record:a})=>[e(x,{"is-link":"",avatar:a.avatar,name:a.name,onClick:K=>f(a)},null,8,["avatar","name","onClick"])]),_:1}),e(n,{title:"手机号","data-index":"phone",width:150}),e(n,{title:"性别","data-index":"gender",width:100,align:"center"},{cell:t(({record:a})=>[e(h,{gender:a.gender},null,8,["gender"])]),_:1}),e(n,{title:"角色",width:100,align:"center"},{cell:t(()=>[e(y,{size:"small",color:"#7816ff"},{default:t(()=>o[0]||(o[0]=[s("普通用户",-1)])),_:1,__:[0]})]),_:1}),e(n,{title:"状态",width:100,align:"center"},{cell:t(({record:a})=>[e(v,{status:a.status},null,8,["status"])]),_:1}),e(n,{title:"创建时间","data-index":"createTime",ellipsis:"",tooltip:"",sortable:{sortDirections:["ascend","descend"]}}),e(n,{title:"地址","data-index":"address",ellipsis:"",tooltip:""}),e(n,{title:"操作",width:180,align:"center"},{cell:t(()=>[e(B,null,{split:t(()=>[e(T,{direction:"vertical",margin:0})]),default:t(()=>[e(p,null,{default:t(()=>o[1]||(o[1]=[s("编辑",-1)])),_:1,__:[1]}),e(p,null,{default:t(()=>o[2]||(o[2]=[s("详情",-1)])),_:1,__:[2]}),e(D,{type:"warning",content:"您确定要删除该项吗?","ok-button-props":{status:"danger"},onBeforeOk:w},{default:t(()=>[e(p,{status:"danger"},{default:t(()=>o[3]||(o[3]=[s("删除",-1)])),_:1,__:[3]})]),_:1})]),_:1})]),_:1})]),_:1},8,["loading","data","pagination","onRefresh"]),e(I)]),_:1})}}});export{de as default};
