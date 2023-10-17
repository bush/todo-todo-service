
import { Application } from "express";
import * as bodyParser from 'body-parser';
import logger from "../../logging/logger";

class Http {
  public static mount(express: Application): void {
    logger.info("Booting HTTP middleware...");

    // Enables the request body parser
    express.use(bodyParser.json({
			limit: express.locals.config.maxUploadLimit
		}));

    express.use(bodyParser.urlencoded({
			limit: express.locals.config.maxUploadLimit,
			parameterLimit: express.locals.config.maxParameterLimit,
			extended: false
		}));

    // Disable the x-powered-by header in response
		express.disable('x-powered-by');
  }
}

export default Http;