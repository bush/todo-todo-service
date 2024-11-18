import { INimkeeLogger } from "./interface";
declare class BasicLogger implements INimkeeLogger {
    info(...data: any[]): void;
    warn(...data: any[]): void;
    error(...data: any[]): void;
    log(...data: any[]): void;
}
export default BasicLogger;
//# sourceMappingURL=basic.d.ts.map