import express, { Application } from "express";

class Express {
  public express: express.Application;

  constructor(config: any) {
    this.express = express();
    this.express.locals.controllers = {};
    this.express.locals.config = config.load();
  }
  
  start() {
    const port = this.express.locals.config.port;

    // Start the server on the specified port
    return this.express.listen(port, () => {
      return console.log(`Server start at http://localhost:${port}`);
    }).on('error', (_error) => {
      return console.log('Error: ', _error.message);
    });
  }
}

export default Express;