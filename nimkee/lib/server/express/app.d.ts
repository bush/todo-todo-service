import serverless from "serverless-http";
import { Application } from "express";
import { INimkeeMiddleware } from "../interface";
import { INimkeeApp, NimkeeServerConfig } from "../interface";
/**
 * @public
 */
export declare class NimkeeExpressApp implements INimkeeApp {
    private app;
    private config;
    private middleware;
    private server;
    constructor(app: Application, config: NimkeeServerConfig, middleware: INimkeeMiddleware[]);
    init(): serverless.Handler;
    start(): void;
    stop(): void;
}
//# sourceMappingURL=app.d.ts.map