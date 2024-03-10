import Container from "../../common/ioc/container";
import { SeverlessAppContainer } from "./interface";
import { NimkeeServerlessApp } from "../../common/express/sls-express";

export default function (c: Container) {
  c.service("ServerlessApp", (c) => {
    const appC = c as SeverlessAppContainer;
    return new NimkeeServerlessApp(appC.Express, [
      appC.HttpMiddleware,
      appC.TodoRouter,
      appC.Error,
    ]);
  });
}