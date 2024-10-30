import { REPORT_TYPE } from "../common/enum";
import { timeStamp } from "../utils";

const fetchInterceptor = (ctx) => {
  const _fetch = window.fetch;

  // 重写window上的fetch方法
  // @ts-ignore
  window.fetch = function () {
    // 将arguments对象转换为一个真正的数组
    // const args = [].slice.call(arguments);
    const args: any = Array.from(arguments);
    const urlList = args && args[0] && (args[0].split('?')) || [];

    const startTime = timeStamp();
    let data: any = {
      requestUrl: urlList[0] || '',
      requestUrlParams: urlList[1] || '',
      requestType: ((args[1] || {}).method || 'get').toUpperCase()
    };

    return _fetch.apply(this, args).then((res) => {
      try {
        if (res) {
          // 创建一个 Response 对象的克隆。
          const copy = res.clone();
          const status = +copy.status; // 转数字
          copy.text().then((ts) => {
            // 文本对象

            data = {
              ...data,
              duration: timeStamp() - startTime,
              requestId: copy.headers.get('requestid') || '',
              requestCode: copy.status,
              type: REPORT_TYPE.apiRequest
            }
            if (!data.requestUrl) return;
            // 上报
            ctx.report(data);
          })
        }
      } catch(e) {
        ctx.reportError(e);
      }
    }).catch((e) => {
      ctx.reportError(e);
    });
  }
}

export default (ctx) => {
  if (typeof window !== 'undefined') {
    fetchInterceptor(ctx);
  }
}