import { CheckType } from "../common/tool";

/**
 * 判断异常信息是否在异常白名单中，如果在不上报
 * @param scriptErrorWhite 异常白名单
 * @param errorMessage 异常信息
 * @returns 是否在异常白名单中
 */
export const judeScriptErrorWhite = (scriptErrorWhite: Array<string | RegExp>, errorMessage: string) => {
  let ignore = false;
  try {
    if (!errorMessage) {
      ignore = true;
    }
    if (CheckType.isArray(scriptErrorWhite) && scriptErrorWhite.length && errorMessage) {
      ignore = scriptErrorWhite.some((item) => {
        if (CheckType.isString(item)) {
          const lowerItem = (item as String).toLowerCase();
          const lowerErrMsg = errorMessage.toLowerCase();
          return lowerErrMsg.indexOf(lowerItem) > -1;
        } else if (CheckType.isRegexp(item)) {
          return (item as RegExp).test(errorMessage);
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
  return ignore;
}

// 生成时间戳
export const timeStamp = () => {
  return  new Date().getTime();
}