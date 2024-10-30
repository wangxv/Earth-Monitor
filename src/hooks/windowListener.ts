import { HASH_CHANGE, HISTORY_STATE_CHANGE, POP_STATE, PROMISE_ERROR, WINDOW_ERROR, WINDOW_ONLOAD } from "../common/enum"

export default (ctx) => {
  const loadEmit = (e) => {
    ctx.$emit(WINDOW_ONLOAD, e);
  };

  const errorEmit = (e) => {
    ctx.$emit(WINDOW_ERROR)
  }

  const promiseErrorEmit = (e) => {
    ctx.$emit(PROMISE_ERROR)
  }

  const hashChangeEmit = () => {
    ctx.$emit(HASH_CHANGE);
  }

  const popChangeEmit = () => {
    ctx.$emit(POP_STATE);
  }

  const historyStateChangeEmit = () => {
    ctx.$emit(HISTORY_STATE_CHANGE);
  }

  const unloadEmit = () => {
    window.removeEventListener('load', loadEmit);
    window.removeEventListener('error', errorEmit, true);
    window.removeEventListener('unhandledrejection', promiseErrorEmit);
    window.removeEventListener('hashchange', hashChangeEmit);
    window.removeEventListener('popstate', popChangeEmit);
    window.removeEventListener('historyStatechange', historyStateChangeEmit);

    ctx.$remove();
    ctx.uninstall();
  }

  window.addEventListener('load', loadEmit);
  window.addEventListener('error', errorEmit, true);
  window.addEventListener('unhandledrejection', promiseErrorEmit);
  window.addEventListener('hashchange', hashChangeEmit);
  window.addEventListener('popstate', popChangeEmit);
  window.addEventListener('historyStatechange', historyStateChangeEmit); // 自定义的historyState改变监听事件
  window.addEventListener('beforeunload', unloadEmit)
}