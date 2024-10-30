import { REPORT_TYPE, WINDOW_ONLOAD } from "../common/enum";
import { timeStamp } from "../utils"

export default (ctx) => {

  // function getLCP (callback) {
  //   let type = 'largest-contentful-paint'
  //   let typeList = PerformanceObserver && PerformanceObserver.supportedEntryTypes ? PerformanceObserver.supportedEntryTypes : null;
  //   if (typeList && typeList.length && typeList.indexOf(type)) {
  //     let __po = new PerformanceObserver((list) => {
  //       callback(list.getEntries(), __po);
  //     });
  //     __po.observe({
  //       type,
  //       buffered: true
  //     })
  //   }
  // }

  // getLCP((entries, observe) => {
  //   if (entries && entries.length) {
  //     const info = entries[entries.length - 1];
  //     observe.disconnect();
  //     console.log('Entries: ', entries, info);
  //   }
  // })

  const __startTime = timeStamp();
  let __performCount = 0;

 // timing在新标准中已经废弃，使用PerformanceNavigationTiming代替
  const performanceHandler = () => {
    try {
      // @ts-ignore
      const performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance
      const timing = performance.timing;
      const __eventTime = timeStamp();

      /**
       * navigationStart: 表示同一个浏览器上下文的上一个文档卸载（unload）结束时，如果没有上一个文档，这个值会和fetchStart相同
       * fetchStart: 浏览器准备好使用 HTTP 请求来获取（fetch）文档的 UNIX 时间戳。这个时间点会在检查任何应用缓存之前。
       * requestStart: 浏览器向服务器发出 HTTP 请求时（或开始读取本地缓存时）的 Unix 毫秒时间戳
       * responseStart: 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的 Unix 毫秒时间戳。如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间
       * loadEventEnd: 返回当 load 事件结束，即加载事件完成时的 Unix 毫秒时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是 0
       * domContentLoadedEventEnd: 返回当所有需要立即执行的脚本已经被执行（不论执行顺序）时的 Unix 毫秒时间戳。
       * 
       */
      let {navigationStart, fetchStart, responseStart, loadEventEnd, domContentLoadedEventEnd} = timing;

      __performCount++;

      if (!loadEventEnd) {
        if (__performCount <= 10) {
          setTimeout(performanceHandler, 100);
          return;
        } else {
          loadEventEnd = __eventTime;
        }
      }

      // 数据修正
      if (!fetchStart) {
        fetchStart = navigationStart || __eventTime;
      }

      if (!responseStart) {
        responseStart = navigationStart || __eventTime;
      }

      if (!domContentLoadedEventEnd) {
        domContentLoadedEventEnd = __eventTime;
      }
      const data = {
        type: REPORT_TYPE.performance,
        firstByte: Math.max(responseStart - fetchStart, 0), // 首字节
        domReady: (domContentLoadedEventEnd - fetchStart) > 0 ? (domContentLoadedEventEnd - fetchStart) : Math.max(__eventTime - __startTime, 0), // dom加载完成
        loadEnd: (loadEventEnd - fetchStart) > 0 ? (loadEventEnd - fetchStart) : Math.max(__eventTime - __startTime, 0) // 整体加载完成
      }

    } catch (e) {
      console.log('e: ', e);
    }
  }

  ctx.$on(WINDOW_ONLOAD, () => {
    setTimeout(performanceHandler, 0);
  })
}