import Container from "../../common/ioc/container";
import DatabaseFactory from "../../common/database/db-factory";
import { AppContainer } from "./interface";

export default function (c: Container) {
  c.service("TodoDatabase", (c) => {
    const appC = c as AppContainer;
    const database = appC.config.app.todo.storage.database;
    return DatabaseFactory.create(database.type, database.config);
  });
}