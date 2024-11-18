export * from './database/interface';
export * from './logging/interface';

export * from './server/interface';
export { Container } from './ioc/container';

export { NimkeeExpressApp } from './server/express/app'
export { NimkeeGeneralError } from './server/express/general-error';
export { type HttpConfig, NimkeeHttpMiddleware } from './server/express/http'
export { NimkeeLogError } from './server/express/log-error';
export { DatabaseFactory } from './database/db-factory';
export { LoggerFactory } from './logging/logger-factory';
export { NimkeeDBType, NimkeeDBMapperType } from './database/interface';

/**
 * @public
 */
export enum NimkeeDeploymentEnv {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test"
}

/**
 * @public
 */
export enum NimkeeApplicationMode {
  SERVER = "server",
  SERVERLESS = "serverless"
}

/**
 * @public
 */
export interface INimkeeServerlessApp {
  init(): void;
}