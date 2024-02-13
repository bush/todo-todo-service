import Container from "../../common/ioc/container";
import TodoRouter from "../todo/router";
import TodoController from "../todo/controller";
import TodoRepoFactory from "../todo/repo-factory";
import { AppContainer } from "./interface";

export default function (c: Container) {
  const appC = c as AppContainer;
  const mapper = appC.config.app.todo.storage.mapper;

  c.service("TodoRepo", (c) =>
    TodoRepoFactory.create(
      mapper.type,
      mapper.config,
      (c as AppContainer).TodoDatabase
    )
  );

  c.service(
    "TodoController",
    (c) => new TodoController((c as AppContainer).TodoRepo)
  );

  c.service("TodoRouter", (c) => {
    const appC = c as AppContainer;    
    return new TodoRouter(
      appC.Express,
      appC.TodoExpressRouter,
      appC.TodoController
    );
  });
}
