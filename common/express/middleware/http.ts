import express, { Express } from 'express';

export type HttpConfig = {
  maxUploadLimit: number,
  maxParameterLimit: number
} 


class Http {
  private app: Express;
  private config: HttpConfig

  constructor(app: Express, config: HttpConfig) {
    this.app = app;
    this.config = config;
  }

  public init(): void {
    this.app.use(express.json({ limit: this.config.maxUploadLimit }));
    this.app.use(express.urlencoded({
			limit: this.config.maxUploadLimit,
			parameterLimit: this.config.maxParameterLimit,
			extended: false
		}));

		this.app.disable('x-powered-by');
  }
}

export default Http;