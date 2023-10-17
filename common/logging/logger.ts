class Logger {
  constructor() {}

  static create(): Logger {
    return new Logger();
  }

  public info(msg: string): void {
    console.log(`INFO: ${msg}`);
  }
}

export default Logger.create();
