export declare class EventModule {
    protected _evt: {};
    $on(type: any, fn: any): void;
    $emit(type: any, ...args: any[]): void;
    $off(type: any, fn: any): void;
    $remove(): void;
}
