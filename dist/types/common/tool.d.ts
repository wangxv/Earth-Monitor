export declare const CheckType: {
    getTypeString(val: any): string;
    isString(val: any): boolean;
    isJsonString(val: any): boolean;
    isNumber(val: any): boolean;
    isBoolean(val: any): boolean;
    isArray(val: any): boolean;
    isNull(val: any): boolean;
    isUndefined(val: any): boolean;
    isFunction(val: any): boolean;
    isObject(val: any): boolean;
    isError(val: any): boolean;
    isRegexp(val: any): boolean;
};
export declare const getBrowser: () => string;
export declare function judgeBrand(): string;
export declare function headerToJson(headers: any): any;
