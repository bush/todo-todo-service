export interface ILogger {
  warn(...data: any[]): void;
  error(...data: any[]): void;
  info(...data: any[]): void;
}