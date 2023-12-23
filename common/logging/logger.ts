import LoggerFactory from "./loggerFactory";

class Logger {
  constructor() {}

  private strategy = LoggerFactory.create();

  public use(strategy: string): void {
    console.log("Logger created.");
    this.strategy = LoggerFactory.create(strategy);
  }

  public warn(...data: any[]): void {
    this.strategy.warn(...data);
  }

  public error(...data: any[]): void {
    this.strategy.error(...data);
  }

  public info(...data: any[]): void {
    this.strategy.info(...data);
  }
}


export default new Logger();
