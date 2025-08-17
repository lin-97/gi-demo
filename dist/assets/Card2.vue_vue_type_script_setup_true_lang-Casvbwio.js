import{u as R}from"./index-BPv1vC5v.js";import{_ as b}from"./index-6ia8nwMc.js";import{_ as I}from"./GiForm-ILBznYo5.js";import"./index-BJpBVVpn.js";import"./dept-hvCAZQXb.js";import{u as P}from"./useDict-ChW8sIaT.js";import"./role-0WIy0paV.js";import{O as S,a as D}from"./regexp-BWv6Tqg2.js";import{c as V,d as F}from"./data-DMJbYYJT.js";import{ad as q,a9 as N}from"./arco-CDZlpuCh.js";import{e as j,a as G,r as z,ac as B,c as E,X as y,t as e,h as o,y as s,j as O,k as J,l as t,a1 as p,Y as L,z as T,m as A}from"./vue-_iYK9Zi6.js";const M=`
<template>
  <a-card title="配置表单-新增">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="isNameRequired = !isNameRequired">姓名必填动态设置</a-button>
        <a-button type="primary" status="warning" @click="onViewCode">
          <template #icon><icon-code /></template>
          <span>查看代码</span>
        </a-button>
      </a-space>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm ref="formRef" v-model="form" :columns="columns">
          <template #test="{ disabled }"> 自定义插槽-禁用状态：{{ disabled }} </template>
          <template #btns>
            <a-row justify="end" class="w-full">
              <a-space>
                <a-button type="primary" @click="save">保存</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-row>
          </template>
        </GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <GiCodeView :code-json="JSON.stringify(form, null, '	')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="tsx">
import { Drawer, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { cityOptions, deptData } from './data'
import Card2Json from './code/card2-json'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import * as Regexp from '@/utils/regexp'
import { useDict } from '@/hooks/app'

const { width } = useWindowSize()
const { data: status_options } = useDict({ code: 'status' })
const isNameRequired = ref(true)

const form = reactive({
  name: '',
  phone: '',
  sort: 0,
  sex: '',
  birthday: '',
  hobbys: [],
  status: 1,
  mark: 0,
  hide: false,
  grade: 0,
  test: '',
  remark: ''
})

const formRef = useTemplateRef('formRef')

const columns = computed(() => [
  {
    type: 'group-title',
    label: '基本信息',
    field: 'base-title',
    span: 24,
    formItemProps: {
      labelColStyle: { display: 'none' }
    }
  },
  {
    type: 'input',
    label: '姓名',
    field: 'name',
    props: {
      maxLength: 4
    },
    rules: [
      { required: isNameRequired.value, message: '请输入姓名' },
      { maxLength: 4, message: '姓名不超过4个字符' },
      { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
    ],
    slots: {
      prepend: () => <icon-face-smile-fill />,
      append: () => h('span', { style: { color: 'red', fontSize: '12px' } }, '中文')
    }
  },
  {
    type: 'input',
    label: '手机',
    field: 'phone',
    props: {
      maxLength: 11
    },
    rules: [
      { required: !!form.name, message: '请输入手机号' }, // 如果有name的时候，手机号必填（动态rules示例）
      { match: Regexp.Phone, message: '手机号格式不正确' }
    ],
    slots: {
      prepend: '+86'
    }
  },
  {
    type: 'select',
    label: '性别',
    field: 'sex',
    required: true,
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 0 }
      ]
    }
  },
  {
    type: 'date-picker',
    label: '生日',
    field: 'birthday'
  },
  {
    type: 'checkbox-group',
    label: '爱好',
    field: 'hobbys',
    span: 24,
    props: {
      options: [
        { label: '电影', value: '01' },
        { label: '音乐', value: '02' },
        { label: '旅行', value: '03' },
        { label: '游戏', value: '04' }
      ]
    },
    slots: {
      label: ({ data }) => (
        <span style={{ color: 'red' }}>
          <span>{data.label}</span>
          <icon-face-smile-fill />
        </span>
      )
    }
  },
  {
    type: 'input-number',
    label: '排序',
    field: 'sort',
    props: {
      min: 0
    }
  },
  {
    type: 'radio-group',
    label: '状态',
    labelRender: () => (
      <div>
        <span>状态</span>
        <a-tooltip content="这里使用了tsx自定义渲染">
          <icon-info-circle-fill style={{ color: '#52B852' }} />
        </a-tooltip>
      </div>
    ),
    field: 'status',
    props: {
      options: status_options.value // 这里使用了字典
    }
  },
  {
    label: '测试',
    field: 'test',
    disabled: (i) => i.status === 0,
    formItemProps: { extra: '查看这里效果请切换状态' }
  },
  {
    type: 'rate',
    label: '评分',
    field: 'mark',
    formItemSlots: {
      extra: () => <a-tag>这里使用了tsx自定义渲染</a-tag>
    }
  },
  {
    type: 'switch',
    label: '是否隐藏',
    field: 'hide',
    formItemProps: { extra: '隐藏成绩项' }
  },
  {
    type: 'slider',
    label: '成绩',
    field: 'grade',
    span: 24,
    hide: (i) => {
      i.hide && (i.grade = 0)
      return i.hide === true
    }
  },
  {
    type: 'group-title',
    label: '分组标题1',
    field: 'group-title1',
    span: 24,
    formItemProps: {
      labelColStyle: { display: 'none' }
    }
  },
  {
    type: 'cascader',
    label: '城市',
    field: 'city',
    props: {
      options: cityOptions
    },
    disabled: (i) => i.status === 0
  },
  {
    type: 'tree-select',
    label: '部门',
    field: 'dept',
    props: {
      data: deptData
    },
    disabled: (i) => i.status === 0
  },
  {
    type: 'group-title',
    label: '分组标题2',
    field: 'group-title2',
    span: 24,
    formItemProps: {
      labelColStyle: { display: 'none' }
    }
  },
  {
    type: 'textarea',
    label: '备注',
    field: 'remark',
    span: 24,
    formItemProps: { extra: '这里是额外信息' }
  },
  {
    type: 'upload',
    label: '附件',
    field: 'file',
    span: 24,
    props: {
      listType: 'picture-card',
      action: '/'
    },
    formItemProps: {
      extra: '上传文件只支持zip、rar、doc、docx、pdf、jpg、png格式'
    }
  },
  {
    field: 'btns',
    span: 24
  }
] as ColumnItem<typeof form>[])

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: Card2Json, type: 'vue' }),
    width: width.value < 560 ? '100%' : 560
  })
}

const save = async () => {
  const error = await formRef.value?.formRef?.validate()
  if (error) return false
  Message.success('验证通过')
}

const reset = () => {
  formRef.value?.formRef?.resetFields()
}
<\/script>

<style lang="scss" scoped></style>
`,le=j({__name:"Card2",setup(W){const{width:g}=R(),{data:_}=P({code:"status"}),d=G(!0),r=z({name:"",phone:"",sort:0,sex:"",birthday:"",hobbys:[],status:1,mark:0,hide:!1,grade:0,test:"",remark:""}),u=B("formRef"),x=E(()=>[{type:"group-title",label:"基本信息",field:"base-title",span:24,formItemProps:{labelColStyle:{display:"none"}}},{type:"input",label:"姓名",field:"name",props:{maxLength:4},rules:[{required:d.value,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{match:S,message:"仅支持中文姓名"}],slots:{prepend:()=>e(o("icon-face-smile-fill"),null,null),append:()=>y("span",{style:{color:"red",fontSize:"12px"}},"中文")}},{type:"input",label:"手机",field:"phone",props:{maxLength:11},rules:[{required:!!r.name,message:"请输入手机号"},{match:D,message:"手机号格式不正确"}],slots:{prepend:"+86"}},{type:"select",label:"性别",field:"sex",required:!0,props:{options:[{label:"男",value:1},{label:"女",value:0}]}},{type:"date-picker",label:"生日",field:"birthday"},{type:"checkbox-group",label:"爱好",field:"hobbys",span:24,props:{options:[{label:"电影",value:"01"},{label:"音乐",value:"02"},{label:"旅行",value:"03"},{label:"游戏",value:"04"}]},slots:{label:({data:a})=>e("span",{style:{color:"red"}},[e("span",null,[a.label]),e(o("icon-face-smile-fill"),null,null)])}},{type:"input-number",label:"排序",field:"sort",props:{min:0}},{type:"radio-group",label:"状态",labelRender:()=>e("div",null,[e("span",null,[s("状态")]),e(o("a-tooltip"),{content:"这里使用了tsx自定义渲染"},{default:()=>[e(o("icon-info-circle-fill"),{style:{color:"#52B852"}},null)]})]),field:"status",props:{options:_.value}},{label:"测试",field:"test",disabled:a=>a.status===0,formItemProps:{extra:"查看这里效果请切换状态"}},{type:"rate",label:"评分",field:"mark",formItemSlots:{extra:()=>e(o("a-tag"),null,{default:()=>[s("这里使用了tsx自定义渲染")]})}},{type:"switch",label:"是否隐藏",field:"hide",formItemProps:{extra:"隐藏成绩项"}},{type:"slider",label:"成绩",field:"grade",span:24,hide:a=>(a.hide&&(a.grade=0),a.hide===!0)},{type:"group-title",label:"分组标题1",field:"group-title1",span:24,formItemProps:{labelColStyle:{display:"none"}}},{type:"cascader",label:"城市",field:"city",props:{options:V},disabled:a=>a.status===0},{type:"tree-select",label:"部门",field:"dept",props:{data:F},disabled:a=>a.status===0},{type:"group-title",label:"分组标题2",field:"group-title2",span:24,formItemProps:{labelColStyle:{display:"none"}}},{type:"textarea",label:"备注",field:"remark",span:24,formItemProps:{extra:"这里是额外信息"}},{type:"upload",label:"附件",field:"file",span:24,props:{listType:"picture-card",action:"/"},formItemProps:{extra:"上传文件只支持zip、rar、doc、docx、pdf、jpg、png格式"}},{field:"btns",span:24}]),v=()=>{q.open({title:"数据结构",content:()=>y(b,{codeJson:M,type:"vue"}),width:g.value<560?"100%":560})},h=async()=>{if(await u.value?.formRef?.validate())return!1;N.success("验证通过")},w=()=>{u.value?.formRef?.resetFields()};return(a,l)=>{const i=o("a-button"),C=o("icon-code"),m=o("a-space"),c=o("a-row"),f=o("a-col"),k=o("a-card");return J(),O(k,{title:"配置表单-新增"},{extra:t(()=>[e(m,null,{default:t(()=>[e(i,{type:"primary",onClick:l[0]||(l[0]=n=>d.value=!p(d))},{default:t(()=>l[2]||(l[2]=[s("姓名必填动态设置",-1)])),_:1,__:[2]}),e(i,{type:"primary",status:"warning",onClick:v},{icon:t(()=>[e(C)]),default:t(()=>[l[3]||(l[3]=A("span",null,"查看代码",-1))]),_:1,__:[3]})]),_:1})]),default:t(()=>[e(c,{gutter:30},{default:t(()=>[e(f,{xs:24,sm:24,md:12},{default:t(()=>[e(p(I),{ref_key:"formRef",ref:u,modelValue:p(r),"onUpdate:modelValue":l[1]||(l[1]=n=>L(r)?r.value=n:null),columns:p(x)},{test:t(({disabled:n})=>[s(" 自定义插槽-禁用状态："+T(n),1)]),btns:t(()=>[e(c,{justify:"end",class:"w-full"},{default:t(()=>[e(m,null,{default:t(()=>[e(i,{type:"primary",onClick:h},{default:t(()=>l[4]||(l[4]=[s("保存",-1)])),_:1,__:[4]}),e(i,{onClick:w},{default:t(()=>l[5]||(l[5]=[s("重置",-1)])),_:1,__:[5]})]),_:1})]),_:1})]),_:1},8,["modelValue","columns"])]),_:1}),e(f,{xs:24,sm:24,md:12},{default:t(()=>[e(b,{"code-json":JSON.stringify(p(r),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{le as _};
