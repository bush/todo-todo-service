import { Server } from "http";
import { Application } from "express";
import { INimkeeApp, INimkeeMiddleware, NimkeeAppConfig } from "./interface";

export class NimkeeApp implements INimkeeApp {
  private app: Application;
  private config: NimkeeAppConfig;
  private server: Server;
  private middleware: INimkeeMiddleware[];

  constructor(
    app: Application,
    middleware: INimkeeMiddleware[] = [],
    config: NimkeeAppConfig
  ) {
    this.app = app;
    this.middleware = middleware;
    this.config = config;
  }

  start() {

    for (const m of this.middleware) {
      m.init();
    }

    const port = this.config.port;
    return (this.server = this.app
      .listen(port, () => {
        return console.log(`Nimkee server receiving trafic at http://localhost:${port}`);
      })
      .on("error", (error) => {
        return console.log("Error: ", error.message);
      }));
  }

  stop() {
    this.server.close();
  }
}