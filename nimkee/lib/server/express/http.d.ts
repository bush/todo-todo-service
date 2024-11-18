import { Application } from "express";
import { OptionsUrlencoded, OptionsJson } from "body-parser";
import { INimkeeMiddleware } from "../interface";
/**
 * @public
 */
export type HttpConfig = {
    urlencoded?: OptionsUrlencoded;
    json?: OptionsJson;
};
/**
 * @public
 */
export declare class NimkeeHttpMiddleware implements INimkeeMiddleware {
    private app;
    private config;
    constructor(app: Application, config: HttpConfig);
    mount(): void;
}
//# sourceMappingURL=http.d.ts.map