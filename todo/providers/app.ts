import { IExpressProvider } from "./express";
import Container from "../../common/ioc/container";
import NimkeeExpressApp from "../../common/express/express";

export interface IAppProvider extends Container {
  App: NimkeeExpressApp;
}

export default function (c: Container) {
  c.service(
    "App",
    (c) => new NimkeeExpressApp((c as IExpressProvider).Express)
  );
}