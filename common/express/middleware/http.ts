import express, { Application } from "express";
import { OptionsUrlencoded, OptionsJson } from "body-parser";
import { INimkeeMiddleware } from "../../interface";

export type HttpConfig = {
  urlencoded?: OptionsUrlencoded;
  json?: OptionsJson;
};

export class NimkeeHttpMiddleware implements INimkeeMiddleware {
  constructor(private app: Application, private config: HttpConfig) {}

  public mount(): void {
    this.app.use(express.json(this.config.json));
    this.app.use(express.urlencoded(this.config.urlencoded));
    this.app.disable("x-powered-by");
  }
}
