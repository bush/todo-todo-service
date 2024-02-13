import { Application, Router } from "express";
import { AppConfig } from "./config";
import { NimkeeDBClient } from "../../common/interface";
import Container from "../../common/ioc/container";
import { NimkeeApp, INimkeeMiddleware } from "../../common/interface";
import { ITodoRepo, ITodoController } from "../todo/interface";

export interface AppContainer extends Container {
  config: AppConfig;
  Express: Application;
  TodoExpressRouter: Router;
  TodoDatabase: NimkeeDBClient;
  TodoRepo: ITodoRepo;
  TodoController: ITodoController;
  HttpMiddleware: INimkeeMiddleware;
  TodoRouter: INimkeeMiddleware;
  Error: INimkeeMiddleware
  App: NimkeeApp;
}