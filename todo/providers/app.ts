import Container from "../../common/ioc/container";
import { AppContainer } from "./interface";
import { NimkeeApp } from "../../common/express/express";

export default function (c: Container) {
  c.service("App", (c) => {
    const appC = c as AppContainer;
    return new NimkeeApp(
      appC.Express,
      [appC.HttpMiddleware, appC.TodoRouter, appC.Error],
      appC.config.app.options
    );
  });
}