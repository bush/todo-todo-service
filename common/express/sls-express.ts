import { Server } from "http";
import { Application } from "express";
import serverless from "serverless-http";
import { INimkeeServerlessApp, INimkeeMiddleware, NimkeeAppConfig } from "./interface";

export class NimkeeServerlessApp implements INimkeeServerlessApp {
  private app: Application;
  private middleware: INimkeeMiddleware[];

  constructor(
    app: Application,
    middleware: INimkeeMiddleware[] = [],
  ) {
    this.app = app;
    this.middleware = middleware;
  }

  init() {
    for (const m of this.middleware) {
      m.init();
    }

    console.log("Serverless app initialized");
    return serverless(this.app);
  }

}
