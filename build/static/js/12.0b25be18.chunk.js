(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[12,28,38,47],{215:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return g}));var n=a(29),r=a(30),c=a(32),i=a(31),l=a(33),s=a(0),o=a.n(s),u=a(100),d=a(786),m=a(393),p=a(394),f=a(152),v={0:"\u5f85\u652f\u4ed8",1:"\u5f85\u9884\u7ea6",2:"\u5f85\u4f7f\u7528",3:"\u5f85\u8bc4\u4ef7",4:"\u5df2\u5b8c\u6210"},h={WEIXINPAY:"\u5fae\u4fe1",ALIPAY:"\u652f\u4ed8\u5b9d"},g=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(c.a)(this,Object(i.a)(t).call(this,e))).getPageData=function(){Object(p.getOrderList)(a.state.current).then((function(e){1!==e.status?a.setState({dataSource:[]}):a.setState({dataSource:e.data,total:e.total})})).catch((function(e){console.log(e)}))},a.onChangePage=function(e){a.setState({current:e},(function(){a.getPageData()}))},a.showDetail=function(e){return function(){Object(p.getOrderDetail)(e.id).then((function(e){1!==e.status?u.a.error("\u6682\u65e0\u9884\u7ea6\u4fe1\u606f"):a.setState({visible:!0,detailData:e.data})})).catch((function(e){console.log(e)}))}},a.onCancel=function(){a.setState({visible:!1})},a.state={visible:!1,current:1,total:0,dataSource:[],detailData:{}},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getPageData()}},{key:"render",value:function(){var e=this,t=[{title:"\u4ea7\u54c1",dataIndex:"product",key:"product",align:"center",render:function(e){return e?e.name:""}},{title:"\u8d2d\u4e70\u4ef7\u683c",dataIndex:"price",key:"price",align:"center"},{title:"\u4e0b\u5355\u65f6\u95f4",dataIndex:"createdAt",key:"createdAt",align:"center",render:f.e,width:200},{title:"\u4ed8\u6b3e\u65b9\u5f0f",dataIndex:"pay",key:"pay",align:"center",render:function(e){return h[e]}},{title:"\u4ed8\u6b3e\u65f6\u95f4",dataIndex:"payAt",key:"payAt",align:"center",render:f.e,width:200},{title:"\u8ba2\u5355\u72b6\u6001",dataIndex:"status",key:"status",align:"center",render:function(e){return v[e]}},{title:"\u9884\u7ea6",dataIndex:"appoint",key:"appoint",align:"center",render:function(t,a){return o.a.createElement("span",{className:"canClick",onClick:e.showDetail(a)},"\u8be6\u60c5")}}];return o.a.createElement("div",null,o.a.createElement(d.a,{current:this.state.current,total:this.state.total,columns:t,dataSource:this.state.dataSource,onChangePage:this.onChangePage}),o.a.createElement(m.default,{onCancel:this.onCancel,visible:this.state.visible,detailData:this.state.detailData}))}}]),t}(o.a.Component)},393:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var n=a(29),r=a(30),c=a(32),i=a(31),l=a(33),s=a(0),o=a.n(s),u=a(777),d=(a(779),a(152)),m=function(e){function t(){return Object(n.a)(this,t),Object(c.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.visible,a=e.onCancel,n=e.detailData;return o.a.createElement(u.a,{visible:t,title:"\u8ba2\u5355\u9884\u7ea6\u8be6\u60c5",onCancel:a,footer:!1,width:1024},o.a.createElement("div",{className:"appointment-detail"},o.a.createElement("ul",null,o.a.createElement("li",{className:"item"},o.a.createElement("div",{className:"title"},"\u9884\u7ea6\u4eba:"),o.a.createElement("div",{className:"value"},n.name)),o.a.createElement("li",{className:"item"},o.a.createElement("div",{className:"title"},"\u9884\u7ea6\u65f6\u95f4:"),o.a.createElement("div",{className:"value"},Object(d.e)(n.orderAt))),o.a.createElement("li",{className:"item"},o.a.createElement("div",{className:"title"},"\u7535\u8bdd:"),o.a.createElement("div",{className:"value"},n.phone)),o.a.createElement("li",{className:"item"},o.a.createElement("div",{className:"title"},"\u533b\u9662:"),o.a.createElement("div",{className:"value"},n.hospitalName)),o.a.createElement("li",{className:"item"},o.a.createElement("div",{className:"title"},"\u8be6\u7ec6\u5730\u5740:"),o.a.createElement("div",{className:"value"},n.address)),o.a.createElement("li",{className:"item"},o.a.createElement("div",{className:"title"},"\u5907\u6ce8:"),o.a.createElement("div",{className:"value"},n.remark)))))}}]),t}(o.a.Component)},394:function(e,t,a){"use strict";a.r(t),a.d(t,"getOrderList",(function(){return r})),a.d(t,"getOrderDetail",(function(){return c}));var n=a(68);function r(e){return Object(n.a)("get","/order/admin?page=".concat(e,"&limit=10"))}function c(e){return Object(n.a)("get","/order/appointment/".concat(e))}},779:function(e,t,a){},786:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a(29),r=a(30),c=a(32),i=a(31),l=a(33),s=a(0),o=a.n(s),u=a(1085),d=a(854),m=a(152),p=function(e){function t(){return Object(n.a)(this,t),Object(c.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.columns,a=e.dataSource,n=e.current,r=e.total,c=e.onChangePage;return console.log("total",r),o.a.createElement("div",{style:{marginTop:"16px"}},o.a.createElement(u.a,{bordered:!0,dataSource:a,columns:t,pagination:!1,rowKey:m.c,size:"small"}),o.a.createElement("div",{className:"clearfix"},o.a.createElement(d.a,{current:n,total:r,onChange:c,style:{float:"right",marginTop:"16px"}})))}}]),t}(o.a.Component)}}]);
//# sourceMappingURL=12.0b25be18.chunk.js.map