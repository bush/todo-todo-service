import express from "express";
import Http from "./middleware/http"
import CsrfToken from "./middleware/csrf-token";


class Express {
  public express: express.Application;

  constructor(config: any) {
    this.express = express();
    this.express.locals.config = config;
  }

  public useStandardMiddleware(): void {
		this.use(Http.mount,CsrfToken.mount);
	}

  public start(port: number): void {

    // Start the server on the specified port
    this.express.listen(port, () => {
      return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
    }).on('error', (_error) => {
      return console.log('Error: ', _error.message);
    });
  }

  public use(...fns: any): void {
    for (const fn of fns) {
      if (typeof fn !== "function") {
        continue;
      }

      fn(this.express);
    }
  }
}

export default Express;