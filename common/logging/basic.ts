import { ILogger } from "./interface";

class BasicLogger implements ILogger {

  public info(msg: string): void {
    console.info(`BASIC LOGGER INFO: ${msg}`);
  }
}

export default BasicLogger;