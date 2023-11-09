import { ILogger } from "./interface";

class MediumLogger implements ILogger {

  public info(msg: string): void {
    console.info(`Medium LOGGER INFO: ${msg}`);
  }
}

export default MediumLogger;