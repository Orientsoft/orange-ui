(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[19,36],{211:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return b}));var a=n(101),r=n(29),o=n(30),i=n(32),c=n(31),s=n(33),u=n(0),l=n.n(u),p=n(100),d=n(43),m=n(786),h=n(391),f=n(152),g=n(803),v={2:"\u5f85\u6302\u53f7",3:"\u5f85\u4f7f\u7528",4:"\u5f85\u8bc4\u4ef7",5:"\u5b8c\u6210"},b=function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(i.a)(this,Object(c.a)(e).call(this,t))).getPageData=function(){Object(h.getAppointList)(n.state.current).then((function(t){if(1!==t.status)n.setState({dataSource:[]});else{var e=t.data.map((function(t){return Object(a.a)({},t,{productName:t.product?t.product.name:"",appointmentName:t.appointment?t.appointment.name:"",appointmentPhone:t.appointment?t.appointment.phone:"",appointmentOrderAt:t.appointment?t.appointment.orderAt:"",appointmentRemark:t.appointment?t.appointment.remark:""})}));n.setState({dataSource:e,total:t.total})}})).catch((function(t){console.log(t)}))},n.onChangePage=function(t){n.setState({current:t},(function(){n.getPageData()}))},n.onOrderRegister=function(t){return function(){Object(h.orderRegister)({id:t}).then((function(t){if(1===t.status)return p.a.success("\u6302\u53f7\u6210\u529f"),void n.getPageData();p.a.error("\u6302\u53f7\u5931\u8d25:".concat(t.message))})).catch((function(t){console.log(t)}))}},n.onCancel=function(){n.setState({visible:!1,selectRow:{}})},n.showCaseModal=function(t){return function(){n.setState({visible:!0,selectRow:t})}},n.handleOk=function(t){Object(h.orderCase)({id:n.state.selectRow.id,content:t}).then((function(t){if(1===t.status)return n.onCancel(),void n.getPageData();p.a.error("\u63d0\u4ea4\u5931\u8d25")})).catch((function(t){console.log(t)}))},n.state={mode:"",visible:!1,current:1,total:0,dataSource:[],selectRow:{}},n}return Object(s.a)(e,t),Object(o.a)(e,[{key:"componentDidMount",value:function(){this.getPageData()}},{key:"render",value:function(){var t=this,e=[{title:"\u4ea7\u54c1",dataIndex:"productName",key:"productName",align:"center"},{title:"\u540d\u5b57",dataIndex:"appointmentName",key:"appointmentName",align:"center"},{title:"\u7535\u8bdd",dataIndex:"appointmentPhone",key:"appointmentPhone",align:"center"},{title:"\u5176\u4ed6\u8bf4\u660e",dataIndex:"appointmentRemark",key:"appointmentRemark",align:"center"},{title:"\u9884\u7ea6\u65f6\u95f4",dataIndex:"appointmentOrderAt",key:"appointmentOrderAt",align:"center",render:f.e},{title:"\u72b6\u6001",dataIndex:"status",key:"status",align:"center",render:function(t){return v[t]}},{title:"\u64cd\u4f5c",dataIndex:"action",key:"action",align:"center",width:200,render:function(e,n){return l.a.createElement("span",null,l.a.createElement(d.a,{disabled:3===n.status,type:"primary",style:{marginRight:"16px"},onClick:t.onOrderRegister(n.id)},"\u6302\u53f7"),l.a.createElement(d.a,{type:"primary",onClick:t.showCaseModal(n)},"\u586b\u62a5\u75c5\u4f8b"))}}];return l.a.createElement("div",null,l.a.createElement(m.a,{current:this.state.current,total:this.state.total,columns:e,dataSource:this.state.dataSource,onChangePage:this.onChangePage}),l.a.createElement(g.a,{title:"\u8bf7\u586b\u5199\u75c5\u4f8b",visible:this.state.visible,onCancel:this.onCancel,handleOk:this.handleOk}))}}]),e}(l.a.Component)},391:function(t,e,n){"use strict";n.r(e),n.d(e,"getAppointList",(function(){return r})),n.d(e,"orderRegister",(function(){return o})),n.d(e,"orderCase",(function(){return i}));var a=n(68);function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return Object(a.a)("get","/order/hospital?page=".concat(t,"&limit=10"))}function o(t){return Object(a.a)("post","/order/register",t)}function i(t){return Object(a.a)("post","/order/case",t)}},786:function(t,e,n){"use strict";n.d(e,"a",(function(){return m}));var a=n(29),r=n(30),o=n(32),i=n(31),c=n(33),s=n(0),u=n.n(s),l=n(1085),p=n(854),d=n(152),m=function(t){function e(){return Object(a.a)(this,e),Object(o.a)(this,Object(i.a)(e).apply(this,arguments))}return Object(c.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this.props,e=t.columns,n=t.dataSource,a=t.current,r=t.total,o=t.onChangePage;return console.log("total",r),u.a.createElement("div",{style:{marginTop:"16px"}},u.a.createElement(l.a,{bordered:!0,dataSource:n,columns:e,pagination:!1,rowKey:d.c,size:"small"}),u.a.createElement("div",{className:"clearfix"},u.a.createElement(p.a,{current:a,total:r,onChange:o,style:{float:"right",marginTop:"16px"}})))}}]),e}(u.a.Component)},803:function(t,e,n){"use strict";n.d(e,"a",(function(){return h}));var a=n(29),r=n(30),o=n(32),i=n(31),c=n(33),s=n(0),u=n.n(s),l=n(192),p=n(100),d=n(777),m=l.a.TextArea,h=function(t){function e(){var t,n;Object(a.a)(this,e);for(var r=arguments.length,c=new Array(r),s=0;s<r;s++)c[s]=arguments[s];return(n=Object(o.a)(this,(t=Object(i.a)(e)).call.apply(t,[this].concat(c)))).state={value:""},n.onChange=function(t){console.log(t),n.setState({value:t.target.value})},n.handleOk=function(){n.state.value?n.props.handleOk(n.state.value):p.a.error("\u8bf7\u586b\u5199")},n}return Object(c.a)(e,t),Object(r.a)(e,[{key:"componentDidUpdate",value:function(t){this.props.visible===t.visible||t.visible||this.setState({value:""})}},{key:"render",value:function(){return u.a.createElement(d.a,{title:this.props.title,visible:this.props.visible,onOk:this.handleOk,onCancel:this.props.onCancel},u.a.createElement(m,{rows:4,onChange:this.onChange,value:this.state.value}))}}]),e}(u.a.Component);h.defaultProps={handleOk:function(){}}}}]);
//# sourceMappingURL=19.d5dcc844.chunk.js.map