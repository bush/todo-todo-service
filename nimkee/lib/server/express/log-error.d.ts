import { Application } from "express";
import { INimkeeMiddleware } from "../interface";
/**
 * @public
 */
export declare class NimkeeLogError implements INimkeeMiddleware {
    private app;
    constructor(app: Application);
    mount(): void;
}
//# sourceMappingURL=log-error.d.ts.map