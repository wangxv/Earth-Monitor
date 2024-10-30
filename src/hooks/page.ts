import { HASH_CHANGE, HISTORY_STATE_CHANGE, POP_STATE, REPORT_TYPE, WINDOW_ONLOAD } from "../common/enum";
import { getBrowser } from "../common/tool";
import { timeStamp } from "../utils";

export const openPage = (ctx) => {
  // @ts-ignore line
  const perform = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance
  const timing = (perform.timing || {})
  const openPageHandler = async () => {
    const {client, ua, system, device} = ctx.options;
    const data = {
      type: REPORT_TYPE.openPage,
      client,
      ua,
      system,
      device,
      occurTime: timing.fetchStart || timeStamp()
    };
    await ctx.report(data);
  };
  openPageHandler();
}

const __interceptor = (eventType: string) => {
  const originEvent = history[eventType];

  // 重写history上的方法
  history[eventType] = function () {
    const args = [].slice.call(arguments);
    // CustomEvent 由应用程序为任何目的初始化的事件。自定义事件对象
    const event = new CustomEvent(HISTORY_STATE_CHANGE);
    const origin = originEvent.apply(this, args);
    // 触发自定义事件historyStatechange
    // 通过手动使用 dispatchEvent() 方法派发的事件
    window.dispatchEvent(event);
    return origin;
  }
}
const __stateInterceptor = () => {
  __interceptor('pushState');
  __interceptor('replaceState');
}

/**
 * history.pushState() 按指定的名称和 URL（如果提供该参数）将数据 push 进会话历史栈
 * history.replaceState() 按指定的数据、名称和 URL（如果提供该参数），更新 history 栈上最新的条目
 * 
 */
export const pageView =  (ctx) => {
  const {spa = true} = ctx.options;
  const browser = getBrowser().toLowerCase();
  const routerMode = !!window.history.pushState ? 'history' : 'hash';
  
  ctx.$on(WINDOW_ONLOAD, () => {
    if (!((browser === 'chrome' || browser === 'safari') && routerMode === 'history')) {
      // chrome, safari 浏览器中popstate首次进入就会触发
      ctx.report({
        type: REPORT_TYPE.pageView
      });
    }
  })

  if (spa) {
    if (routerMode === 'hash') {
      ctx.$on(HASH_CHANGE, () => {
        ctx.report({
          type: REPORT_TYPE.pageView
        });
      });
    }

    if (routerMode === 'history') {
      ctx.$on(POP_STATE, () => {
        ctx.report({
          type: REPORT_TYPE.pageView
        });
      });
    }

    __stateInterceptor();

    // pushState, replaceState触发事件
    ctx.$on(HISTORY_STATE_CHANGE, () => {
      ctx.report({
        type: REPORT_TYPE.pageView
      });
    });
  }
}