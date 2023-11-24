import { ILogger } from "./interface";

class MediumLogger implements ILogger {

  public warn(msg: any): void {
    console.warn(`Medium LOGGER WARN: ${msg}`);
  }

  public error(msg: any): void {
    console.error(`Medium LOGGER ERROR: ${msg}`);
  }

  public info(msg: any): void {
    console.info(`Medium LOGGER INFO: ${msg}`);
  }
}

export default MediumLogger;