import { Container } from "nimkee";
import TodoController from "../todo/controller";
import TodoRepoFactory from "../todo/repo-factory";
import { AppContainer } from "./interface";

export default function (c: Container) {
  const appC = c as AppContainer;
  const mapper = appC.config.app.todo.database.mapper;

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
}
