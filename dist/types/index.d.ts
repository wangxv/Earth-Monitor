import { EventModule } from "./utils/event";
type Func = (ctx?: any) => (Promise<any> | void);
interface Options {
    projectId: (() => string) | string;
    userId: (() => string) | string;
    domId?: string;
    whiteTime?: number;
    scriptErrorWhite?: Array<string | RegExp>;
    beforeStart?: Func;
    beforeReport?: Func;
    [propsName: string]: any;
}
/**
 * EarthMonitor处理监控
 */
declare class EarthMonitor extends EventModule {
    options: Options;
    startHooks: {
        (arrayLength: number): Func[];
        (...items: Func[]): Func[];
        new (arrayLength: number): Func[];
        new (...items: Func[]): Func[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T>(arrayLike: ArrayLike<T>): T[];
        from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
        from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
        from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
        of<T>(...items: T[]): T[];
        readonly [Symbol.species]: ArrayConstructor;
    };
    beforeStart: Func | undefined;
    beforeReport: Func | undefined;
    _isCaptured: boolean;
    _isReady: boolean;
    constructor(options: any);
    /**
     * 开始执行
     * 1、判断项目唯一标识是否传入
     * 2、执行beforStart
     * 3、初始化hooks
     * 4、执行hooks
     */
    start(): Promise<void>;
    /**
     * 上报数据
     * @param data 上报数据
     * @returns 无
     */
    report(data: any): void;
    /**
     * 上报异常
     * 1、根据targetName分类，执行异常还是资源异常
     * 2、资源异常上报type： sourceError
     * 3、执行异常上报type: jsError
     * @param err Error对象
     * @param options 参数
     * @returns 无
     */
    reportError(err: any, options?: any): Promise<void>;
    /**
     * 捕获vue异常
     * @param Vue vue
     */
    captureVueError(Vue?: any): void;
    /**
     * 安装探针
     * @param plugins 探针列表
     */
    install(plugins: any): void;
    installAll(): void;
    uninstall(): void;
}
export default EarthMonitor;
