import logger from "../../logging/logger";
import express from 'express';
import ExpressApp from "../express";

class Http {
  public static init(expressApp: ExpressApp): void {
    logger.info(`Booting HTTP middleware`);
    const app = expressApp.express;

    app.use(express.json({ limit: app.locals.config.maxUploadLimit }));

    app.use(express.urlencoded({
			limit: app.locals.config.maxUploadLimit,
			parameterLimit: app.locals.config.maxParameterLimit,
			extended: false
		}));

		app.disable('x-powered-by');
  }
}

export default Http;