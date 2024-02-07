import Container from "../../common/ioc/container";
import DatabaseFactory from "../../common/database/database-factory";
import { IConfigProvider } from "./config";
import { NimkeeDBClient } from "../../common/interface";

export interface IDatabaseProvider extends Container {
  TodoDatabase: NimkeeDBClient;
}

export default function (c: Container) {
  const database = (c as IConfigProvider).config.app.todo.storage.database;
  c.service("TodoDatabase", (c) => DatabaseFactory.create(database.type, database.config));
}
