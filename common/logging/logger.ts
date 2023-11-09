import LoggerFactory from "./loggerFactory";

class Logger {
  constructor() {}

  private strategy = LoggerFactory.create();

  public use(strategy: string): void {
    console.log("Logger created.");
    this.strategy = LoggerFactory.create(strategy);
  }

  public info(msg: string): void {
    this.strategy.info(msg);
  }
}


export default new Logger();
