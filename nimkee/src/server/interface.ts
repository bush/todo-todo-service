import serverless from "serverless-http";

/**
 * @public
 */
export type NimkeeServerConfig = {
  env: string;
  mode: string;
  port: number;
}

/**
 * @public
 */
export interface INimkeeMiddleware {
  mount(): void;
}

/**
 * @public
 */
export interface INimkeeApp {
  init(): serverless.Handler;
  start(): void;
}