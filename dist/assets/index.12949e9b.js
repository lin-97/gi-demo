var T=Object.defineProperty,N=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var F=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var V=(n,u,l)=>u in n?T(n,u,{enumerable:!0,configurable:!0,writable:!0,value:l}):n[u]=l,k=(n,u)=>{for(var l in u||(u={}))$.call(u,l)&&V(n,l,u[l]);if(F)for(var l of F(u))q.call(u,l)&&V(n,l,u[l]);return n},C=(n,u)=>N(n,R(u));import{_ as j}from"./GiSvgIcon.c2160feb.js";import{d as D,g as G,h as o,o as m,l as c,w as t,b as e,i as P,y as W,_ as H,N as J,r as y,ez as K,c as v,a as w,P as L,I as O,p as Q,e as X,j as h}from"./index.855e9ebd.js";import{b as Y}from"./index.50ea5dfa.js";const Z=D({__name:"AddMenuModal",props:{modelValue:{type:Boolean,default:!1},treeData:{type:Array,default:()=>[]}},emits:["update:modelValue"],setup(n,{emit:u}){const _=Y(n,"modelValue",u),i=G({parentId:"",name:"",path:"",icon:"",keepAlive:!1,hidden:!1});return(B,d)=>{const p=o("a-tree-select"),f=o("a-form-item"),r=o("a-input"),g=o("a-switch"),x=o("a-form"),b=o("a-modal");return m(),c(b,{visible:P(_),"onUpdate:visible":d[5]||(d[5]=a=>W(_)?_.value=a:null),title:"\u65B0\u589E\u83DC\u5355"},{default:t(()=>[e(x,{ref:"formRef",model:i,labelCol:{span:4}},{default:t(()=>[e(f,{label:"\u4E0A\u7EA7\u83DC\u5355",parentId:"name"},{default:t(()=>[e(p,{data:n.treeData,modelValue:i.parentId,"onUpdate:modelValue":d[0]||(d[0]=a=>i.parentId=a),placeholder:"\u8BF7\u9009\u62E9","field-names":{key:"id",title:"name",children:"children"}},null,8,["data","modelValue"])]),_:1}),e(f,{label:"\u83DC\u5355\u540D\u79F0",field:"name",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u83DC\u5355\u540D\u79F0",trigger:"blur"},{min:3,max:10,message:"\u957F\u5EA6\u5728 3 - 10\u4E2A\u5B57\u7B26",trigger:"blur"}],"validate-trigger":["change","input"]},{default:t(()=>[e(r,{placeholder:"\u8BF7\u8F93\u5165\u83DC\u5355\u540D\u79F0",modelValue:i.name,"onUpdate:modelValue":d[1]||(d[1]=a=>i.name=a)},null,8,["modelValue"])]),_:1}),e(f,{label:"\u83DC\u5355\u5730\u5740",field:"path",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u83DC\u5355\u5730\u5740",trigger:"blur"},{min:3,max:10,message:"\u957F\u5EA6\u5728 3 - 30\u4E2A\u5B57\u7B26",trigger:"blur"}],"validate-trigger":["change","input"]},{default:t(()=>[e(r,{placeholder:"\u8BF7\u8F93\u5165\u83DC\u5355\u5730\u5740",modelValue:i.path,"onUpdate:modelValue":d[2]||(d[2]=a=>i.path=a)},null,8,["modelValue"])]),_:1}),e(f,{label:"\u662F\u5426\u7F13\u5B58",name:"keepAlive"},{default:t(()=>[e(g,{size:"medium",modelValue:i.keepAlive,"onUpdate:modelValue":d[3]||(d[3]=a=>i.keepAlive=a)},null,8,["modelValue"])]),_:1}),e(f,{label:"\u662F\u5426\u9690\u85CF",name:"hidden"},{default:t(()=>[e(g,{size:"medium",modelValue:i.hidden,"onUpdate:modelValue":d[4]||(d[4]=a=>i.hidden=a)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["visible"])}}});const ee=n=>(Q("data-v-0f50745e"),n=n(),X(),n),te={class:"menu-manage"},ae=ee(()=>w("span",null,"\u65B0\u589E\u83DC\u5355",-1)),ne={class:"table-box"},oe={key:0},ue={key:1,class:"no-text"},le={key:1,class:"no-text"},ie=h("\u662F"),se=h("\u5426"),de=h("\u662F"),me=h("\u5426"),re=D({name:"MenuManage"}),ce=D(C(k({},re),{setup(n){const u=J(),l=y(!1),_=y(!1),i=y([]);return(()=>{l.value=!0,setTimeout(()=>{i.value=u.menuTree,l.value=!1},300)})(),(d,p)=>{const f=o("icon-plus"),r=o("a-button"),g=o("a-row"),x=o("IconDown"),b=o("IconRight"),a=o("a-table-column"),A=j,E=o("icon-edit"),I=o("icon-delete"),z=o("a-popconfirm"),M=o("a-space"),S=o("a-table"),U=K("loading");return m(),v("div",te,[e(g,{class:"head"},{default:t(()=>[e(r,{type:"primary",onClick:p[0]||(p[0]=s=>_.value=!0)},{icon:t(()=>[e(f)]),default:t(()=>[ae]),_:1})]),_:1}),w("section",ne,[L((m(),c(S,{data:i.value,"row-key":"id",scroll:{x:"100%",y:"100%",minWidth:900},pagination:!1,expandable:{width:80}},{"expand-icon":t(({expanded:s})=>[s?(m(),c(x,{key:0})):(m(),c(b,{key:1}))]),columns:t(()=>[e(a,{title:"\u83DC\u5355\u540D\u79F0","data-index":"name"}),e(a,{title:"\u83DC\u5355\u5730\u5740","data-index":"path"},{cell:t(({record:s})=>[s.path?(m(),v("span",oe,O(s.path),1)):(m(),v("span",ue,"\u65E0"))]),_:1}),e(a,{title:"\u83DC\u5355\u56FE\u6807","data-index":"icon",width:200},{cell:t(({record:s})=>[s.icon?(m(),c(A,{key:0,size:24,name:s.icon},null,8,["name"])):(m(),v("span",le,"\u65E0"))]),_:1}),e(a,{title:"\u662F\u5426\u7F13\u5B58","data-index":"keepAlive",width:200},{cell:t(({record:s})=>[s.keepAlive?(m(),c(r,{key:0,status:"success",size:"mini"},{icon:t(()=>[ie]),_:1})):(m(),c(r,{key:1,status:"danger",size:"mini"},{icon:t(()=>[se]),_:1}))]),_:1}),e(a,{title:"\u662F\u5426\u9690\u85CF","data-index":"hidden",width:200},{cell:t(({record:s})=>[s.hidden?(m(),c(r,{key:0,status:"success",size:"mini"},{icon:t(()=>[de]),_:1})):(m(),c(r,{key:1,status:"danger",size:"mini"},{icon:t(()=>[me]),_:1}))]),_:1}),e(a,{title:"\u64CD\u4F5C",width:100},{cell:t(({record:s})=>[e(M,null,{default:t(()=>[e(r,{type:"primary",size:"mini",onClick:p[1]||(p[1]=_e=>_.value=!0)},{icon:t(()=>[e(E)]),_:1}),e(z,{type:"warning",content:"\u60A8\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u9879\u5417?"},{default:t(()=>[e(r,{type:"primary",status:"danger",size:"mini"},{icon:t(()=>[e(I)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["data"])),[[U,l.value]])]),e(Z,{"tree-data":i.value,modelValue:_.value,"onUpdate:modelValue":p[2]||(p[2]=s=>_.value=s)},null,8,["tree-data","modelValue"])])}}}));var he=H(ce,[["__scopeId","data-v-0f50745e"]]);export{he as default};