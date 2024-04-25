import Container from "../../common/ioc/container";
import configProvider from "./config";
import logProvider from "./log";
import expressProvider from "./express";
import databaseProvider from "./database";
import todoProvider from "./todo";
import appProvider from "./app";
import { AppContainer } from "./interface";


export default function () {
  const container = new Container();
  configProvider(container);
  logProvider(container);
  expressProvider(container);
  databaseProvider(container);
  todoProvider(container);
  appProvider(container);
  return container as AppContainer;
}