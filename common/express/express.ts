import { Server } from "http";
import { Express } from "express";
import ExceptionHandler from "./middleware/handler";

class NimkeeExpressApp {
  private app: Express;
  private server: Server;

  constructor(app: Express) {
    this.app = app;
  }

  start() {
    const port = 3000;    
    this.app.use(ExceptionHandler.logError);
    this.app.use(ExceptionHandler.generalError);
    
    // Start the server on the specified port
    return this.server = this.app.listen(port, () => {
      return console.log(`Server start at http://localhost:${port}`);
    }).on('error', (error) => {
      return console.log('Error: ', error.message);
    });
  }

  stop() {
    this.server.close();
  }
}

export default NimkeeExpressApp;