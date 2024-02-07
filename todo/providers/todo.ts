import Container from "../../common/ioc/container";
import TodoRepoFactory from "../todo/repo-factory";
import { ITodoRepo, ITodoController } from "../todo/interface";
import TodoController from "../todo/controller";
import { IConfigProvider } from "./config";
import { IDatabaseProvider } from "./database";
import { IExpressProvider } from "./express";
import TodoRouter from "../todo/router";

export interface ITodoProvider extends Container {
  TodoRepo: ITodoRepo;
  TodoController: ITodoController;
  TodoRouter: TodoRouter;
}

export default function (c: Container) {
  const mapper = (c as IConfigProvider).config.app.todo.storage.mapper;
  c.service("TodoRepo", (c) =>
    TodoRepoFactory.create(
      mapper.type,
      mapper.config,
      (c as IDatabaseProvider).TodoDatabase
    )
  );
  c.service(
    "TodoController",
    (c) => new TodoController((c as ITodoProvider).TodoRepo)
  );
  c.service(
    "TodoRouter",
    (c) =>
      new TodoRouter(
        (c as IExpressProvider).Express,
        (c as ITodoProvider).TodoController
      )
  );
}
