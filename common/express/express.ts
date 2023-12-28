import express, { Application } from "express";

import ExceptionHandler from "./middleware/handler";

class Express {
  public express: express.Application;

  constructor(config: any) {
    this.express = express();
    this.express.locals.controllers = {};
    this.express.locals.config = config.load();
  }
  
  start() {
    const port = this.express.locals.config.port;

    console.log(`registering the error handler...`);
    this.express.use(ExceptionHandler.logError);
    this.express.use(ExceptionHandler.generalError);
    
    // Start the server on the specified port
    return this.express.listen(port, () => {
      return console.log(`Server start at http://localhost:${port}`);
    }).on('error', (_error) => {
      return console.log('Error: ', _error.message);
    });
  }
}

export default Express;