import { Application, Router } from "express";
import { AppConfig } from "./config";
import { NimkeeDBClient } from "../../common/interface";
import Container from "../../common/ioc/container";
import { NimkeeApp, INimkeeMiddleware } from "../../common/interface";
import { ITodoRepo, ITodoController } from "../todo/interface";
import { NimkeeServerlessApp } from "../../common/express/sls-express";

export interface CommonContainer extends Container {
  config: AppConfig;
  Express: Application;
  TodoExpressRouter: Router;
  TodoDatabase: NimkeeDBClient;
  TodoRepo: ITodoRepo;
  TodoController: ITodoController;
  HttpMiddleware: INimkeeMiddleware;
  TodoRouter: INimkeeMiddleware;
  Error: INimkeeMiddleware;
}

export interface AppContainer extends CommonContainer {
  App: NimkeeApp;
}

export interface SeverlessAppContainer extends CommonContainer {
  ServerlessApp: NimkeeServerlessApp;
}
