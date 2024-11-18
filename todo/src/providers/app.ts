import {
  Container,
  NimkeeExpressApp,
  NimkeeGeneralError,
  NimkeeLogError,
  NimkeeHttpMiddleware,
} from "nimkee";
import { AppContainer } from "./interface";
import TodoRoutes from "../todo/routes";

export default function (c: Container) {
  c.service("NimkeeHttpMiddleware", (c) => {
    const appC = c as AppContainer;
    return new NimkeeHttpMiddleware(
      appC.Express,
      appC.config.app.middleware.http
    );
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
    return new NimkeeLogError(appC.Express);
  });

  c.service("App", (c) => {
    const appC = c as AppContainer;
    const app = appC.Express;

    return new NimkeeExpressApp(appC.Express, appC.config.app.server, [
      appC.NimkeeHttpMiddleware,
      appC.TodoRoutes,
      appC.NimkeeLogError,
      appC.NimkeeGeneralError,
    ]);
  });
}
