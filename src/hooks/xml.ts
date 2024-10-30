import { REPORT_TYPE } from "../common/enum";
import { headerToJson } from "../common/tool";
import { timeStamp } from "../utils";

const xmlInterceptor = (ctx) => {
  const xml: any = window.XMLHttpRequest.prototype; // 原型对象
  /**
   * 改写XMLHttpRequest原型对象上的三个方法
   * open
   * setRequestHeader
   * send
   */

  // 先保存原来的三个方法
  const originOpen = xml.open;
  const originSetRequestHeader = xml.setRequestHeader;
  const originSend = xml.send;

  xml.open = function(method, url) {
    this.__reqData__ = {
      method,
      url: url || '',
      start: timeStamp(),
      headers: {}
    }
    const args: any = Array.from(arguments);
    originOpen.apply(this, args);
  }

  xml.setRequestHeader = function (header, value) {
    this.__reqData__ && (this.__reqData__.headers[header] = value);
    const args: any = Array.from(arguments);
    originSetRequestHeader.apply(this, args);
  }

  xml.send = function() {
    let onReadyStateChange = this.onreadystatechange || function () {};

    this.onreadystatechange = function() {
      const args = Array.from(arguments);
      onReadyStateChange.apply(this, args);

      if (this.readyState === 4 && this.__reqData__) {
        try {
          const responseHeaders = headerToJson(this.getAllResponseHeaders()) || {};
          const urlArr = this.__reqData__.url.split('?') || [];

          const data = {
            requestId: responseHeaders.requestid || '',
            duration: timeStamp() - this.__reqData__.startTime,
            requestUrl: urlArr[0] || '',
            requestUrlParams: urlArr[1] || '',
            requestType: this.__reqData__.method.toUpperCase(),
            requestCode: this.status,
            type: REPORT_TYPE.apiRequest
          };

          if (!data.requestUrl) return;
          ctx.report(data);
        } catch (e) {
          ctx.reportError(e);
        }
      }
    }

    const args: any = Array.from(arguments);
    originSend.apply(this, args);
  }
};
export default (ctx) => {
  if (typeof window !== 'undefined') {
    xmlInterceptor(ctx);
  }
}