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
          const todo = await todosController.create(req.body);
          res.json({ status: "success", data: todo });
        } catch (err: any) {
          err.message = err.message ? err.message : "Error creating todo";
          logger.error(`Error creating todo: ${err.message}`);
          next(err);
        }
      }
    );

    app.express.use("/api/v1", todosRouter);
  }
}

export default TodosRouter;
