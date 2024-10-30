!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).EarthMonitor=t()}(this,(function(){"use strict";var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};var t=function(){return t=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},t.apply(this,arguments)};function r(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function s(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))}function n(e,t){var r,n,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},a=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return a.next=s(0),a.throw=s(1),a.return=s(2),"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(c){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}}"function"==typeof SuppressedError&&SuppressedError;var o=function(){function e(){this._evt={}}return e.prototype.$on=function(e,t){this._evt[e]=this._evt[e]||[],this._evt[e].push(t)},e.prototype.$emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=this._evt[e]||[];n.length&&n.forEach((function(e){e.apply(null,t)}))},e.prototype.$off=function(e,t){var r=this._evt[e]||[];if(t){var n=r.findIndex(t);r.splice(n,1)}else this._evt[e]=[]},e.prototype.$remove=function(){this._evt={}},e}(),i={getTypeString:function(e){return Object.prototype.toString.call(e).toLowerCase()},isString:function(e){return"[object string]"===this.getTypeString(e)},isJsonString:function(e){try{return"object"==typeof JSON.parse(e)}catch(e){return!1}},isNumber:function(e){return"[object number]"===this.getTypeString(e)},isBoolean:function(e){return"[object boolean]"===this.getTypeString(e)},isArray:function(e){return"[object array]"===this.getTypeString(e)},isNull:function(e){return"[object null]"===this.getTypeString(e)},isUndefined:function(e){return"[object undefined]"===this.getTypeString(e)},isFunction:function(e){var t=this.getTypeString(e);return"[object function]"===t||"[object asyncfunction]"===t||"[object promise]"===t},isObject:function(e){return"[object object]"===this.getTypeString(e)},isError:function(e){var t=this.getTypeString(e);return"[object error]"===t||"[object errorevent]"===t},isRegexp:function(e){return"[object regexp]"===this.getTypeString(e)}},a=navigator.userAgent.toLowerCase();var s="load",c="windowError",u="hashchange",p="historyStatechange",f="popstate",l="promiseError",h=function(e){var t=!1;function r(e,n){if(!e)return!1;for(var o=["head","meta","script","style","title"],i=[].slice.call(e.children||[]).filter((function(e){return o.indexOf(e.tagName.toLowerCase())<0})),a=0;a<i.length;a++){var s=i[a],c=s.getBoundingClientRect(),u=c.width,p=c.height;if((n=u>0&&p>0?n+1:n)>0)return t=!0;1===s.nodeType&&o.indexOf(s.tagName.toLowerCase())<0&&r(s,n)}return t}e.$on(s,(function(){var t=e.options,n=t.domId,o=t.whiteTime;setTimeout((function(){r(document.querySelector("#".concat(n))||document.querySelector(".".concat(n)),0)||e.report({type:"blankScreen"})}),1e3*o)}))},d=function(e){e.$on(c,(function(t){(t.target||{}).tagName||e.reportError(t)})),e.$on(l,(function(t){i.isError(t.reason)&&e.reportError(t.reason)})),e.$on(s,(function(){window.Vue&&e.captureVueError()}))},y=function(){return(new Date).getTime()},g=function(e){var t=(window.performance||window.webkitPerformance||window.msPerformance||window.mozPerformance).timing||{};r(void 0,void 0,void 0,(function(){var r,o,i,a,s,c;return n(this,(function(n){switch(n.label){case 0:return r=e.options,o=r.client,i=r.ua,a=r.system,s=r.device,c={type:"openPage",client:o,ua:i,system:a,device:s,occurTime:t.fetchStart||y()},[4,e.report(c)];case 1:return n.sent(),[2]}}))}))},v=function(e){var t=history[e];history[e]=function(){var e=[].slice.call(arguments),r=new CustomEvent(p),n=t.apply(this,e);return window.dispatchEvent(r),n}},w=function(e){var t=e.options.spa,r=void 0===t||t,n=function(){try{for(var e=0,t=[{reg:/edge\/([\d.]+)/,name:"Edge"},{reg:/rv:([\d.]+)\) like gecko/,name:"IE"},{reg:/msie ([\d.]+)/,name:"IE"},{reg:/firefox\/([\d.]+)/,name:"Firefox"},{reg:/chrome\/([\d.]+)/,name:"Chrome"},{reg:/opera.([\d.]+)/,name:"Opera"},{reg:/version\/([\d.]+).*safari/,name:"Safari"},{reg:/AppleWebKit\/([\d.]+).*mobile.*/i,name:"webkit"}];e<t.length;e++){var r=t[e],n=r.reg,o=r.name,i=a.match(n);if(i&&i[1])return"".concat(o," ").concat(i[1])}}catch(e){console.log(e)}return"unknow"}().toLowerCase(),o=window.history.pushState?"history":"hash";e.$on(s,(function(){("chrome"!==n&&"safari"!==n||"history"!==o)&&e.report({type:"pageView"})})),r&&("hash"===o&&e.$on(u,(function(){e.report({type:"pageView"})})),"history"===o&&e.$on(f,(function(){e.report({type:"pageView"})})),v("pushState"),v("replaceState"),e.$on(p,(function(){e.report({type:"pageView"})})))},m=function(e){"undefined"!=typeof window&&function(e){var r=window.fetch;window.fetch=function(){var n=Array.from(arguments),o=n&&n[0]&&n[0].split("?")||[],i=y(),a={requestUrl:o[0]||"",requestUrlParams:o[1]||"",requestType:((n[1]||{}).method||"get").toUpperCase()};return r.apply(this,n).then((function(r){try{if(r){var n=r.clone();n.status,n.text().then((function(r){(a=t(t({},a),{duration:y()-i,requestId:n.headers.get("requestid")||"",requestCode:n.status,type:"apiRequest"})).requestUrl&&e.report(a)}))}}catch(t){e.reportError(t)}})).catch((function(t){e.reportError(t)}))}}(e)},b=function(e){"undefined"!=typeof window&&function(e){var t=window.XMLHttpRequest.prototype,r=t.open,n=t.setRequestHeader,o=t.send;t.open=function(e,t){this.__reqData__={method:e,url:t||"",start:y(),headers:{}};var n=Array.from(arguments);r.apply(this,n)},t.setRequestHeader=function(e,t){this.__reqData__&&(this.__reqData__.headers[e]=t);var r=Array.from(arguments);n.apply(this,r)},t.send=function(){var t=this.onreadystatechange||function(){};this.onreadystatechange=function(){var r,n,o=Array.from(arguments);if(t.apply(this,o),4===this.readyState&&this.__reqData__)try{var i=(r=this.getAllResponseHeaders().trim().split(/[\r\n]+/),n={},r.forEach((function(e){var t=e.split(": ");t.length&&(n[t[0]]=t[1])})),n||{}),a=this.__reqData__.url.split("?")||[],s={requestId:i.requestid||"",duration:y()-this.__reqData__.startTime,requestUrl:a[0]||"",requestUrlParams:a[1]||"",requestType:this.__reqData__.method.toUpperCase(),requestCode:this.status,type:"apiRequest"};if(!s.requestUrl)return;e.report(s)}catch(t){e.reportError(t)}};var r=Array.from(arguments);o.apply(this,r)}}(e)},_=function(e){e.$on(c,(function(t){(t.target||{}).tagName&&e.reportError(t)}))},E=function(e){var t=function(t){e.$emit(s,t)},r=function(t){e.$emit(c)},n=function(t){e.$emit(l)},o=function(){e.$emit(u)},i=function(){e.$emit(f)},a=function(){e.$emit(p)};window.addEventListener("load",t),window.addEventListener("error",r,!0),window.addEventListener("unhandledrejection",n),window.addEventListener("hashchange",o),window.addEventListener("popstate",i),window.addEventListener("historyStatechange",a),window.addEventListener("beforeunload",(function(){window.removeEventListener("load",t),window.removeEventListener("error",r,!0),window.removeEventListener("unhandledrejection",n),window.removeEventListener("hashchange",o),window.removeEventListener("popstate",i),window.removeEventListener("historyStatechange",a),e.$remove(),e.uninstall()}))};var S=function(o){function a(e){var t=o.call(this)||this;return t.startHooks=Array,t.options=e,t.beforeStart=null==e?void 0:e.beforeStart,t.beforeReport=null==e?void 0:e.beforeReport,t._isReady=!1,t._isCaptured=!1,t}return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}(a,o),a.prototype.start=function(){return r(this,void 0,void 0,(function(){var e,t,r;return n(this,(function(n){switch(n.label){case 0:return n.trys.push([0,5,,6]),(null===(r=this.options)||void 0===r?void 0:r.projectId)?this.beforeStart?[4,this.beforeStart(this)]:[3,2]:(console.error("项目唯一标识未传！"),[2]);case 1:if("boolean"==typeof(e=n.sent())&&!e)return[2];n.label=2;case 2:return function(e){var t,r=e.options.plugins,n=void 0===r?[]:r;if(n.length){e.startHooks.push(E);var o=((t={}).openPage=g,t.pageView=w,t.blankScreen=h,t.sourceError=_,t.apiRequest=[m,b],t.jsError=d,t.performance=performance,t);n.forEach((function(t){var r=o[t];i.isArray(r)?e.startHooks=e.startHooks.concat(r):e.startHooks.push(r)}))}}(this),this.startHooks?[4,(o=this.startHooks,a=this,Promise.all(o.map((function(e){return e.call(null,a)}))))]:[3,4];case 3:n.sent(),n.label=4;case 4:return[3,6];case 5:return t=n.sent(),console.log(t),[3,6];case 6:return[2]}var o,a}))}))},a.prototype.report=function(e){try{if(!this._isReady)return void console.warn("项目未调用install方法，请先调用",e);t({},i.isObject(e)?e:{})}catch(e){console.log(e)}},a.prototype.reportError=function(e,o){return r(this,void 0,void 0,(function(){var r,a,s,c;return n(this,(function(n){switch(n.label){case 0:return i.isString(e)||i.isNumber(e)?[2]:(r=e.target||{},o&&!i.isObject(o)&&(o={}),r.tagName?(a=r.src||r.url||r.link||r.href,c={requestUrl:a&&a.split("?")[0],resourceType:r.tagName.toLowerCase()},[4,this.report(t(t({},c),{type:"sourceError"}))]):[3,2]);case 1:return n.sent(),[3,4];case 2:return"APIError"===e.name?[2]:(s=function(e,t){var r=!1;try{t||(r=!0),i.isArray(e)&&e.length&&t&&(r=e.some((function(e){if(i.isString(e)){var r=e.toLowerCase();return t.toLowerCase().indexOf(r)>-1}if(i.isRegexp(e))return e.test(t)})))}catch(e){console.error(e)}return r}(this.options.scriptErrorWhite||[],e.message),!e.message||s?[3,4]:(c={errorMessage:e.message,errorStack:e.stack},[4,this.report(t(t(t({},c),{type:"jsError"}),o))]));case 3:n.sent(),n.label=4;case 4:return[2]}}))}))},a.prototype.captureVueError=function(e){e=e||window.Vue;var t=this;if(e&&!this._isCaptured&&e.config){var r=e.config.errorHandler;e.config.errorHandler=function(e){console.error(e),t.reportError(e),r&&r.apply(this,[].slice.call(arguments))},this._isCaptured=!0}},a.prototype.install=function(e){this.options.plugins=e,this.start().catch((function(e){console.log(e)}))},a.prototype.installAll=function(){this.install(["apiRequest","jsError","openPage","pageView","performance","sourceError","blankScreen"])},a.prototype.uninstall=function(){this.options.plugins=[],this._isReady=!1},a}(o);return S}));
//# sourceMappingURL=earth-monitor.umd.js.map
