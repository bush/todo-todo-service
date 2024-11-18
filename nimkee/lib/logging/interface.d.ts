/**
 * @public
 */
export declare enum NimkeeLoggerType {
    BASIC = "basic"
}
/**
 * @public
 */
export interface INimkeeLogger {
    warn(...data: any[]): void;
    error(...data: any[]): void;
    info(...data: any[]): void;
    log(...data: any[]): void;
}
//# sourceMappingURL=interface.d.ts.map