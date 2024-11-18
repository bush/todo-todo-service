declare class Logger {
    private strategy;
    private isOn;
    use(strategy: string): void;
    on(): void;
    off(): void;
    warn(...data: any[]): void;
    error(...data: any[]): void;
    info(...data: any[]): void;
    log(...data: any[]): void;
}
declare const _default: Logger;
export default _default;
//# sourceMappingURL=logger.d.ts.map