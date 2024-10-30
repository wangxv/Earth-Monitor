import { PLUGINS } from "../common/enum";
import { CheckType } from "../common/tool";
import blankScreen from "./blankScreen";
import jsError from "./jsError";
import { openPage, pageView } from "./page";
import fetchRequest from './fetch';
import xml from "./xml";
import sourceError from "./sourceError";
import windowListener from "./windowListener";

export default function initHooks(ctx) {
  const {plugins = []} = ctx.options;
  if (!plugins.length) return;

  ctx.startHooks.push(windowListener);

  const handlerMap = {
    [PLUGINS.OPEN_PAGE]: openPage,
    [PLUGINS.PAGE_VIEW]: pageView,
    [PLUGINS.BLANK_PAGE]: blankScreen,
    [PLUGINS.SOURCE_ERROR]: sourceError,
    [PLUGINS.API_REQUEST]:  [fetchRequest, xml],
    [PLUGINS.JS_ERROR]: jsError,
    [PLUGINS.PERFORMANCE]: performance
  }

  plugins.forEach((plugin) => {
    const handler = handlerMap[plugin];
    if (CheckType.isArray(handler)) {
      ctx.startHooks = ctx.startHooks.concat(handler);
    } else {
      ctx.startHooks.push(handler);
    }
  })
}