(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[18,26,41],{219:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return y}));var a=n(29),r=n(30),o=n(32),i=n(31),c=n(33),l=n(0),s=n.n(l),u=n(784),f=n(397),p=u.a.TabPane,y=function(e){function t(){var e,n;Object(a.a)(this,t);for(var r=arguments.length,c=new Array(r),l=0;l<r;l++)c[l]=arguments[l];return(n=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(c)))).state={activeKey:"\u5065\u5eb7\u81ea\u8bca"},n.onChange=function(e){n.setState({activeKey:e})},n}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(u.a,{activeKey:this.state.activeKey,onChange:this.onChange},s.a.createElement(p,{tab:"\u5065\u5eb7\u81ea\u8bca",key:"\u5065\u5eb7\u81ea\u8bca"},s.a.createElement(f.default,{activeKey:this.state.activeKey})),s.a.createElement(p,{tab:"\u5e38\u89c1\u75be\u75c5",key:"\u5e38\u89c1\u75be\u75c5"},s.a.createElement(f.default,{activeKey:this.state.activeKey})),s.a.createElement(p,{tab:"\u5065\u5eb7\u5546\u57ce",key:"\u5065\u5eb7\u5546\u57ce"},s.a.createElement(f.default,{activeKey:this.state.activeKey})),s.a.createElement(p,{tab:"\u533b\u9662",key:"\u533b\u9662"},s.a.createElement(f.default,{activeKey:this.state.activeKey})),s.a.createElement(p,{tab:"\u540d\u5e08\u8bb2\u5802",key:"\u540d\u5e08\u8bb2\u5802"},s.a.createElement(f.default,{activeKey:this.state.activeKey})),s.a.createElement(p,{tab:"\u8425\u517b\u9910",key:"\u8425\u517b\u9910"},s.a.createElement(f.default,{activeKey:this.state.activeKey})),s.a.createElement(p,{tab:"\u65b0\u95fb",key:"\u65b0\u95fb"},s.a.createElement(f.default,{activeKey:this.state.activeKey}))))}}]),t}(s.a.Component)},379:function(e,t,n){"use strict";n.r(t),n.d(t,"getLabels",(function(){return r})),n.d(t,"addLabels",(function(){return o})),n.d(t,"deleteLabels",(function(){return i}));var a=n(68);function r(e){return Object(a.a)("get","/tag?type=".concat(e))}function o(e){return Object(a.a)("post","/tag",e)}function i(e){return Object(a.a)("delete","/tag/".concat(e))}},397:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var a=n(29),r=n(30),o=n(32),i=n(31),c=n(33),l=n(0),s=n.n(l),u=n(100),f=n(192),p=n(43),y=n(824),m=n(853),b=n(11),v=n(379),d=function(e){function t(){var e,n;Object(a.a)(this,t);for(var r=arguments.length,c=new Array(r),l=0;l<r;l++)c[l]=arguments[l];return(n=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(c)))).state={data:[]},n.getPageData=function(){Object(v.getLabels)(n.props.activeKey).then((function(e){1===e.status&&n.setState({data:e.data})})).catch((function(e){console.log(e)}))},n.confirm=function(e){return function(){Object(v.deleteLabels)(e).then((function(t){if(1!==t.status)u.a.error("\u5220\u9664\u5931\u8d25");else{var a=n.state.data.filter((function(t){return t.id!==e}));n.setState({data:a})}})).catch((function(e){console.log(e)}))}},n.onChange=function(e){n.value=e.target.value},n.addLabel=function(){n.value?Object(v.addLabels)({name:n.value,type:n.props.activeKey}).then((function(e){1!==e.status?u.a.error("\u6dfb\u52a0\u5931\u8d25"):n.getPageData()})).catch((function(e){console.log(e)})):u.a.error("\u8bf7\u8f93\u5165\u6807\u7b7e\u5185\u5bb9")},n}return Object(c.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getPageData()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("div",{style:{marginBottom:"16px"}},s.a.createElement(f.a,{onChange:this.onChange,placeholder:"\u8bf7\u8f93\u5165\u6807\u7b7e",style:{width:"260px",marginRight:"16px"}}),s.a.createElement(p.a,{type:"primary",onClick:this.addLabel},"\u6dfb\u52a0")),s.a.createElement(y.a,null),this.state.data.map((function(t){return s.a.createElement(m.a,{key:t.id,title:"\u786e\u5b9a\u5220\u9664?",onConfirm:e.confirm(t.id),okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88"},s.a.createElement(p.a,{type:"primary",style:{marginRight:"8px"}},t.name,s.a.createElement(b.a,{type:"close-circle"})))})))}}]),t}(s.a.Component)},824:function(e,t,n){"use strict";var a=n(0),r=n(3),o=n.n(r),i=n(110);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n};t.a=function(e){return a.createElement(i.a,null,(function(t){var n,r=t.getPrefixCls,i=e.prefixCls,u=e.type,f=void 0===u?"horizontal":u,p=e.orientation,y=void 0===p?"center":p,m=e.className,b=e.children,v=e.dashed,d=s(e,["prefixCls","type","orientation","className","children","dashed"]),h=r("divider",i),g=y.length>0?"-".concat(y):y,O=o()(m,h,"".concat(h,"-").concat(f),(l(n={},"".concat(h,"-with-text").concat(g),b),l(n,"".concat(h,"-dashed"),!!v),n));return a.createElement("div",c({className:O},d,{role:"separator"}),b&&a.createElement("span",{className:"".concat(h,"-inner-text")},b))}))}},853:function(e,t,n){"use strict";var a=n(0),r=n(22),o=n(276),i=n(11),c=n(43),l=n(85),s=n(128),u=n(110);function f(e){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function y(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},h=function(e){function t(e){var n,r,i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,i=m(t).call(this,e),(n=!i||"object"!==f(i)&&"function"!==typeof i?b(r):i).onConfirm=function(e){n.setVisible(!1,e);var t=n.props.onConfirm;t&&t.call(b(n),e)},n.onCancel=function(e){n.setVisible(!1,e);var t=n.props.onCancel;t&&t.call(b(n),e)},n.onVisibleChange=function(e){n.props.disabled||n.setVisible(e)},n.saveTooltip=function(e){n.tooltip=e},n.renderOverlay=function(e,t){var r=n.props,o=r.okButtonProps,i=r.cancelButtonProps,l=r.title,s=r.cancelText,u=r.okText,f=r.okType,y=r.icon;return a.createElement("div",null,a.createElement("div",{className:"".concat(e,"-inner-content")},a.createElement("div",{className:"".concat(e,"-message")},y,a.createElement("div",{className:"".concat(e,"-message-title")},l)),a.createElement("div",{className:"".concat(e,"-buttons")},a.createElement(c.a,p({onClick:n.onCancel,size:"small"},i),s||t.cancelText),a.createElement(c.a,p({onClick:n.onConfirm,type:f,size:"small"},o),u||t.okText))))},n.renderConfirm=function(e){var t=e.getPrefixCls,r=n.props,i=r.prefixCls,c=r.placement,u=d(r,["prefixCls","placement"]),f=t("popover",i),y=a.createElement(l.a,{componentName:"Popconfirm",defaultLocale:s.a.Popconfirm},(function(e){return n.renderOverlay(f,e)}));return a.createElement(o.a,p({},u,{prefixCls:f,placement:c,onVisibleChange:n.onVisibleChange,visible:n.state.visible,overlay:y,ref:n.saveTooltip}))},n.state={visible:e.visible},n}var n,r,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,e),n=t,i=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:"defaultVisible"in e?{visible:e.defaultVisible}:null}}],(r=[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"setVisible",value:function(e,t){var n=this.props;"visible"in n||this.setState({visible:e});var a=n.onVisibleChange;a&&a(e,t)}},{key:"render",value:function(){return a.createElement(u.a,null,this.renderConfirm)}}])&&y(n.prototype,r),i&&y(n,i),t}(a.Component);h.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:a.createElement(i.a,{type:"exclamation-circle",theme:"filled"}),disabled:!1},Object(r.polyfill)(h),t.a=h}}]);
//# sourceMappingURL=18.547b1a45.chunk.js.map