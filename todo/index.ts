import * as path from "path";
import express from "express";
import Config from "./providers/config";
import NimkeeExpressApp from "../common/express/express";
import Http from "../common/express/middleware/http";
import DatabaseFactory from "../common/database/database-factory";
import TodoRepoFactory from "./todo/repo-factory";
import TodoController from "./todo/controller";
import TodoRouter from "./todo/routes";

import { NimkeeDBStorageMapper } from "../common/database/interface";
import { DocumentClient } from "electrodb";

const config = new Config(path.join(process.cwd(), ".env")).load();
const expressApp = express();

const httpMiddleware = new Http(expressApp, {
  maxUploadLimit: config.maxUploadLimit,
  maxParameterLimit: 10,
});

const client = DatabaseFactory.create({
  db: config.database.type,
}) as DocumentClient;

const todoRepo = TodoRepoFactory.create({
  storageMapper: NimkeeDBStorageMapper.ELECTRODB,
  config: {
    tableName: "todo5",
  },
  client,
});
const todoController = new TodoController(todoRepo);
const todoRouter = new TodoRouter(expressApp, todoController);
const app = new NimkeeExpressApp(expressApp);

// Middleware
httpMiddleware.init();

// Routers
todoRouter.init();

// Start
app.start();
