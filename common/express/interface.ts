import { Application } from "serverless-http";

export * from "./middleware/http";
export * from "./middleware/error";
export * from './express'

export interface INimkeeMiddleware {
  init(): void;
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

export type NimkeeAppConfig = {
  env: string;
  mode: string;
  port: number;
}

export interface INimkeeApp { 
  start(): void;
}

export interface INimkeeServerlessApp {
  init(): void;
}