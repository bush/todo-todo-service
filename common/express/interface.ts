export * from "./middleware/http";
export * from "./middleware/error";
export * from './express'

export interface INimkeeMiddleware {
  init(): void;
}

export type NimkeeAppConfig = {
  env: string;
  port: number;
}

export interface INimkeeApp { 
  start(): void;
}