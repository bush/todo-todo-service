import { Container, DatabaseFactory } from "nimkee";
import { AppContainer } from "./interface";

export default function (c: Container) {
  c.service("TodoDatabase", (c) => {
    const appC = c as AppContainer;
    const database = appC.config.app.todo.database;
    return DatabaseFactory.create(database.type, database.config);
  });
}