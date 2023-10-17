import { Application } from "express";
import logger from "../../logging/logger";

class CsrfToken {
  public static mount(express: Application): void {
    logger.info("Booting CSRF Token middleware...");

		// FIXME: rework this after the auth is implemented

  }
}

export default CsrfToken;
