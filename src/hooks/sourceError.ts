import { WINDOW_ERROR } from "../common/enum";

// 必须保证每个功能的独立性
export default (ctx) => {
  const sourceErrHandler = (err) => {
    const tagName = (err.target || {}).tagName; 
    if (tagName) {
      ctx.reportError(err);
    }
  }
  ctx.$on(WINDOW_ERROR, sourceErrHandler);
}
