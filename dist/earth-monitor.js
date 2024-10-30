(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EarthMonitor = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * 事件处理
     */
    var EventModule = /** @class */ (function () {
        function EventModule() {
            this._evt = {};
        }
        // 订阅者-监听事件的触发
        EventModule.prototype.$on = function (type, fn) {
            this._evt[type] = this._evt[type] || [];
            this._evt[type].push(fn);
        };
        // 发布者-触发事件
        EventModule.prototype.$emit = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var handlers = this._evt[type] || [];
            if (handlers.length) {
                handlers.forEach(function (handler) {
                    handler.apply(null, args);
                });
            }
        };
        // 关闭某个事件监听
        EventModule.prototype.$off = function (type, fn) {
            var handlers = this._evt[type] || [];
            if (fn) {
                var idx = handlers.findIndex(fn);
                handlers.splice(idx, 1);
            }
            else {
                this._evt[type] = [];
            }
        };
        // 全部移除
        EventModule.prototype.$remove = function () {
            this._evt = {};
        };
        return EventModule;
    }());

    // 检查数据类型
    var CheckType = {
        getTypeString: function (val) {
            return Object.prototype.toString.call(val).toLowerCase();
        },
        isString: function (val) {
            return this.getTypeString(val) === '[object string]';
        },
        isJsonString: function (val) {
            try {
                return typeof JSON.parse(val) === 'object';
            }
            catch (e) {
                return false;
            }
        },
        isNumber: function (val) {
            return this.getTypeString(val) === '[object number]';
        },
        isBoolean: function (val) {
            return this.getTypeString(val) === '[object boolean]';
        },
        isArray: function (val) {
            return this.getTypeString(val) === '[object array]';
        },
        isNull: function (val) {
            return this.getTypeString(val) === '[object null]';
        },
        isUndefined: function (val) {
            return this.getTypeString(val) === '[object undefined]';
        },
        isFunction: function (val) {
            var type = this.getTypeString(val);
            return (type === '[object function]' || type === '[object asyncfunction]'
                || type === '[object promise]');
        },
        isObject: function (val) {
            return this.getTypeString(val) === '[object object]';
        },
        isError: function (val) {
            var type = this.getTypeString(val);
            return (type === '[object error]' || type === '[object errorevent]');
        },
        isRegexp: function (val) {
            return this.getTypeString(val) === '[object regexp]';
        }
    };
    var ua = navigator.userAgent.toLowerCase();
    var getBrowser = function () {
        var browsers = [
            {
                reg: /edge\/([\d.]+)/,
                name: 'Edge'
            },
            {
                reg: /rv:([\d.]+)\) like gecko/,
                name: 'IE'
            },
            {
                reg: /msie ([\d.]+)/,
                name: 'IE'
            },
            {
                reg: /firefox\/([\d.]+)/,
                name: 'Firefox'
            },
            {
                reg: /chrome\/([\d.]+)/,
                name: 'Chrome'
            },
            {
                reg: /opera.([\d.]+)/,
                name: 'Opera'
            },
            {
                reg: /version\/([\d.]+).*safari/,
                name: 'Safari'
            },
            {
                reg: /AppleWebKit\/([\d.]+).*mobile.*/i,
                name: 'webkit'
            }
        ];
        try {
            for (var _i = 0, browsers_1 = browsers; _i < browsers_1.length; _i++) {
                var _a = browsers_1[_i], reg = _a.reg, name_1 = _a.name;
                var s = ua.match(reg);
                if (s && s[1]) {
                    return "".concat(name_1, " ").concat(s[1]);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        return "unknow";
    };
    // header信息转为json对象
    function headerToJson(headers) {
        var arr = headers.trim().split(/[\r\n]+/);
        var json = {};
        arr.forEach(function (item) {
            var keyVal = item.split(': ');
            keyVal.length && (json[keyVal[0]] = keyVal[1]);
        });
        return json;
    }

    var WINDOW_ONLOAD = 'load';
    var WINDOW_ERROR = 'windowError';
    var HASH_CHANGE = 'hashchange';
    var HISTORY_STATE_CHANGE = 'historyStatechange';
    var POP_STATE = 'popstate';
    var PROMISE_ERROR = 'promiseError';

    /**
     * 白屏异常监控逻辑处理
     */
    var blankScreen = (function (ctx) {
        var __flag = false;
        /**
         * 判断页面是否白屏
         * @param dom dom对象
         * @param num 次数
         * @returns 无
         */
        function isWhite(dom, num) {
            if (!dom)
                return false;
            var blackTags = ['head', 'meta', 'script', 'style', 'title'];
            var children = ([].slice.call(dom.children || [])).filter(function (node) {
                return blackTags.indexOf(node.tagName.toLowerCase()) < 0;
            });
            for (var i = 0; i < children.length; i++) {
                var node = children[i];
                var _a = node.getBoundingClientRect(), width = _a.width, height = _a.height;
                var isVisible = (width > 0 && height > 0);
                num = isVisible ? num + 1 : num;
                if (num > 0) {
                    return __flag = true;
                }
                /**
                 * nodeType
                 * 1: 元素节点  Node.ELEMENT_NODE
                 * 2：元素的属性 Node.ATTRIBUTE_NODE
                 * 3：元素或属性中实际的文本 Node.TEXT_NODE
                 * 8：一个注释节点 Node.COMMENT_NODE
                 * 9： 一个document节点  Node.DOCUMENT_NODE
                 */
                if (node.nodeType === 1 && blackTags.indexOf(node.tagName.toLowerCase()) < 0) {
                    isWhite(node, num);
                }
            }
            return __flag;
        }
        ctx.$on(WINDOW_ONLOAD, function () {
            var _a = ctx.options, domId = _a.domId, whiteTime = _a.whiteTime;
            setTimeout(function () {
                // querySelector返回选择器匹配的第一个元素
                var dom = document.querySelector("#".concat(domId)) || document.querySelector(".".concat(domId));
                if (!isWhite(dom, 0)) {
                    ctx.report({
                        type: "blankScreen" /* REPORT_TYPE.blankScreen */
                    });
                }
            }, whiteTime * 1000);
        });
    });

    // TODO: 增加try catch error监听
    var jsError = (function (ctx) {
        var errHandler = function (err) {
            // 过滤掉资源异常
            var tagName = (err.target || {}).tagName;
            if (!tagName) {
                ctx.reportError(err);
            }
        };
        var promiseErrorHandler = function (err) {
            if (CheckType.isError(err.reason)) {
                ctx.reportError(err.reason);
            }
        };
        ctx.$on(WINDOW_ERROR, errHandler);
        ctx.$on(PROMISE_ERROR, promiseErrorHandler);
        ctx.$on(WINDOW_ONLOAD, function () {
            // @ts-ignore
            if (window.Vue) {
                ctx.captureVueError();
            }
        });
    });

    /**
     * 判断异常信息是否在异常白名单中，如果在不上报
     * @param scriptErrorWhite 异常白名单
     * @param errorMessage 异常信息
     * @returns 是否在异常白名单中
     */
    var judeScriptErrorWhite = function (scriptErrorWhite, errorMessage) {
        var ignore = false;
        try {
            if (!errorMessage) {
                ignore = true;
            }
            if (CheckType.isArray(scriptErrorWhite) && scriptErrorWhite.length && errorMessage) {
                ignore = scriptErrorWhite.some(function (item) {
                    if (CheckType.isString(item)) {
                        var lowerItem = item.toLowerCase();
                        var lowerErrMsg = errorMessage.toLowerCase();
                        return lowerErrMsg.indexOf(lowerItem) > -1;
                    }
                    else if (CheckType.isRegexp(item)) {
                        return item.test(errorMessage);
                    }
                });
            }
        }
        catch (e) {
            console.error(e);
        }
        return ignore;
    };
    // 生成时间戳
    var timeStamp = function () {
        return new Date().getTime();
    };

    var openPage = function (ctx) {
        // @ts-ignore line
        var perform = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
        var timing = (perform.timing || {});
        var openPageHandler = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, client, ua, system, device, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.options, client = _a.client, ua = _a.ua, system = _a.system, device = _a.device;
                        data = {
                            type: "openPage" /* REPORT_TYPE.openPage */,
                            client: client,
                            ua: ua,
                            system: system,
                            device: device,
                            occurTime: timing.fetchStart || timeStamp()
                        };
                        return [4 /*yield*/, ctx.report(data)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        openPageHandler();
    };
    var __interceptor = function (eventType) {
        var originEvent = history[eventType];
        // 重写history上的方法
        history[eventType] = function () {
            var args = [].slice.call(arguments);
            // CustomEvent 由应用程序为任何目的初始化的事件。自定义事件对象
            var event = new CustomEvent(HISTORY_STATE_CHANGE);
            var origin = originEvent.apply(this, args);
            // 触发自定义事件historyStatechange
            // 通过手动使用 dispatchEvent() 方法派发的事件
            window.dispatchEvent(event);
            return origin;
        };
    };
    var __stateInterceptor = function () {
        __interceptor('pushState');
        __interceptor('replaceState');
    };
    /**
     * history.pushState() 按指定的名称和 URL（如果提供该参数）将数据 push 进会话历史栈
     * history.replaceState() 按指定的数据、名称和 URL（如果提供该参数），更新 history 栈上最新的条目
     *
     */
    var pageView = function (ctx) {
        var _a = ctx.options.spa, spa = _a === void 0 ? true : _a;
        var browser = getBrowser().toLowerCase();
        var routerMode = !!window.history.pushState ? 'history' : 'hash';
        ctx.$on(WINDOW_ONLOAD, function () {
            if (!((browser === 'chrome' || browser === 'safari') && routerMode === 'history')) {
                // chrome, safari 浏览器中popstate首次进入就会触发
                ctx.report({
                    type: "pageView" /* REPORT_TYPE.pageView */
                });
            }
        });
        if (spa) {
            if (routerMode === 'hash') {
                ctx.$on(HASH_CHANGE, function () {
                    ctx.report({
                        type: "pageView" /* REPORT_TYPE.pageView */
                    });
                });
            }
            if (routerMode === 'history') {
                ctx.$on(POP_STATE, function () {
                    ctx.report({
                        type: "pageView" /* REPORT_TYPE.pageView */
                    });
                });
            }
            __stateInterceptor();
            // pushState, replaceState触发事件
            ctx.$on(HISTORY_STATE_CHANGE, function () {
                ctx.report({
                    type: "pageView" /* REPORT_TYPE.pageView */
                });
            });
        }
    };

    var fetchInterceptor = function (ctx) {
        var _fetch = window.fetch;
        // 重写window上的fetch方法
        // @ts-ignore
        window.fetch = function () {
            // 将arguments对象转换为一个真正的数组
            // const args = [].slice.call(arguments);
            var args = Array.from(arguments);
            var urlList = args && args[0] && (args[0].split('?')) || [];
            var startTime = timeStamp();
            var data = {
                requestUrl: urlList[0] || '',
                requestUrlParams: urlList[1] || '',
                requestType: ((args[1] || {}).method || 'get').toUpperCase()
            };
            return _fetch.apply(this, args).then(function (res) {
                try {
                    if (res) {
                        // 创建一个 Response 对象的克隆。
                        var copy_1 = res.clone();
                        var status_1 = +copy_1.status; // 转数字
                        copy_1.text().then(function (ts) {
                            // 文本对象
                            data = __assign(__assign({}, data), { duration: timeStamp() - startTime, requestId: copy_1.headers.get('requestid') || '', requestCode: copy_1.status, type: "apiRequest" /* REPORT_TYPE.apiRequest */ });
                            if (!data.requestUrl)
                                return;
                            // 上报
                            ctx.report(data);
                        });
                    }
                }
                catch (e) {
                    ctx.reportError(e);
                }
            }).catch(function (e) {
                ctx.reportError(e);
            });
        };
    };
    var fetchRequest = (function (ctx) {
        if (typeof window !== 'undefined') {
            fetchInterceptor(ctx);
        }
    });

    var xmlInterceptor = function (ctx) {
        var xml = window.XMLHttpRequest.prototype; // 原型对象
        /**
         * 改写XMLHttpRequest原型对象上的三个方法
         * open
         * setRequestHeader
         * send
         */
        // 先保存原来的三个方法
        var originOpen = xml.open;
        var originSetRequestHeader = xml.setRequestHeader;
        var originSend = xml.send;
        xml.open = function (method, url) {
            this.__reqData__ = {
                method: method,
                url: url || '',
                start: timeStamp(),
                headers: {}
            };
            var args = Array.from(arguments);
            originOpen.apply(this, args);
        };
        xml.setRequestHeader = function (header, value) {
            this.__reqData__ && (this.__reqData__.headers[header] = value);
            var args = Array.from(arguments);
            originSetRequestHeader.apply(this, args);
        };
        xml.send = function () {
            var onReadyStateChange = this.onreadystatechange || function () { };
            this.onreadystatechange = function () {
                var args = Array.from(arguments);
                onReadyStateChange.apply(this, args);
                if (this.readyState === 4 && this.__reqData__) {
                    try {
                        var responseHeaders = headerToJson(this.getAllResponseHeaders()) || {};
                        var urlArr = this.__reqData__.url.split('?') || [];
                        var data = {
                            requestId: responseHeaders.requestid || '',
                            duration: timeStamp() - this.__reqData__.startTime,
                            requestUrl: urlArr[0] || '',
                            requestUrlParams: urlArr[1] || '',
                            requestType: this.__reqData__.method.toUpperCase(),
                            requestCode: this.status,
                            type: "apiRequest" /* REPORT_TYPE.apiRequest */
                        };
                        if (!data.requestUrl)
                            return;
                        ctx.report(data);
                    }
                    catch (e) {
                        ctx.reportError(e);
                    }
                }
            };
            var args = Array.from(arguments);
            originSend.apply(this, args);
        };
    };
    var xml = (function (ctx) {
        if (typeof window !== 'undefined') {
            xmlInterceptor(ctx);
        }
    });

    // 必须保证每个功能的独立性
    var sourceError = (function (ctx) {
        var sourceErrHandler = function (err) {
            var tagName = (err.target || {}).tagName;
            if (tagName) {
                ctx.reportError(err);
            }
        };
        ctx.$on(WINDOW_ERROR, sourceErrHandler);
    });

    var windowListener = (function (ctx) {
        var loadEmit = function (e) {
            ctx.$emit(WINDOW_ONLOAD, e);
        };
        var errorEmit = function (e) {
            ctx.$emit(WINDOW_ERROR);
        };
        var promiseErrorEmit = function (e) {
            ctx.$emit(PROMISE_ERROR);
        };
        var hashChangeEmit = function () {
            ctx.$emit(HASH_CHANGE);
        };
        var popChangeEmit = function () {
            ctx.$emit(POP_STATE);
        };
        var historyStateChangeEmit = function () {
            ctx.$emit(HISTORY_STATE_CHANGE);
        };
        var unloadEmit = function () {
            window.removeEventListener('load', loadEmit);
            window.removeEventListener('error', errorEmit, true);
            window.removeEventListener('unhandledrejection', promiseErrorEmit);
            window.removeEventListener('hashchange', hashChangeEmit);
            window.removeEventListener('popstate', popChangeEmit);
            window.removeEventListener('historyStatechange', historyStateChangeEmit);
            ctx.$remove();
            ctx.uninstall();
        };
        window.addEventListener('load', loadEmit);
        window.addEventListener('error', errorEmit, true);
        window.addEventListener('unhandledrejection', promiseErrorEmit);
        window.addEventListener('hashchange', hashChangeEmit);
        window.addEventListener('popstate', popChangeEmit);
        window.addEventListener('historyStatechange', historyStateChangeEmit); // 自定义的historyState改变监听事件
        window.addEventListener('beforeunload', unloadEmit);
    });

    function initHooks(ctx) {
        var _a;
        var _b = ctx.options.plugins, plugins = _b === void 0 ? [] : _b;
        if (!plugins.length)
            return;
        ctx.startHooks.push(windowListener);
        var handlerMap = (_a = {},
            _a["openPage" /* PLUGINS.OPEN_PAGE */] = openPage,
            _a["pageView" /* PLUGINS.PAGE_VIEW */] = pageView,
            _a["blankScreen" /* PLUGINS.BLANK_PAGE */] = blankScreen,
            _a["sourceError" /* PLUGINS.SOURCE_ERROR */] = sourceError,
            _a["apiRequest" /* PLUGINS.API_REQUEST */] = [fetchRequest, xml],
            _a["jsError" /* PLUGINS.JS_ERROR */] = jsError,
            _a["performance" /* PLUGINS.PERFORMANCE */] = performance,
            _a);
        plugins.forEach(function (plugin) {
            var handler = handlerMap[plugin];
            if (CheckType.isArray(handler)) {
                ctx.startHooks = ctx.startHooks.concat(handler);
            }
            else {
                ctx.startHooks.push(handler);
            }
        });
    }

    var processHooks = function (hooks, ctx) {
        return Promise.all(hooks.map(function (hook) { return hook.call(null, ctx); }));
    };
    /**
     * EarthMonitor处理监控
     */
    var EarthMonitor = /** @class */ (function (_super) {
        __extends(EarthMonitor, _super);
        function EarthMonitor(options) {
            var _this_1 = _super.call(this) || this;
            _this_1.startHooks = (Array);
            _this_1.options = options;
            _this_1.beforeStart = options === null || options === void 0 ? void 0 : options.beforeStart;
            _this_1.beforeReport = options === null || options === void 0 ? void 0 : options.beforeReport;
            _this_1._isReady = false;
            _this_1._isCaptured = false;
            return _this_1;
        }
        /**
         * 开始执行
         * 1、判断项目唯一标识是否传入
         * 2、执行beforStart
         * 3、初始化hooks
         * 4、执行hooks
         */
        EarthMonitor.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, e_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.projectId)) {
                                console.error('项目唯一标识未传！');
                                return [2 /*return*/];
                            }
                            if (!this.beforeStart) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.beforeStart(this)];
                        case 1:
                            res = _b.sent();
                            if (typeof res === 'boolean' && !res)
                                return [2 /*return*/];
                            _b.label = 2;
                        case 2:
                            // 初始化hooks
                            initHooks(this);
                            if (!this.startHooks) return [3 /*break*/, 4];
                            return [4 /*yield*/, processHooks(this.startHooks, this)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            e_1 = _b.sent();
                            console.log(e_1);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 上报数据
         * @param data 上报数据
         * @returns 无
         */
        EarthMonitor.prototype.report = function (data) {
            try {
                if (!this._isReady) {
                    console.warn('项目未调用install方法，请先调用', data);
                    return;
                }
                var options = __assign({}, (CheckType.isObject(data) ? data : {}));
                // 这里请求
            }
            catch (e) {
                console.log(e);
            }
        };
        /**
         * 上报异常
         * 1、根据targetName分类，执行异常还是资源异常
         * 2、资源异常上报type： sourceError
         * 3、执行异常上报type: jsError
         * @param err Error对象
         * @param options 参数
         * @returns 无
         */
        EarthMonitor.prototype.reportError = function (err, options) {
            return __awaiter(this, void 0, void 0, function () {
                var target, url, data, isIgnore, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (CheckType.isString(err) || CheckType.isNumber(err))
                                return [2 /*return*/];
                            target = err.target || {};
                            if (options && !CheckType.isObject(options)) {
                                options = {};
                            }
                            if (!target.tagName) return [3 /*break*/, 2];
                            url = target.src || target.url || target.link || target.href;
                            data = {
                                requestUrl: url && url.split('?')[0],
                                resourceType: target.tagName.toLowerCase()
                            };
                            return [4 /*yield*/, this.report(__assign(__assign({}, data), { type: "sourceError" /* REPORT_TYPE.sourceError */ }))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            // js执行错误
                            if (err.name === 'APIError') {
                                return [2 /*return*/];
                            }
                            isIgnore = judeScriptErrorWhite(this.options.scriptErrorWhite || [], err.message);
                            if (!(err.message && !isIgnore)) return [3 /*break*/, 4];
                            data = {
                                errorMessage: err.message,
                                errorStack: err.stack
                            };
                            return [4 /*yield*/, this.report(__assign(__assign(__assign({}, data), { type: "jsError" /* REPORT_TYPE.jsError */ }), options))];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 捕获vue异常
         * @param Vue vue
         */
        EarthMonitor.prototype.captureVueError = function (Vue) {
            // @ts-ignore
            Vue = Vue || window.Vue;
            var _this = this;
            // VUE3中错误捕获调用的是createApp(App).config.errorHandler
            if (Vue && !this._isCaptured && Vue.config) {
                var handler_1 = Vue.config.errorHandler;
                Vue.config.errorHandler = function (err) {
                    console.error(err);
                    _this.reportError(err);
                    handler_1 && handler_1.apply(this, [].slice.call(arguments));
                };
                this._isCaptured = true;
            }
        };
        /**
         * 安装探针
         * @param plugins 探针列表
         */
        EarthMonitor.prototype.install = function (plugins) {
            this.options.plugins = plugins;
            this.start().catch(function (e) {
                console.log(e);
            });
        };
        // 安装全部探针
        EarthMonitor.prototype.installAll = function () {
            var plugins = [
                "apiRequest" /* PLUGINS.API_REQUEST */,
                "jsError" /* PLUGINS.JS_ERROR */,
                "openPage" /* PLUGINS.OPEN_PAGE */,
                "pageView" /* PLUGINS.PAGE_VIEW */,
                "performance" /* PLUGINS.PERFORMANCE */,
                "sourceError" /* PLUGINS.SOURCE_ERROR */,
                "blankScreen" /* PLUGINS.BLANK_PAGE */
            ];
            this.install(plugins);
        };
        // 卸载探针
        EarthMonitor.prototype.uninstall = function () {
            this.options.plugins = [];
            this._isReady = false;
        };
        return EarthMonitor;
    }(EventModule));

    return EarthMonitor;

}));
//# sourceMappingURL=earth-monitor.js.map
