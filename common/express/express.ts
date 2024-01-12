import express, { Application, Express } from "express";
import ExceptionHandler from "./middleware/handler";

export interface IMiddleware {
  add(app: Express): void;
}

class ExpressApp {
  private _express = express();
  private config: any;

  constructor(config?: any) {
    this.config = config;
  }

  use(middleware: IMiddleware) {
    middleware.add(this._express);
  }

  get express() {
    return this._express;
  }

  start() {
    const port = 3000;    
    this._express.use(ExceptionHandler.logError);
    this._express.use(ExceptionHandler.generalError);
    
    // Start the server on the specified port
    return this._express.listen(port, () => {
      return console.log(`Server start at http://localhost:${port}`);
    }).on('error', (_error) => {
      return console.log('Error: ', _error.message);
    });
  }
}

export default ExpressApp;