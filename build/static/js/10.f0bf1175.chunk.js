(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[10,14,34],{194:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return k}));var n=a(805),r=a(101),i=a(29),l=a(30),o=a(32),c=a(31),s=a(33),u=a(0),d=a.n(u),p=a(100),m=a(43),f=a(858),g=a(791),h=a(794),b=a(793),y=a(376),v={class:"\u540d\u5e08\u8bb2\u5802",diagnosis:"\u5065\u5eb7\u81ea\u8bca",disease:"\u5e38\u89c1\u75be\u75c5",meal:"\u8425\u517b\u9910"},k=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(c.a)(t).call(this,e))).getPageData=function(){Object(y.getArticleList)(a.props.type,a.state.current).then((function(e){1!==e.status?a.setState({dataSource:[]}):a.setState({dataSource:e.data,total:e.total})})).catch((function(e){console.log(e)}))},a.onChangePage=function(e){a.setState({current:e},(function(){a.getPageData()}))},a.openAdd=function(){a.setState({visible:!0,mode:"add",initData:{}})},a.openEdit=function(e){return function(){a.setState({visible:!0,mode:"edit",initData:e})}},a.onCancel=function(){a.setState({visible:!1,initData:{},mode:""})},a.onSubmit=function(e){if(console.log("v",e),e.logo){if("class"===a.props.type){if(!e.skilled)return void p.a.error("\u8bf7\u6dfb\u52a0\u64c5\u957f\u80fd\u529b");if(0===e.skilled.length)return void p.a.error("\u8bf7\u6dfb\u52a0\u64c5\u957f\u80fd\u529b")}"add"!==a.state.mode?a.editHandle(e):a.addHandle(e)}else p.a.error("\u8bf7\u4e0a\u4f20\u56fe\u7247")},a.addHandle=function(e){Object(y.addArticleList)(a.props.type,Object(r.a)({},e,{content:e.content.toHTML()})).then((function(e){if(1===e.status)return a.onCancel(),void a.getPageData();p.a.error("\u6dfb\u52a0\u5931\u8d25")})).catch((function(e){console.log(e)}))},a.editHandle=function(e){Object(y.editArticleList)(a.props.type,a.state.initData.id,Object(r.a)({},e,{content:e.content.toHTML()})).then((function(e){if(1===e.status)return a.onCancel(),void a.getPageData();p.a.error("\u4fee\u6539\u5931\u8d25")})).catch((function(e){console.log(e)}))},a.onDelete=function(e){return function(){Object(y.deleteArticleList)(a.props.type,e).then((function(e){1!==e.status?p.a.error("\u5220\u9664\u5931\u8d25"):a.getPageData()})).catch((function(e){console.log(e)}))}},a.showPreview=function(e,t){return function(){a.setState({previewVisible:!0,previewImage:e,renderMode:t})}},a.previewHandleCancel=function(){a.setState({previewVisible:!1,previewImage:""})},a.showContentPreview=function(e,t){return function(){a.setState({previewVisible:!0,renderMode:t}),Object(y.getArticleInfo)(a.props.type,e).then((function(e){1!==e.status?a.setState({previewVisible:!0,previewImage:"",renderMode:t}):a.setState({previewVisible:!0,previewImage:e.data.content,renderMode:t})})).catch((function(e){console.log(e)}))}},a.state={renderMode:"",previewVisible:!1,previewImage:"",mode:"",visible:!1,current:1,total:0,dataSource:[],initKeys:["logo","skilled"],formCfg:[{label:"\u6807\u9898",key:"name",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6807\u9898!"}],type:"input"},{label:"\u63cf\u8ff0",key:"desc",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u63cf\u8ff0!"}],type:"input"},{label:"\u6807\u7b7e",key:"tag",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6807\u7b7e!"}],type:"multipleSelect",selectOptions:[]},{label:"LOGO",key:"logo",rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20LOGO!"}],type:"upload"},{label:"\u6587\u7ae0\u5185\u5bb9",key:"content",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u540d\u79f0!"}],type:"braftEditor"}],initData:{}},a}return Object(s.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(y.getLabelList)(v[this.props.type]).then((function(t){if(1===t.status){var a=e.state.formCfg.map((function(e){return Object(r.a)({},e)}));a[2].selectOptions=t.data.map((function(e){return{value:e.name,text:e.name}})),e.setState({formCfg:a})}})).catch((function(e){console.log(e)})),this.getPageData()}},{key:"render",value:function(){var e=this,t=[{title:"\u6807\u9898",dataIndex:"name",key:"name",align:"center"},{title:"\u6807\u7b7e",dataIndex:"tag",key:"tag",align:"center",render:function(e){return e?e.join("\u3001"):null}},{title:"LOGO",dataIndex:"logo",key:"logo",align:"center",render:function(t){return d.a.createElement("img",{onClick:e.showPreview(t),src:t,alt:"",style:{height:"20px"},className:"canClick"})}},{title:"\u63cf\u8ff0",dataIndex:"desc",key:"desc",align:"center"},{title:"\u6587\u7ae0\u5185\u5bb9",dataIndex:"content",key:"content",align:"center",render:function(t,a){return d.a.createElement("span",{className:"canClick",onClick:e.showContentPreview(a.id,"draft")},"\u8be6\u60c5")}},{title:"\u64cd\u4f5c",dataIndex:"action",key:"action",align:"center",width:200,render:function(t,a){return d.a.createElement("span",null,d.a.createElement(m.a,{type:"primary",style:{marginRight:"16px"},onClick:e.openEdit(a)},"\u4fee\u6539"),d.a.createElement(f.a,{title:"\u786e\u5b9a\u5220\u9664\uff1f",onConfirm:e.onDelete(a.id)},d.a.createElement(m.a,{type:"danger"},"\u5220\u9664")))}}],a=t,r=this.state.formCfg;return"class"===this.props.type&&(a=[].concat([{title:"\u533b\u751f",dataIndex:"doctor",key:"doctor",align:"center"},{title:"\u64c5\u957f\u80fd\u529b",dataIndex:"skilled",key:"skilled",align:"center",render:function(e){return e?e.join("\u3001"):null}}],t),r=[].concat([{label:"\u533b\u751f",key:"doctor",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u533b\u751f!"}],type:"input"},{label:"\u64c5\u957f\u80fd\u529b",key:"skilled",rules:[{required:!0,message:"\u8bf7\u6dfb\u52a0\u64c5\u957f\u80fd\u529b!"}],type:"tagInput"}],Object(n.a)(this.state.formCfg))),d.a.createElement("div",null,d.a.createElement(m.a,{type:"primary",onClick:this.openAdd},"\u6dfb\u52a0"),d.a.createElement(g.a,{current:this.state.current,total:this.state.total,columns:a,dataSource:this.state.dataSource,onChangePage:this.onChangePage}),d.a.createElement(h.a,{title:"add"===this.state.mode?"\u6dfb\u52a0":"\u4fee\u6539",visible:this.state.visible,formCfg:r,initData:this.state.initData,onCancel:this.onCancel,onSubmit:this.onSubmit,width:1024,initKeys:this.state.initKeys}),d.a.createElement(b.a,{previewVisible:this.state.previewVisible,previewImage:this.state.previewImage,handleCancel:this.previewHandleCancel,renderMode:this.state.renderMode}))}}]),t}(d.a.Component)},206:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return d}));var n=a(29),r=a(30),i=a(32),l=a(31),o=a(33),c=a(0),s=a.n(c),u=a(194),d=function(e){function t(){return Object(n.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(u.default,{type:"meal"}))}}]),t}(s.a.Component)},376:function(e,t,a){"use strict";a.r(t),a.d(t,"getLabelList",(function(){return r})),a.d(t,"getArticleList",(function(){return i})),a.d(t,"getArticleInfo",(function(){return l})),a.d(t,"addArticleList",(function(){return o})),a.d(t,"editArticleList",(function(){return c})),a.d(t,"deleteArticleList",(function(){return s})),a.d(t,"getPlatformNewsList",(function(){return u})),a.d(t,"getNewsInfo",(function(){return d})),a.d(t,"getHospitalNewsList",(function(){return p})),a.d(t,"getHospitalList",(function(){return m})),a.d(t,"addNews",(function(){return f})),a.d(t,"editNews",(function(){return g})),a.d(t,"deleteNews",(function(){return h}));var n=a(69);function r(e){return Object(n.a)("get","/tag?type=".concat(e))}function i(e,t){return Object(n.a)("get","/".concat(e,"?page=").concat(t,"&limit=10"))}function l(e,t){return Object(n.a)("get","/".concat(e,"/").concat(t))}function o(e,t){return Object(n.a)("post","/".concat(e),t)}function c(e,t,a){return Object(n.a)("put","/".concat(e,"/").concat(t),a)}function s(e,t){return Object(n.a)("delete","/".concat(e,"/").concat(t))}function u(e){return Object(n.a)("get","/news?page=".concat(e,"&limit=10"))}function d(e){return Object(n.a)("get","/news/".concat(e))}function p(e){return Object(n.a)("get","/news/hospital?page=".concat(e,"&limit=10"))}function m(){return Object(n.a)("get","/hospital/hospitalAdmin?page=1&limit=1000")}function f(e){return Object(n.a)("post","/news",e)}function g(e,t){return Object(n.a)("put","/news/".concat(e),t)}function h(e){return Object(n.a)("delete","/news/".concat(e))}},791:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var n=a(29),r=a(30),i=a(32),l=a(31),o=a(33),c=a(0),s=a.n(c),u=a(1092),d=a(861),p=a(152),m=function(e){function t(){return Object(n.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.columns,a=e.dataSource,n=e.current,r=e.total,i=e.onChangePage;return console.log("total",r),s.a.createElement("div",{style:{marginTop:"16px"}},s.a.createElement(u.a,{bordered:!0,dataSource:a,columns:t,pagination:!1,rowKey:p.c,size:"small"}),s.a.createElement("div",{className:"clearfix"},s.a.createElement(d.a,{current:n,total:r,onChange:i,style:{float:"right",marginTop:"16px"}})))}}]),t}(s.a.Component)},793:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var n=a(29),r=a(30),i=a(32),l=a(31),o=a(33),c=a(0),s=a.n(c),u=a(782),d=function(e){function t(){return Object(n.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.previewVisible,a=e.previewImage,n=e.handleCancel,r=e.renderMode;return console.log("renderMode",r),s.a.createElement(u.a,{visible:t,footer:null,onCancel:n,title:"\u9884\u89c8",width:1024},s.a.createElement("div",{className:"clearfix"},"draft"===r?s.a.createElement("div",{style:{minHeight:"700px"},dangerouslySetInnerHTML:{__html:a}}):s.a.createElement("img",{alt:"example",style:{width:"100%",height:"100%"},src:a})))}}]),t}(s.a.Component)},794:function(e,t,a){"use strict";var n,r,i=a(277),l=a(101),o=a(29),c=a(30),s=a(32),u=a(31),d=a(33),p=(a(799),a(0)),m=a.n(p),f=a(908),g=a(11),h=a(77),b=a(100),y=a(1094),v=a(192),k=a(1091),O=a(1095),E=a(1093),j=a(43),w=a(858),C=a(782),I=a(800),V=a.n(I),S=a(152),x=a(195),D=a(16),L=f.a.Option,P={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}},M=m.a.createElement("div",null,m.a.createElement(g.a,{type:"plus"}),m.a.createElement("div",{className:"ant-upload-text"},"Upload")),A={label:"label",value:"value",children:"children"};t.a=h.a.create({name:"form_modal"})((r=n=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={otherValues:{}},a.mapInit2=function(){setTimeout((function(){if(document.getElementById("map-containerpoi")){var e=new AMap.Map("map-containerpoi",{zoom:10});AMapUI.loadUI(["misc/PoiPicker"],(function(t){var n=new t({input:"pickerInput1"}),r=new AMap.Marker;n.on("poiPicked",(function(t){console.log(t.item.location),r.setMap(e),r.setPosition(t.item.location),a.setState({otherValues:Object(l.a)({},a.state.otherValues,{longitude:t.item.location.lng,latitude:t.item.location.lat})})}))}))}else console.log("not find")}))},a.handleChange=function(e){return function(t){console.log("info",t),"done"===t.file.status&&(1===t.file.response.status?(b.a.success("\u4e0a\u4f20\u6210\u529f"),a.setState({otherValues:Object(l.a)({},a.state.otherValues,Object(i.a)({},e,t.file.response.data[0]))})):b.a.error("\u4e0a\u4f20\u5931\u8d25")),"error "===t.file.status&&b.a.error("\u4e0a\u4f20\u5931\u8d25")}},a.onCreate=function(){a.props.form.validateFields((function(e,t){e||(console.log(t,a.state.otherValues),console.log(a.state.otherValues),a.props.onSubmit(Object(l.a)({},t,{},a.state.otherValues)))}))},a.onChange=function(e){a.value=e.target.value},a.addLabel=function(e){return function(){if(a.value){var t=a.state.otherValues[e]?a.state.otherValues[e].slice():[];t.push(a.value),a.setState({otherValues:Object(l.a)({},a.state.otherValues,Object(i.a)({},e,t))})}else b.a.error("\u8bf7\u8f93\u5165\u5185\u5bb9")}},a.confirm=function(e,t){return function(){var n=a.state.otherValues[t].filter((function(t){return t!==e}));a.setState({otherValues:Object(l.a)({},a.state.otherValues,Object(i.a)({},t,n))})}},a.renderFormItem=function(e){var t=D.a.getState().appStatus,n=a.props.form.getFieldDecorator;switch(e.type){case"timePicker":return m.a.createElement(h.a.Item,{key:e.key,label:e.label},n(e.key,{rules:e.rules,initialValue:a.props.initData[e.key]})(m.a.createElement(y.a,{format:"HH:mm"})));case"input":return m.a.createElement(h.a.Item,{key:e.key,label:e.label},n(e.key,{rules:e.rules,initialValue:a.props.initData[e.key]})(m.a.createElement(v.a,null)));case"treeSelect":return m.a.createElement(h.a.Item,{key:e.key,label:e.label},n(e.key,{rules:e.rules,initialValue:a.props.initData[e.key]})(m.a.createElement(k.a,{treeData:e.selectOptions,placeholder:"\u8bf7\u9009\u62e9",allowClear:!0})));case"select":return m.a.createElement(h.a.Item,{key:e.key,label:e.label},n(e.key,{rules:e.rules,initialValue:a.props.initData[e.key]})(m.a.createElement(f.a,{placeholder:"\u8bf7\u9009\u62e9"},e.selectOptions.map((function(e){return m.a.createElement(L,{key:e.value,value:e.value},e.text)})))));case"cascader":return m.a.createElement(h.a.Item,{key:e.key,label:e.label},n(e.key,{rules:e.rules,initialValue:a.props.initData[e.key]})(m.a.createElement(O.a,{fieldNames:e.fieldNames||A,options:e.selectOptions,placeholder:"\u8bf7\u9009\u62e9"})));case"upload":return m.a.createElement(h.a.Item,{required:!0,key:e.key,label:e.label},m.a.createElement(E.a,{className:"avatar-uploader",action:"".concat(x.a,"/upload"),onChange:a.handleChange(e.key),headers:{AccessToken:t.token},showUploadList:!1,beforeUpload:S.a,listType:"picture-card"},a.state.otherValues[e.key]?m.a.createElement("img",{alt:"",src:a.state.otherValues[e.key],style:{width:"100%"}}):M));case"multipleSelect":return m.a.createElement(h.a.Item,{key:e.key,label:e.label},n(e.key,{rules:e.rules,initialValue:a.props.initData[e.key]})(m.a.createElement(f.a,{mode:"multiple",placeholder:"\u8bf7\u9009\u62e9"},e.selectOptions.map((function(e){return m.a.createElement(L,{key:e.value,value:e.value},e.text)})))));case"longitudelatitudepoi":return m.a.createElement("div",{key:"longitudelatitudepoi",style:{marginTop:"16px",marginBottom:"16px"}},m.a.createElement(h.a.Item,{label:"\u7ecf\u7eac\u5ea6"},a.state.otherValues.longitude," ,",a.state.otherValues.latitude),m.a.createElement("div",{id:"map-containerpoi"}),m.a.createElement("div",{id:"pickerBox"},m.a.createElement("input",{id:"pickerInput1",placeholder:"\u8f93\u5165\u5173\u952e\u5b57\u9009\u53d6\u5730\u70b9"})));case"braftEditor":return m.a.createElement(h.a.Item,{key:e.key,label:e.label},n(e.key,{initialValue:V.a.createEditorState(a.props.initData[e.key]),validateTrigger:"onBlur",rules:[{required:!0,validator:function(e,t,a){t.isEmpty()?a("\u8bf7\u8f93\u5165\u6b63\u6587\u5185\u5bb9"):a()}}]})(m.a.createElement(V.a,{className:"my-editor",placeholder:"\u8bf7\u8f93\u5165\u6b63\u6587\u5185\u5bb9"})));case"tagInput":var r=a.state.otherValues[e.key]||[];return m.a.createElement(h.a.Item,{required:!0,key:e.key,label:e.label},m.a.createElement(v.a,{onChange:a.onChange,style:{width:"200px",marginRight:"16px"}}),m.a.createElement(j.a,{onClick:a.addLabel(e.key),type:"primary"},"\u6dfb\u52a0"),m.a.createElement("div",{style:{marginTop:"8px"}},r.map((function(t){return m.a.createElement(w.a,{key:t,title:"\u786e\u5b9a\u5220\u9664?",onConfirm:a.confirm(t,e.key),okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88"},m.a.createElement(j.a,{type:"primary",style:{marginRight:"8px"}},t,m.a.createElement(g.a,{type:"close-circle"})))}))));case"default":return m.a.createElement(h.a.Item,{key:e.key,label:e.label},e.defaultValue)}},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e){if(this.props.visible!==e.visible&&!e.visible){for(var t={},a=this.props.initKeys,n=0;n<a.length;n+=1)t[a[n]]=this.props.initData[a[n]];this.setState({otherValues:Object(l.a)({latitude:this.props.initData.latitude,longitude:this.props.initData.longitude,pic:this.props.initData.pic},t)}),this.mapInit2()}}},{key:"render",value:function(){var e=this.props,t=e.visible,a=e.onCancel,n=e.title,r=e.formCfg,i=e.width;return m.a.createElement(C.a,{visible:t,title:n,onCancel:a,onOk:this.onCreate,width:i},t&&m.a.createElement(h.a,Object.assign({},P,{layout:"vertical"}),r.map(this.renderFormItem)))}}]),t}(m.a.Component),n.defaultProps={initKeys:[]},r))}}]);
//# sourceMappingURL=10.f0bf1175.chunk.js.map