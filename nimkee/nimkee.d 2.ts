import { Application } from 'express';
import { DocumentClient } from 'electrodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Express as Express_2 } from 'express';
import { MongoClient } from 'mongodb';
import { MongoClientOptions } from 'mongodb';
import { OptionsJson } from 'body-parser';
import { OptionsUrlencoded } from 'body-parser';
import serverless from 'serverless-http';

/**
 * @public
 */
export declare class Container {
    services: any;
    constructor();
    service(name: string, cb: (c: Container) => any): this;
}

/**
 * @public
 */
export declare class DatabaseFactory {
    static create(dbType: NimkeeDBType, config: NimkeeDBConfig): DocumentClient | DynamoDBClient | MongoClient;
}

/**
 * @public
 */
export declare type DynamoDBConfig = {};

/**
 * @public
 */
export declare type HttpConfig = {
    urlencoded?: OptionsUrlencoded;
    json?: OptionsJson;
};

/**
 * @public
 */
export declare interface INimkeeApp {
    init(): serverless.Handler;
    start(): void;
}

/**
 * @public
 */
export declare interface INimkeeLogger {
    warn(...data: any[]): void;
    error(...data: any[]): void;
    info(...data: any[]): void;
    log(...data: any[]): void;
}

/**
 * @public
 */
export declare interface INimkeeMiddleware {
    mount(): void;
}

/**
 * @public
 */
export declare interface INimkeeRepo {
    empty(): Promise<void>;
}

/**
 * @public
 */
export declare interface INimkeeServerlessApp {
    init(): void;
}

/**
 * @public
 */
export declare type MongoDBConfig = {
    url: string;
    options?: MongoClientOptions;
};

declare namespace NIMKEE {
    export {
        NimkeeExpressApp,
        NimkeeGeneralError,
        HttpConfig,
        NimkeeHttpMiddleware,
        NimkeeLogError,
        DatabaseFactory,
        NimkeeDeploymentEnv,
        NimkeeApplicationMode,
        INimkeeServerlessApp,
        NimkeeDBType,
        DynamoDBConfig,
        MongoDBConfig,
        NimkeeDBConfig,
        NimkeeDBStrategy,
        NimkeeRepo,
        INimkeeRepo,
        NimkeeDBClient,
        NimkeeLoggerType,
        INimkeeLogger,
        NimkeeServerConfig,
        INimkeeMiddleware,
        INimkeeApp,
        Container
    }
}
export { NIMKEE }

/**
 * @public
 */
export declare enum NimkeeApplicationMode {
    SERVER = "server",
    SERVERLESS = "serverless"
}

/**
 * @public
 */
export declare type NimkeeDBClient = DocumentClient;

/**
 * @public
 */
export declare type NimkeeDBConfig = DynamoDBConfig | MongoDBConfig;

/**
 * @public
 */
export declare type NimkeeDBStrategy = {
    client: string;
    config?: NimkeeDBConfig;
};

/**
 * @public
 */
export declare enum NimkeeDBType {
    DYNAMODB = "dynamodb",
    MONGODB = "mongodb"
}

/**
 * @public
 */
export declare enum NimkeeDeploymentEnv {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    TEST = "test"
}

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

/**
 * @public
 */
export declare class NimkeeGeneralError implements INimkeeMiddleware {
    private app;
    constructor(app: Express_2);
    mount(): void;
}

/**
 * @public
 */
export declare class NimkeeHttpMiddleware implements INimkeeMiddleware {
    private app;
    private config;
    constructor(app: Express_2, config: HttpConfig);
    mount(): void;
}

/**
 * @public
 */
export declare class NimkeeLogError implements INimkeeMiddleware {
    private app;
    constructor(app: Express_2);
    mount(): void;
}

/**
 * @public
 */
export declare enum NimkeeLoggerType {
    BASIC = "basic"
}

/**
 * @public
 */
export declare type NimkeeRepo = string;

/**
 * @public
 */
export declare type NimkeeServerConfig = {
    env: string;
    mode: string;
    port: number;
};

export { }
