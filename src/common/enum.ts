// 上报类型
export const enum REPORT_TYPE {
  openPage = 'openPage', // 页面启动
  pageView = 'pageView',
  jsError = 'jsError',
  apiRequest = 'apiRequest',
  sourceError = 'sourceError',
  blankScreen = 'blankScreen',
  performance = 'performance',
  selfReport = 'selfReport'
}

export const WINDOW_ONLOAD = 'load';
export const WINDOW_UNLOAD = 'unload';
export const WINDOW_ERROR = 'windowError';
export const HASH_CHANGE = 'hashchange';
export const HISTORY_STATE_CHANGE = 'historyStatechange';
export const POP_STATE = 'popstate';
export const PROMISE_ERROR = 'promiseError';
export const SUCCESS_CODE = [200]

export const H5_LOAD_END = 'h5LoadEnd';

// 探针类型
export const enum PLUGINS {
  OPEN_PAGE = 'openPage',
  PAGE_VIEW = 'pageView',
  JS_ERROR = 'jsError',
  API_REQUEST = 'apiRequest',
  SOURCE_ERROR = 'sourceError',
  BLANK_PAGE = 'blankScreen',
  PERFORMANCE = 'performance'
}
