import { AppContainer } from "./interface";
import { Http as HttpMiddleware } from "../../common/interface";
import Container from "../../common/ioc/container";

export default function (c: Container) {
  c.service("HttpMiddleware", (c) => {
    const appC = c as AppContainer;
    return new HttpMiddleware(appC.Express, appC.config.app.middleware.http);
  });
}
