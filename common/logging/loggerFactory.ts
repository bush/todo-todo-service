import BasicLogger from "./basic";

export interface ILogger {
  warn(...data: any[]): void;
  error(...data: any[]): void;
  info(...data: any[]): void;
}

class LoggerFactory {
  public static create(strategy?: string): ILogger {
    switch (strategy) {
      case "basic":
        return new BasicLogger();
      default:
        return new BasicLogger();
    }
  }
}

export default LoggerFactory;
