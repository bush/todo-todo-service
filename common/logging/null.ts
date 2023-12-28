import { ILogger } from "./interface";

class NullLogger implements ILogger {

  public info(...data: any[]): void {
    
  }

  public warn(...data: any[]): void {
    
  }

  public error(...data: any[]): void {
    
  }
}

export default NullLogger;