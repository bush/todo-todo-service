import { ILogger } from "./loggerFactory";

class BasicLogger implements ILogger {

  public info(...data: any[]): void {
    console.info(...data);
  }

  public warn(...data: any[]): void {
    console.warn(...data);
  }

  public error(...data: any[]): void {
    console.error(...data);
  }
}

export default BasicLogger;