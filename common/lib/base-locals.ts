import { Application } from "express";

class BaseLocals {

  // Child classes must provide their own config
  public static config(): any {}

  // Injects your config to the app's locals
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default BaseLocals;