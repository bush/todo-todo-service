import logger from "../../logging/logger";
import express, { Express, Application } from 'express';
import ExpressApp from "../express";

export type HttpConfig = {
  maxUploadLimit: number,
  maxParameterLimit: number
} 

import { IMiddleware } from "../express";

class Http implements IMiddleware {
  config: HttpConfig

  constructor(config: HttpConfig) {
    this.config = config;
  }

  public add(app: Express): void {
    app.use(express.json({ limit: this.config.maxUploadLimit }));
    app.use(express.urlencoded({
			limit: this.config.maxUploadLimit,
			parameterLimit: this.config.maxParameterLimit,
			extended: false
		}));

		app.disable('x-powered-by');
  }
}

export default Http;