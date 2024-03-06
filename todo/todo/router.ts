import {
  Application,
  Router,
  Request,
  Response,
  NextFunction,
} from "express";

import { ITodoController } from "./interface";
import { INimkeeMiddleware } from "../../common/interface";

class TodoRouter implements INimkeeMiddleware {
  private app: Application;
  private router: Router;
  private controller: ITodoController;

  constructor(app: Application, router: Router, controller: ITodoController) {
    this.app = app;
    this.router = router;
    this.controller = controller;
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this.controller.create(req.body);
      res.send({ status: "success" });
    } catch (err) {
      next(err);
    }
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await this.controller.getAll();
      res.send(todos);
    } catch (err) {
      next(err);
    }
  }

  public init() {
    this.router.post("/todos", this.create.bind(this));
    this.router.get("/todos", this.getAll.bind(this));
    this.app.use("/api/v1", this.router);
  }
}

export default TodoRouter;