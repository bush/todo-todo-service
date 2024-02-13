import express, { Application } from "express";
import { OptionsUrlencoded, OptionsJson } from "body-parser"
import { INimkeeMiddleware } from "../interface";

export type HttpConfig = {
  urlencoded?: OptionsUrlencoded;
  json?: OptionsJson;
};

export class Http implements INimkeeMiddleware {
  private app: Application;
  private config: HttpConfig;

  constructor(
    app: Application,
    config: HttpConfig
  ) {
    this.app = app;
    this.config = config;
  }

  public init(): void {
    this.app.use(express.json(this.config.json));
    this.app.use(express.urlencoded(this.config.urlencoded));
    this.app.disable("x-powered-by");
  }
}