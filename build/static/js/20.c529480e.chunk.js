(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[20,45],{220:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return g}));var a=n(101),r=n(29),i=n(30),c=n(32),o=n(31),l=n(33),s=n(0),u=n.n(s),d=n(791),p=n(793),h=n(401),g=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(o.a)(t).call(this,e))).getPageData=function(){Object(h.getHospitalList)(n.state.current).then((function(e){if(1!==e.status)n.setState({dataSource:[]});else{var t=e.data.map((function(e){return e.operation?Object(a.a)({},e,{},e.operation):e}));n.setState({dataSource:t})}})).catch((function(e){console.log(e)}))},n.onChangePage=function(e){n.setState({current:e},(function(){n.getPageData()}))},n.showPreview=function(e,t){return function(){n.setState({previewVisible:!0,previewImage:e,renderMode:t})}},n.previewHandleCancel=function(){n.setState({previewVisible:!1,previewImage:""})},n.showContent=function(e){return function(){}},n.state={selectRow:{},previewVisible:!1,previewImage:"",current:1,total:1,dataSource:[],renderMode:""},n}return Object(l.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getPageData()}},{key:"render",value:function(){var e=this,t=[{title:"\u533b\u9662\u540d\u79f0",dataIndex:"name",key:"name",align:"center"},{title:"\u533b\u9662\u7b80\u4ecb",dataIndex:"content",key:"content",align:"center",render:function(t){return u.a.createElement("span",{className:"canClick",onClick:e.showPreview(t,"draft")},"\u8be6\u60c5")}},{title:"\u7279\u8272\u79d1\u5ba4",dataIndex:"department",key:"department",align:"center",render:function(e){return e?e.join("\u3001"):null}},{title:"\u6807\u7b7e",dataIndex:"tag",key:"tag",align:"center",render:function(e){return e?e.join("\u3001"):null}},{title:"\u8054\u7cfb\u7535\u8bdd",dataIndex:"phone",key:"phone",align:"center"},{title:"\u533b\u9662logo",dataIndex:"logo",key:"logo",align:"center",render:function(t){return u.a.createElement("img",{onClick:e.showPreview(t),src:t,alt:"",style:{height:"20px"},className:"canClick"})}},{title:"\u533b\u9662\u5927\u56fe",dataIndex:"pic",key:"pic",align:"center",render:function(t){return u.a.createElement("img",{onClick:e.showPreview(t),src:t,alt:"",style:{height:"20px"},className:"canClick"})}},{title:"\u8be6\u7ec6\u5730\u5740",dataIndex:"address",key:"address",align:"center"},{title:"\u72b6\u6001",dataIndex:"is_show",key:"is_show",align:"center",render:function(e){return e?"\u5df2\u4e0a\u7ebf":"\u672a\u4e0a\u7ebf"}}];return u.a.createElement("div",null,u.a.createElement(d.a,{current:this.state.current,total:this.state.total,columns:t,dataSource:this.state.dataSource,onChangePage:this.onChangePage}),u.a.createElement(p.a,{previewVisible:this.state.previewVisible,previewImage:this.state.previewImage,handleCancel:this.previewHandleCancel,renderMode:this.state.renderMode}))}}]),t}(u.a.Component)},401:function(e,t,n){"use strict";n.r(t),n.d(t,"getHospitalList",(function(){return r}));var a=n(69);function r(e){return Object(a.a)("get","/hospital/admin?page=".concat(e,"&limit=10"))}},791:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var a=n(29),r=n(30),i=n(32),c=n(31),o=n(33),l=n(0),s=n.n(l),u=n(1092),d=n(861),p=n(152),h=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.columns,n=e.dataSource,a=e.current,r=e.total,i=e.onChangePage;return console.log("total",r),s.a.createElement("div",{style:{marginTop:"16px"}},s.a.createElement(u.a,{bordered:!0,dataSource:n,columns:t,pagination:!1,rowKey:p.c,size:"small"}),s.a.createElement("div",{className:"clearfix"},s.a.createElement(d.a,{current:a,total:r,onChange:i,style:{float:"right",marginTop:"16px"}})))}}]),t}(s.a.Component)},793:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var a=n(29),r=n(30),i=n(32),c=n(31),o=n(33),l=n(0),s=n.n(l),u=n(782),d=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.previewVisible,n=e.previewImage,a=e.handleCancel,r=e.renderMode;return console.log("renderMode",r),s.a.createElement(u.a,{visible:t,footer:null,onCancel:a,title:"\u9884\u89c8",width:1024},s.a.createElement("div",{style:{height:"800px"},className:"clearfix"},"draft"===r?s.a.createElement("div",{dangerouslySetInnerHTML:{__html:n}}):s.a.createElement("img",{alt:"example",style:{width:"100%",height:"100%"},src:n})))}}]),t}(s.a.Component)}}]);
//# sourceMappingURL=20.c529480e.chunk.js.map