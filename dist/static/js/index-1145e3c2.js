import{d as e,g as a,r as t,o as n,c as i,a as l,w as s,h as d,e as o,f as c,t as r,u,eM as p,i as _,p as m,j as v,_ as y}from"./index-7983bffe.js";import{_ as h}from"./EditMenuModal.vue_vue_type_script_setup_true_lang-73a95eb7.js";const k={class:"menu-manage"},f=(e=>(m("data-v-dc597a00"),e=e(),v(),e))((()=>d("span",null,"新增菜单",-1))),g={class:"table-box"},x={key:0},w={key:1,class:"no-text"},z=y(e({name:"SystemMenu",__name:"index",setup(e){const m=a(),v=a(!1),y=a([]);(async()=>{try{const e=await p();y.value=e.data}catch(e){}finally{v.value=!1}})();const z=()=>{var e;null==(e=m.value)||e.add()};return(e,a)=>{const p=t("icon-plus"),b=t("a-button"),M=t("a-row"),I=t("IconDown"),j=t("IconRight"),C=t("a-table-column"),R=_,E=t("icon-edit"),A=t("icon-delete"),D=t("a-popconfirm"),S=t("a-space"),W=t("a-table");return n(),i("div",k,[l(M,{class:"head"},{default:s((()=>[l(b,{type:"primary",onClick:z},{icon:s((()=>[l(p)])),default:s((()=>[f])),_:1})])),_:1}),d("section",g,[l(W,{data:u(y),"row-key":"path",loading:u(v),scroll:{x:"100%",y:"100%",minWidth:900},pagination:!1,expandable:{width:80}},{"expand-icon":s((({expanded:e})=>[e?(n(),o(I,{key:0})):(n(),o(j,{key:1}))])),columns:s((()=>[l(C,{title:"菜单名称"},{cell:s((({record:e})=>{var a;return[c(r((null==(a=e.meta)?void 0:a.title)||""),1)]})),_:1}),l(C,{title:"菜单地址","data-index":"path"},{cell:s((({record:e})=>[e.path?(n(),i("span",x,r(e.path),1)):(n(),i("span",w,"无"))])),_:1}),l(C,{title:"菜单图标","data-index":"icon",width:200},{cell:s((({record:e})=>{var a,t;return[l(R,{size:24,name:(null==(a=e.meta)?void 0:a.svgIcon)||(null==(t=e.meta)?void 0:t.icon)},null,8,["name"])]})),_:1}),l(C,{title:"是否缓存",width:200},{cell:s((({record:e})=>{var a;return[(null==(a=e.meta)?void 0:a.keepAlive)?(n(),o(b,{key:0,status:"success",size:"mini"},{icon:s((()=>[c("是")])),_:1})):(n(),o(b,{key:1,status:"danger",size:"mini"},{icon:s((()=>[c("否")])),_:1}))]})),_:1}),l(C,{title:"是否隐藏","data-index":"hidden",width:200},{cell:s((({record:e})=>{var a;return[(null==(a=e.meta)?void 0:a.hidden)?(n(),o(b,{key:0,status:"success",size:"mini"},{icon:s((()=>[c("是")])),_:1})):(n(),o(b,{key:1,status:"danger",size:"mini"},{icon:s((()=>[c("否")])),_:1}))]})),_:1}),l(C,{title:"操作",width:100},{cell:s((({record:e})=>[l(S,null,{default:s((()=>[l(b,{type:"primary",size:"mini",onClick:a=>{return t=e,void(null==(n=m.value)||n.edit(t.path));var t,n}},{icon:s((()=>[l(E)])),_:2},1032,["onClick"]),l(D,{type:"warning",content:"您确定要删除该项吗?"},{default:s((()=>[l(b,{type:"primary",status:"danger",size:"mini"},{icon:s((()=>[l(A)])),_:1})])),_:1})])),_:2},1024)])),_:1})])),_:1},8,["data","loading"])]),l(h,{ref_key:"EditMenuModalRef",ref:m},null,512)])}}}),[["__scopeId","data-v-dc597a00"]]);export{z as default};