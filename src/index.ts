import { EventModule } from "./utils/event";
import initHooks from './hooks'
import { PLUGINS, REPORT_TYPE } from "./common/enum";
import { CheckType } from "./common/tool";
import { judeScriptErrorWhite } from "./utils";

type Func = (ctx?) => (Promise<any> | void);

interface Options {
  projectId: (() => string) | string; // 项目的唯一标识
  userId: (() => string) | string; // 用户的唯一标识
  domId?: string; // 判断白屏的核心dom 
  whiteTime?: number; // 白屏时间
  scriptErrorWhite?: Array<string | RegExp>; // js异常白名单
  beforeStart?: Func;
  beforeReport?: Func;
  [propsName: string]: any;
}

const processHooks = (hooks, ctx) => {
  return Promise.all(hooks.map((hook) => hook.call(null, ctx)))
}

class EarthMonitor extends EventModule{
  options: Options;
  startHooks = Array<Func>;
  beforeStart: Func | undefined;
  beforeReport: Func | undefined;

  _isCaptured: boolean;
  _isReady: boolean;

  constructor(options) {
    super();
    this.options = options;
    this.beforeStart = options?.beforeStart;
    this.beforeReport = options?.beforeReport;

    this._isReady = false;
    this._isCaptured = false;
  }

  async start() {
    try {
      if (!this.options?.projectId) {
        console.error('项目唯一标识未传！');
        return;
      }

      if (this.beforeStart) {
        const res = await this.beforeStart(this);
        if (typeof res === 'boolean' && !res) return;
      }

      // 初始化hooks
      initHooks(this);
      if (this.startHooks) {
        await processHooks(this.startHooks, this)
      }
    } catch (e) {
      console.log(e);
    }
  }

  report (data) {
    try {
      if (!this._isReady) {
        console.warn('项目未调用install方法，请先调用', data);
        return;
      }
      const options = {
        ...(CheckType.isObject(data) ? data : {})
      }
      // 这里请求

    } catch (e) {
      console.log(e);
    }
  }

  async reportError(err, options?) {
    if (CheckType.isString(err) || CheckType.isNumber(err)) return;

    const target = err.target || {};
    if (options && !CheckType.isObject(options)) {
      options = {};
    }

    // 资源加载异常
    if (target.tagName) {
      const url = target.src || target.url || target.link || target.href;
      const data = {
        requestUrl: url && url.split('?')[0],
        resourceType: target.tagName.toLowerCase()
      };

      await this.report({...data, reportType: REPORT_TYPE.sourceError});
    } else {
      // js执行错误

      if (err.name === 'APIError') {
        return;
      }

      const isIgnore = judeScriptErrorWhite(this.options.scriptErrorWhite || [], err.message);

      if (err.message && !isIgnore) {
        const data = {
          errorMessage: err.message,
          errorStack: err.stack
        };
        await this.report({...data, reportType: REPORT_TYPE.jsError, ...options});
      }
    }
  }

  captureVueError(Vue?) {
    // @ts-ignore
    Vue = Vue || window.Vue
    const _this = this;
    // VUE3中错误捕获调用的是createApp(App).config.errorHandler
    if (Vue && !this._isCaptured && Vue.config) {
      const handler = Vue.config.errorHandler;
      Vue.config.errorHandler = function (err) {
        console.error(err);
        _this.reportError(err);
        handler && handler.apply(this, [].slice.call(arguments));
      }
      this._isCaptured = true;
    }
  }

  install (plugins) {
    this.options.plugins = plugins;
    this.start().catch(e => {
      console.log(e);
    })
  }

  
  // 安装全部探针
  installAll() {
    const plugins = [
      PLUGINS.API_REQUEST,
      PLUGINS.JS_ERROR,
      PLUGINS.OPEN_PAGE,
      PLUGINS.PAGE_VIEW,
      PLUGINS.PERFORMANCE,
      PLUGINS.SOURCE_ERROR,
      PLUGINS.BLANK_PAGE
    ];
    this.install(plugins);
  }

  uninstall() {
    this.options.plugins = [];
    this._isReady = false;
  }
}

export default EarthMonitor;