import{u as t,L as e,_ as a}from"./index-4b39bcd6.js";import{d as o,g as s,r as l,o as i,c as r,a as n,w as c,u as p,_ as y}from"./index-bada0a94.js";import{u as d}from"./useLoading-a1d761b6.js";const u={class:"data-chart"},x=y(o({__name:"DataChart",setup(o){function y(t){return{type:"text",bottom:"8",...t,style:{text:"",textAlign:"center",fill:"#4E5969",fontSize:12}}}const{loading:x,setLoading:h}=d(!0),f=s([]),g=s([]),m=s([y({left:"2.6%"}),y({right:0})]),{chartOption:v}=t((()=>({grid:{left:"40",right:"0",top:"10",bottom:"30"},xAxis:{type:"category",offset:2,data:f.value,boundaryGap:!1,axisLabel:{color:"#4E5969",formatter:(t,e)=>0===e||e===f.value.length-1?"":`${t}`},axisLine:{show:!1},axisTick:{show:!1},splitLine:{show:!0,interval:t=>0!==t&&t!==f.value.length-1,lineStyle:{color:"#E5E8EF"}},axisPointer:{show:!0,lineStyle:{color:"#23ADFF",width:2}}},yAxis:{type:"value",axisLine:{show:!1},axisLabel:{formatter:(t,e)=>0===e?t:`${t}k`},splitLine:{show:!0,lineStyle:{type:"dashed",color:"#E5E8EF"}}},tooltip:{trigger:"axis",formatter(t){const[e]=t;return`<div>\n            <p class="tooltip-title">${e.axisValueLabel}</p>\n            <div class="content-panel"><span>总内容量</span><span class="tooltip-value">${(1e4*Number(e.value)).toLocaleString()}</span></div>\n          </div>`},className:"echarts-tooltip-diy"},graphic:{elements:m.value},series:[{data:g.value,type:"line",smooth:!0,symbolSize:12,emphasis:{focus:"series",itemStyle:{borderWidth:2}},lineStyle:{width:3,color:new e(0,0,1,0,[{offset:0,color:"rgba(30, 231, 255, 1)"},{offset:.5,color:"rgba(36, 154, 255, 1)"},{offset:1,color:"rgba(111, 66, 251, 1)"}])},showSymbol:!1,areaStyle:{opacity:.8,color:new e(0,0,0,1,[{offset:0,color:"rgba(17, 126, 255, 0.16)"},{offset:1,color:"rgba(17, 128, 255, 0)"}])}}]})));return(()=>{h(!0);try{const t=[{y:100,x:"2022-01"},{y:200,x:"2022-02"},{y:150,x:"2022-03"},{y:30,x:"2022-04"},{y:100,x:"2022-05"},{y:50,x:"2022-06"},{y:10,x:"2022-07"},{y:80,x:"2022-08"}];t.forEach(((e,a)=>{f.value.push(e.x),g.value.push(e.y),0===a&&(m.value[0].style.text=e.x),a===t.length-1&&(m.value[1].style.text=e.x)}))}catch(t){}finally{h(!1)}})(),(t,e)=>{const o=a,s=l("a-card");return i(),r("div",u,[n(s,{title:"数据图表",bordered:!1},{default:c((()=>[n(o,{height:"289px",option:p(v)},null,8,["option"])])),_:1})])}}}),[["__scopeId","data-v-ee533d49"]]);export{x as default};