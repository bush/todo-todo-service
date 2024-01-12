import * as path from "path";
import { Express } from "express";

import Config from "./providers/config";
import ExpressApp from "../common/express/express";
import Http from "../common/express/middleware/http";
import CsrfToken from "../common/express/middleware/http";

import DatabaseFactory  from "../common/database/database-factory"; 
import TodoRepoFactory from "./todo/repo-factory";
import TodoController from "./todo/controller";
import TodoRouter from "./todo/routes";


const config = new Config(path.join(process.cwd(), ".env")).load();

const app = new ExpressApp();
const dbFactory = new DatabaseFactory();
const todoRepo = new TodoRepoFactory(dbFactory).create("electrodb");
const todoController = new TodoController(todoRepo);
const todoRouter = new TodoRouter(todoController);

const httpMiddleware = new Http({
  maxUploadLimit: config.maxUploadLimit,
  maxParameterLimit: 10,
});

app.use(httpMiddleware);
app.use(todoRouter);
app.start();
