export enum NimkeeLoggerType {
  BASIC='basic',
}

export interface INimkeeLogger {
  warn(...data: any[]): void;
  error(...data: any[]): void;
  info(...data: any[]): void;
  log(...data: any[]): void;
}