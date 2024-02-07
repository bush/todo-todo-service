import express, { Express, Request, Response, NextFunction } from "express";

import { ITodoController } from "./interface";

class TodosRouter {
  app: Express;
  todoController: ITodoController;
  todoRouter = express.Router();

  constructor(app: Express, todoController: ITodoController) {
    this.app = app;
    this.todoController = todoController;
  }

  public init() {

    this.todoRouter.post(
      "/todos",
      async (req: Request, res: Response, next: NextFunction) => {   
          try {
            await this.todoController.create(req.body);
            res.send({ status: "success" }); 
          } catch (err) {
            next(err);
          }
      }
    );

    this.app.use("/api/v1", this.todoRouter);
  }
}

export default TodosRouter;
