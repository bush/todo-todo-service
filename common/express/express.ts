import serverless from "serverless-http";
import { Server } from "http";
import { Application } from "express";
import {
  INimkeeApp,
  INimkeeMiddleware,
  NimkeeServerConfig,
} from "../interface";

export class NimkeeApp implements INimkeeApp {
  private server: Server;
  
  constructor(
    private app: Application,
    private config: NimkeeServerConfig,
    private middleware: INimkeeMiddleware[]
  ) {}

  init() {
    for (const m of this.middleware) {
      m.mount();
    }

    return serverless(this.app);
  }

  start() {
    const port = this.config.port;

    this.server = this.app
      .listen(port, () => {
        return console.log(
          `Nimkee server receiving trafic at http://localhost:${port}`
        );
      })
      .on("error", (error) => {
        return console.log("Error: ", error.message);
      });
  }

  stop() {
    this.server.close();
  }
}
