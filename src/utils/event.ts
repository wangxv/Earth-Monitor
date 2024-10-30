/**
 * 事件处理
 */
export class EventModule {
  protected _evt = {};

  // 订阅者-监听事件的触发
  $on(type, fn) {
    this._evt[type] = this._evt[type] || [];
    this._evt[type].push(fn);
  }

  // 发布者-触发事件
  $emit(type, ...args) {
    const handlers = this._evt[type] || [];
    if (handlers.length) {
      handlers.forEach((handler) => {
        handler.apply(null, args);
      })
    }
  }

  // 关闭某个事件监听
  $off(type, fn) {
    const handlers = this._evt[type] || [];
    if (fn) {
      const idx = handlers.findIndex(fn);
      handlers.splice(idx, 1);
    } else {
      this._evt[type] = [];
    }
  }

  // 全部移除
  $remove() {
    this._evt = {};
  }
}
