/**
 * 判断异常信息是否在异常白名单中，如果在不上报
 * @param scriptErrorWhite 异常白名单
 * @param errorMessage 异常信息
 * @returns 是否在异常白名单中
 */
export declare const judeScriptErrorWhite: (scriptErrorWhite: Array<string | RegExp>, errorMessage: string) => boolean;
export declare const timeStamp: () => number;
