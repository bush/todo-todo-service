import Container from "../../common/ioc/container";
import { AppContainer } from "./interface";
import { NimkeeApp } from "../../common/express/express";
import { NimkeeGeneralError } from "../../common/express/middleware/general-error";
import { NimkeeLogError } from "../../common/express/middleware/log-error";
import { NimkeeHttpMiddleware } from "../../common/express/middleware/http";
import TodoRoutes from "../todo/routes"

export default function (c: Container) {
  c.service("NimkeeHttpMiddleware", (c) => {
    const appC = c as AppContainer;
    return new NimkeeHttpMiddleware(appC.Express, appC.config.app.middleware.http);
  });

  c.service("TodoRoutes", (c) => {
    const appC = c as AppContainer;    
    return new TodoRoutes(
      appC.Express,
      appC.TodoExpressRouter,
      appC.TodoController
    );
  });

  c.service("NimkeeGeneralError", (c) => {
    const appC = c as AppContainer;
    return new NimkeeGeneralError(appC.Express);
  });

  c.service("NimkeeLogError", (c) => {
    const appC = c as AppContainer;
    return new NimkeeLogError(appC.Express, appC.Logger);
  });

  c.service("App", (c) => {
    const appC = c as AppContainer;
    const app = appC.Express;

    return new NimkeeApp(appC.Express, appC.config.app.server, [
      appC.NimkeeHttpMiddleware,
      appC.TodoRoutes,
      appC.NimkeeLogError,
      appC.NimkeeGeneralError
    ]);
  });
} 
