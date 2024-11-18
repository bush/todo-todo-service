import { INimkeeLogger, NimkeeLoggerType } from "./interface";
import BasicLogger from "./basic";

/**
 * @public
 */
export class LoggerFactory {
  public static create(strategy?: string): INimkeeLogger {
    switch (strategy) {
      case NimkeeLoggerType.BASIC:
        return new BasicLogger();
      default:
        return new BasicLogger();
    }
  }
}