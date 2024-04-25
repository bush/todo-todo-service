import LoggerFactory from "./logger-factory";

class Logger {
  private strategy = LoggerFactory.create();
  private isOn = true;

  public use(strategy: string): void {
    console.log("Logger created.");
    this.strategy = LoggerFactory.create(strategy);
  }

  public on(): void {
    this.isOn = true
  }

  public off(): void {
    this.isOn = false;
  }

  public warn(...data: any[]): void {
    if(this.isOn) { this.strategy.warn(...data); }
  }

  public error(...data: any[]): void {
    if(this.isOn) { this.strategy.error(...data); }
  }

  public info(...data: any[]): void {
    if(this.isOn) { this.strategy.info(...data); }
  }

  public log(...data: any[]): void {
    if(this.isOn) { this.strategy.log(...data); }
  }
}

export default new Logger();
