import { REPORT_TYPE, WINDOW_ONLOAD } from "../common/enum"

/**
 * 白屏异常监控逻辑处理
 */
export default (ctx) => {

  let __flag = false;

  /**
   * 判断页面是否白屏
   * @param dom dom对象
   * @param num 次数
   * @returns 无
   */
 function isWhite(dom: any, num: number) {
  if (!dom) return false;

  const blackTags = ['head', 'meta', 'script', 'style', 'title'];

  const children = ([].slice.call(dom.children || [])).filter((node: HTMLElement) => {
    return blackTags.indexOf(node.tagName.toLowerCase()) < 0;
  })

  for (let i = 0; i < children.length; i++) {
    const node: HTMLElement = children[i];
    const {width, height} = node.getBoundingClientRect();

    const isVisible = (width > 0 && height > 0);
    num = isVisible ? num + 1 : num;

    if (num > 0) {
      return __flag = true;
    }
    /**
     * nodeType
     * 1: 元素节点  Node.ELEMENT_NODE
     * 2：元素的属性 Node.ATTRIBUTE_NODE
     * 3：元素或属性中实际的文本 Node.TEXT_NODE
     * 8：一个注释节点 Node.COMMENT_NODE
     * 9： 一个document节点  Node.DOCUMENT_NODE
     */
    if (node.nodeType === 1 && blackTags.indexOf(node.tagName.toLowerCase()) < 0) {
      isWhite(node, num);
    }
  }
  return __flag;
 }

  ctx.$on(WINDOW_ONLOAD, () => {
    const {domId, whiteTime} = ctx.options;
    
    setTimeout(() => {
      // querySelector返回选择器匹配的第一个元素
      const dom = document.querySelector(`#${domId}`) || document.querySelector(`.${domId}`);

      if (!isWhite(dom, 0)) {
        ctx.report({
          type: REPORT_TYPE.blankScreen
        })
      }
    }, whiteTime * 1000)
  })
}