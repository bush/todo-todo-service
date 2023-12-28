import express, { Request, Response, NextFunction } from "express";
import StorageProviderFactory from "./storage-factory";
import TodosController from "./controller";
import ExpressApp from "../../common/express/express";

import util from "util";
import logger from "../../common/logging/logger";

class TodosRouter {
  public static init(app: ExpressApp) {
    const storageProvider = StorageProviderFactory.create("electrodb");
    const todosController = new TodosController(storageProvider);
    const todosRouter = express.Router();

    todosRouter.post(
      "/todos",
      async (req: Request, res: Response, next: NextFunction) => {   
          try {
            await todosController.create(req.body);
            res.send({ status: "success" }); 
          } catch (err) {
            next(err);
          }
      }
    );

    app.express.use("/api/v1", todosRouter);
  }
}

export default TodosRouter;
