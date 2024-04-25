import { INimkeeLogger } from "./interface";

class BasicLogger implements INimkeeLogger {

  public info(...data: any[]): void {
    console.info(...data);
  }

  public warn(...data: any[]): void {
    console.warn(...data);
  }

  public error(...data: any[]): void {
    console.error(...data);
  }

  public log(...data: any[]): void {
    console.log(...data);
  }
}

export default BasicLogger;