import { CheckType } from "../common/tool";

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

export const timeStamp = () => {
  return  new Date().getTime();
}