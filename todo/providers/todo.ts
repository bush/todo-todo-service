import Container from "../../common/ioc/container";
import TodoRouter from "../todo/router";
import TodoController from "../todo/controller";
import TodoRepoFactory from "../todo/repo-factory";
import { AppContainer } from "./interface";

export default function (c: Container) {
  const mapper = (c as AppContainer).config.app.todo.storage.mapper;

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
  c.service(
    "TodoRouter",
    (c) =>
      new TodoRouter(
        (c as AppContainer).Express,
        (c as AppContainer).TodoController
      )
  );
}
