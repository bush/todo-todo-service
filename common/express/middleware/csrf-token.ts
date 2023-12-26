import { Application } from "express";
import logger from "../../logging/logger";
import ExpressApp from "../express";


class CsrfToken {
  public static init(expressApp: ExpressApp): void {
    const app = expressApp.express;
    logger.info("Booting CSRF Token middleware...");

		// FIXME: rework this after the auth is implemented

  }
}

export default CsrfToken;
