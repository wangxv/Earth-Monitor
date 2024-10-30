import { PROMISE_ERROR, WINDOW_ERROR, WINDOW_ONLOAD } from "../common/enum"
import { CheckType } from "../common/tool";

// TODO: 增加try catch error监听
export default (ctx) => {
  const errHandler = (err) => {
    // 过滤掉资源异常
    const tagName = (err.target || {}).tagName; 
    if (!tagName) {
      ctx.reportError(err);
    }
  }

  const promiseErrorHandler = (err) => {
    if (CheckType.isError(err.reason)) {
      ctx.reportError(err.reason);
    }
  }

  ctx.$on(WINDOW_ERROR, errHandler);
  ctx.$on(PROMISE_ERROR, promiseErrorHandler);

  ctx.$on(WINDOW_ONLOAD, () => {
     // @ts-ignore
    if (window.Vue) {
      ctx.captureVueError();
    }
  })
}