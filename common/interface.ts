import serverless from "serverless-http";

export * from './database/interface';
export * from './logging/interface';
export * from './express/express';

export interface INimkeeMiddleware {
  mount(): void;
}

export enum NimkeeDeploymentEnv {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test"
}

export enum NimkeeApplicationMode {
  SERVER = "server",
  SERVERLESS = "serverless"
}

export type NimkeeServerConfig = {
  env: string;
  mode: string;
  port: number;
}

export interface INimkeeApp {
  init(): serverless.Handler;
  start(): void;
}

export interface INimkeeServerlessApp {
  init(): void;
}