import { Application } from "express";
import { INimkeeMiddleware } from "../interface";
/**
 * @public
 */
export declare class NimkeeGeneralError implements INimkeeMiddleware {
    private app;
    constructor(app: Application);
    mount(): void;
}
//# sourceMappingURL=general-error.d.ts.map