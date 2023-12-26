import { Application, Request, Response, NextFunction } from "express";
import ExpressApp from "../express";

class ErrorHandler {
  static init(expressApp: ExpressApp) {
    const app = expressApp.express;

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if(err) {
        res.status(err.status || 500).json({
          msg: err.msg || 'Error'
        });
      }
    }); 
  }
}

export default ErrorHandler;
