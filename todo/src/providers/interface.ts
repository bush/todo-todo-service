import { Application, Router } from "express";
import { AppConfig } from "../config";
import { NimkeeDBClient } from "nimkee";
import { Container } from "nimkee";
import { NimkeeExpressApp, INimkeeMiddleware } from "nimkee";
import { ITodoRepo, ITodoController } from "../todo/interface";
import { INimkeeLogger } from "nimkee/src/logging/interface";

export interface CommonContainer extends Container {
  config: AppConfig;
  Logger: INimkeeLogger;
  Express: Application;
  TodoExpressRouter: Router;
  TodoDatabase: NimkeeDBClient;
  TodoRepo: ITodoRepo;
  TodoController: ITodoController;
  NimkeeHttpMiddleware: INimkeeMiddleware;
  TodoRoutes: INimkeeMiddleware;
  NimkeeLogError: INimkeeMiddleware;
  NimkeeGeneralError: INimkeeMiddleware;
  Error: INimkeeMiddleware;
}

export interface AppContainer extends CommonContainer {
  App: NimkeeExpressApp;
}