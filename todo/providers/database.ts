import Container from "../../common/ioc/container";
import DatabaseFactory from "../../common/database/database-factory";
import { IConfigProvider } from "./config";
import { NimkeeDBClient } from "../../common/interface";
import { AppContainer } from "./interface";

export default function (c: Container) {
  c.service("TodoDatabase", (c) => {
    const appC = c as AppContainer;
    const database = appC.config.app.todo.storage.database;
    return DatabaseFactory.create(database.type, database.config);
  });
}
