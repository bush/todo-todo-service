import express, { Express } from "express";
import { OptionsUrlencoded, OptionsJson } from "body-parser";

export type HttpConfig = {
  urlencoded?: OptionsUrlencoded;
  json?: OptionsJson;
};

class Http {
  private app: Express;
  private config: HttpConfig;

  constructor(
    app: Express,
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

export default Http;
