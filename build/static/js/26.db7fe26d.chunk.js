(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[26,41],{379:function(e,t,n){"use strict";n.r(t),n.d(t,"getLabels",(function(){return a})),n.d(t,"addLabels",(function(){return o})),n.d(t,"deleteLabels",(function(){return i}));var r=n(68);function a(e){return Object(r.a)("get","/tag?type=".concat(e))}function o(e){return Object(r.a)("post","/tag",e)}function i(e){return Object(r.a)("delete","/tag/".concat(e))}},397:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var r=n(29),a=n(30),o=n(32),i=n(31),c=n(33),l=n(0),s=n.n(l),u=n(100),p=n(192),f=n(43),b=n(824),m=n(853),y=n(11),v=n(379),d=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,c=new Array(a),l=0;l<a;l++)c[l]=arguments[l];return(n=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(c)))).state={data:[]},n.getPageData=function(){Object(v.getLabels)(n.props.activeKey).then((function(e){1===e.status&&n.setState({data:e.data})})).catch((function(e){console.log(e)}))},n.confirm=function(e){return function(){Object(v.deleteLabels)(e).then((function(t){if(1!==t.status)u.a.error("\u5220\u9664\u5931\u8d25");else{var r=n.state.data.filter((function(t){return t.id!==e}));n.setState({data:r})}})).catch((function(e){console.log(e)}))}},n.onChange=function(e){n.value=e.target.value},n.addLabel=function(){n.value?Object(v.addLabels)({name:n.value,type:n.props.activeKey}).then((function(e){1!==e.status?u.a.error("\u6dfb\u52a0\u5931\u8d25"):n.getPageData()})).catch((function(e){console.log(e)})):u.a.error("\u8bf7\u8f93\u5165\u6807\u7b7e\u5185\u5bb9")},n}return Object(c.a)(t,e),Object(a.a)(t,[{key:"componentDidMount",value:function(){this.getPageData()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("div",{style:{marginBottom:"16px"}},s.a.createElement(p.a,{onChange:this.onChange,placeholder:"\u8bf7\u8f93\u5165\u6807\u7b7e",style:{width:"260px",marginRight:"16px"}}),s.a.createElement(f.a,{type:"primary",onClick:this.addLabel},"\u6dfb\u52a0")),s.a.createElement(b.a,null),this.state.data.map((function(t){return s.a.createElement(m.a,{key:t.id,title:"\u786e\u5b9a\u5220\u9664?",onConfirm:e.confirm(t.id),okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88"},s.a.createElement(f.a,{type:"primary",style:{marginRight:"8px"}},t.name,s.a.createElement(y.a,{type:"close-circle"})))})))}}]),t}(s.a.Component)},824:function(e,t,n){"use strict";var r=n(0),a=n(3),o=n.n(a),i=n(110);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};t.a=function(e){return r.createElement(i.a,null,(function(t){var n,a=t.getPrefixCls,i=e.prefixCls,u=e.type,p=void 0===u?"horizontal":u,f=e.orientation,b=void 0===f?"center":f,m=e.className,y=e.children,v=e.dashed,d=s(e,["prefixCls","type","orientation","className","children","dashed"]),h=a("divider",i),g=b.length>0?"-".concat(b):b,O=o()(m,h,"".concat(h,"-").concat(p),(l(n={},"".concat(h,"-with-text").concat(g),y),l(n,"".concat(h,"-dashed"),!!v),n));return r.createElement("div",c({className:O},d,{role:"separator"}),y&&r.createElement("span",{className:"".concat(h,"-inner-text")},y))}))}},853:function(e,t,n){"use strict";var r=n(0),a=n(22),o=n(276),i=n(11),c=n(43),l=n(85),s=n(128),u=n(110);function p(e){return(p="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},h=function(e){function t(e){var n,a,i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,i=m(t).call(this,e),(n=!i||"object"!==p(i)&&"function"!==typeof i?y(a):i).onConfirm=function(e){n.setVisible(!1,e);var t=n.props.onConfirm;t&&t.call(y(n),e)},n.onCancel=function(e){n.setVisible(!1,e);var t=n.props.onCancel;t&&t.call(y(n),e)},n.onVisibleChange=function(e){n.props.disabled||n.setVisible(e)},n.saveTooltip=function(e){n.tooltip=e},n.renderOverlay=function(e,t){var a=n.props,o=a.okButtonProps,i=a.cancelButtonProps,l=a.title,s=a.cancelText,u=a.okText,p=a.okType,b=a.icon;return r.createElement("div",null,r.createElement("div",{className:"".concat(e,"-inner-content")},r.createElement("div",{className:"".concat(e,"-message")},b,r.createElement("div",{className:"".concat(e,"-message-title")},l)),r.createElement("div",{className:"".concat(e,"-buttons")},r.createElement(c.a,f({onClick:n.onCancel,size:"small"},i),s||t.cancelText),r.createElement(c.a,f({onClick:n.onConfirm,type:p,size:"small"},o),u||t.okText))))},n.renderConfirm=function(e){var t=e.getPrefixCls,a=n.props,i=a.prefixCls,c=a.placement,u=d(a,["prefixCls","placement"]),p=t("popover",i),b=r.createElement(l.a,{componentName:"Popconfirm",defaultLocale:s.a.Popconfirm},(function(e){return n.renderOverlay(p,e)}));return r.createElement(o.a,f({},u,{prefixCls:p,placement:c,onVisibleChange:n.onVisibleChange,visible:n.state.visible,overlay:b,ref:n.saveTooltip}))},n.state={visible:e.visible},n}var n,a,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,e),n=t,i=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:"defaultVisible"in e?{visible:e.defaultVisible}:null}}],(a=[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"setVisible",value:function(e,t){var n=this.props;"visible"in n||this.setState({visible:e});var r=n.onVisibleChange;r&&r(e,t)}},{key:"render",value:function(){return r.createElement(u.a,null,this.renderConfirm)}}])&&b(n.prototype,a),i&&b(n,i),t}(r.Component);h.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:r.createElement(i.a,{type:"exclamation-circle",theme:"filled"}),disabled:!1},Object(a.polyfill)(h),t.a=h}}]);
//# sourceMappingURL=26.db7fe26d.chunk.js.map