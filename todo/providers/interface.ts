import { Express } from "express";
import { AppConfig } from "./config";
import { NimkeeDBClient } from "../../common/interface";
import TodoRouter from "../todo/router";
import Container from "../../common/ioc/container";
import * as Nimkee from "../../common/interface";
import { ITodoRepo, ITodoController } from "../todo/interface";

export interface AppContainer extends Container {
  config: AppConfig;
  Express: Express;
  HttpMiddleware: Nimkee.Http;
  TodoDatabase: NimkeeDBClient;
  TodoRepo: ITodoRepo;
  TodoController: ITodoController;
  TodoRouter: TodoRouter;
  App: Nimkee.NimkeeExpressApp;
}
