export class EventModule {
  protected _evt = {};

  $on(type, fn) {
    this._evt[type] = this._evt[type] || [];
    this._evt[type].push(fn);
  }

  $emit(type, ...args) {
    const handlers = this._evt[type] || [];
    if (handlers.length) {
      handlers.forEach((handler) => {
        handler.apply(null, args);
      })
    }
  }

  $off(type, fn) {
    const handlers = this._evt[type] || [];
    if (fn) {
      const idx = handlers.findIndex(fn);
      handlers.splice(idx, 1);
    } else {
      this._evt[type] = [];
    }
  }
  $remove() {
    this._evt = {};
  }
}
