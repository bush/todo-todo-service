import LoggerFactory from "./loggerFactory";

class Logger {
  constructor() {}

  private strategy = LoggerFactory.create();

  public use(strategy: string): void {
    console.log("Logger created.");
    this.strategy = LoggerFactory.create(strategy);
  }

  public warn(msg: any): void {
    this.strategy.warn(msg);
  }

  public error(msg: any): void {
    this.strategy.error(msg);
  }

  public info(msg: any): void {
    this.strategy.info(msg);
  }
}


export default new Logger();
