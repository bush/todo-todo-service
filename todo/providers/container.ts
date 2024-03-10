import Container from "../../common/ioc/container";
import configProvider from "./config";
import expressProvider from "./express";
import middlewareProvider from "./middleware";
import databaseProvider from "./database";
import todoProvider from "./todo";
import errorProvider from "./error";
import appProvider from "./app";
import serverlessAppProvider from "./sls-app";
import { AppContainer, SeverlessAppContainer } from "./interface";


function commonContainer() {
  const container = new Container();
  configProvider(container);
  expressProvider(container);
  middlewareProvider(container);
  databaseProvider(container);
  todoProvider(container);
  errorProvider(container);
  return container;
}

export function createServerlessContainer() {
  const container = commonContainer();
  serverlessAppProvider(container);
  return container as SeverlessAppContainer;
}

export default function () {
  const container = commonContainer();
  appProvider(container);
  return container as AppContainer;
}