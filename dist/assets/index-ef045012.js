import{_ as Q}from"./GiFooter-fbdc8efa.js";import{v as f}from"./runtime-dom.esm-bundler-a7552804.js";import"./index-03184213.js";import{u as X}from"./usePagination-a4b5d99b.js";import"./index-bd10b458.js";import{g as Y}from"./index-7123684c.js";import"./utils-b0df3aa8.js";import{f as B,G as Z,h as w,r as a,o as p,d as ee,a as e,w as t,U as o,a0 as g,c as v,t as k,b as te,R as ae,u as r,_ as le}from"./_plugin-vue_export-helper-a686c450.js";import"./index-be8e24a0.js";import"./vue-router-dc831d57.js";import"./auth-56bca224.js";import"./index-6b182eb3.js";const oe={class:"table-page"},ne={class:"table-box"},se=B({name:"MainTable"}),ie=B({...se,setup(_e){const s=Z({value1:"",value2:"",value3:"",value4:"",value5:""}),m=w(!1),V=w([]),i=w(!1),{current:z,pageSize:C,total:D,changeCurrent:N,changePageSize:G,setTotal:I}=X(()=>x()),x=async()=>{m.value=!0;const{success:S,data:n}=await Y({current:z.value,pageSize:C.value});S&&(V.value=n.list,I(n.total)),m.value=!1};return x(),(S,n)=>{const E=a("a-alert"),h=a("a-input"),d=a("a-form-item"),c=a("a-col"),u=a("a-option"),P=a("a-select"),F=a("a-date-picker"),L=a("icon-search"),y=a("a-button"),M=a("icon-up"),R=a("icon-down"),T=a("a-space"),W=a("a-row"),$=a("a-form"),_=a("a-table-column"),j=a("a-avatar"),U=a("a-typography-text"),q=a("icon-edit"),b=a("a-link"),A=a("icon-eye"),H=a("icon-delete"),J=a("a-popconfirm"),K=a("a-table"),O=Q;return p(),ee("div",oe,[e(E,{type:"success"},{default:t(()=>[o("三级路由【缓存路由、固定表格高度、并根据窗口大小自适应】的示例。详情页请点击操作列按钮，支持tab多开并高亮左侧菜单")]),_:1}),e($,{"label-align":"right","auto-label-width":"",model:s,class:"form"},{default:t(()=>[e(W,{gutter:16,wrap:""},{default:t(()=>[e(c,{xs:12,md:12,lg:8,xl:6,xxl:6},{default:t(()=>[e(d,{field:"value1",label:"姓名"},{default:t(()=>[e(h,{modelValue:s.value1,"onUpdate:modelValue":n[0]||(n[0]=l=>s.value1=l),placeholder:"请输入姓名"},null,8,["modelValue"])]),_:1})]),_:1}),e(c,{xs:12,md:12,lg:8,xl:6,xxl:6},{default:t(()=>[e(d,{field:"value2",label:"手机"},{default:t(()=>[e(h,{modelValue:s.value2,"onUpdate:modelValue":n[1]||(n[1]=l=>s.value2=l),placeholder:"请输入手机号码"},null,8,["modelValue"])]),_:1})]),_:1}),g(e(c,{xs:12,md:12,lg:8,xl:6,xxl:6},{default:t(()=>[e(d,{field:"value3",label:"类型"},{default:t(()=>[e(P,{placeholder:"请选择"},{default:t(()=>[e(u,null,{default:t(()=>[o("北京")]),_:1}),e(u,null,{default:t(()=>[o("上海")]),_:1}),e(u,null,{default:t(()=>[o("广州")]),_:1})]),_:1})]),_:1})]),_:1},512),[[f,i.value]]),g(e(c,{xs:12,md:12,lg:8,xl:6,xxl:6},{default:t(()=>[e(d,{field:"value3",label:"时间"},{default:t(()=>[e(F,{"show-time":"",modelValue:s.value3,"onUpdate:modelValue":n[2]||(n[2]=l=>s.value3=l),placeholder:"请选择创建时间",style:{width:"100%"}},null,8,["modelValue"])]),_:1})]),_:1},512),[[f,i.value]]),g(e(c,{xs:12,md:12,lg:8,xl:6,xxl:6},{default:t(()=>[e(d,{field:"value4",label:"状态"},{default:t(()=>[e(P,{placeholder:"请选择"},{default:t(()=>[e(u,null,{default:t(()=>[o("开启")]),_:1}),e(u,null,{default:t(()=>[o("关闭")]),_:1})]),_:1})]),_:1})]),_:1},512),[[f,i.value]]),g(e(c,{xs:12,md:12,lg:8,xl:6,xxl:6},{default:t(()=>[e(d,{field:"value5",label:"地址"},{default:t(()=>[e(h,{modelValue:s.value5,"onUpdate:modelValue":n[3]||(n[3]=l=>s.value5=l),placeholder:"请输入查询地址"},null,8,["modelValue"])]),_:1})]),_:1},512),[[f,i.value]]),e(c,{span:12},{default:t(()=>[e(T,null,{default:t(()=>[e(y,{type:"primary",onClick:x},{icon:t(()=>[e(L)]),default:t(()=>[o("查询")]),_:1}),e(y,null,{default:t(()=>[o("重置")]),_:1}),e(y,{type:"text",class:"collapsed-btn",onClick:n[4]||(n[4]=l=>i.value=!i.value)},{icon:t(()=>[i.value?(p(),v(M,{key:0})):(p(),v(R,{key:1}))]),default:t(()=>[o(k(i.value?"收起":"展开"),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["model"]),te("section",ne,[e(K,{"row-key":"id",size:"small","page-position":"bottom",bordered:{cell:!0},loading:m.value,data:V.value,scroll:{x:"100%",y:"100%",minWidth:1e3},pagination:{showPageSize:!0,total:r(D),current:r(z),pageSize:r(C)},onPageChange:r(N),onPageSizeChange:r(G)},{columns:t(()=>[e(_,{title:"序号",width:66,align:"center"},{cell:t(l=>[o(k(l.rowIndex+1),1)]),_:1}),e(_,{title:"姓名","data-index":"name",width:120}),e(_,{title:"头像",width:80},{cell:t(({record:l})=>[e(j,{size:30,style:ae({backgroundColor:l.color})},{default:t(()=>[o(k(l.name[0]),1)]),_:2},1032,["style"])]),_:1}),e(_,{title:"手机号","data-index":"phone",width:150}),e(_,{title:"创建时间","data-index":"createTime",ellipsis:"",tooltip:""}),e(_,{title:"地址","data-index":"address",ellipsis:"",tooltip:""}),e(_,{title:"状态",width:100,align:"center"},{cell:t(({record:l})=>[l.status?(p(),v(U,{key:0,type:"success"},{default:t(()=>[o("开启")]),_:1})):(p(),v(U,{key:1,type:"danger"},{default:t(()=>[o("关闭")]),_:1}))]),_:1}),e(_,{title:"操作",width:230,align:"center"},{cell:t(({record:l})=>[e(T,{size:4},{default:t(()=>[e(b,null,{icon:t(()=>[e(q,{size:15,"stroke-width":3})]),default:t(()=>[o("编辑")]),_:1}),e(b,null,{icon:t(()=>[e(A,{size:15,"stroke-width":3})]),default:t(()=>[o("详情")]),_:1}),e(J,{type:"warning",content:"您确定要删除该项吗?"},{default:t(()=>[e(b,{status:"danger"},{icon:t(()=>[e(H,{size:15,"stroke-width":3})]),default:t(()=>[o("删除")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["loading","data","pagination","onPageChange","onPageSizeChange"])]),e(O)])}}});const be=le(ie,[["__scopeId","data-v-182d5cf2"]]);export{be as default};