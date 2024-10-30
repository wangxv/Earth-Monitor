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
    start(): Promise<void>;
    report(data: any): void;
    reportError(err: any, options?: any): Promise<void>;
    captureVueError(Vue?: any): void;
    install(plugins: any): void;
    installAll(): void;
    uninstall(): void;
}
export default EarthMonitor;
