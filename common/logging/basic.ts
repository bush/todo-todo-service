import { ILogger } from "./interface";

class BasicLogger implements ILogger {

  public info(msg: any): void {
    console.info(`BASIC LOGGER INFO: ${msg}`);
  }

  public warn(msg: any): void {
    console.warn(`BASIC LOGGER WARN: ${msg}`);
  }
  
  public error(msg: any): void {
    console.error(`BASIC LOGGER ERROR: ${msg}`);
  }
}

export default BasicLogger;