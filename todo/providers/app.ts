import Container from "../../common/ioc/container";
import { AppContainer } from "./interface";
import { NimkeeExpressApp } from "../../common/express/express";

export default function (c: Container) {
  c.service(
    "App",
    (c) => new NimkeeExpressApp((c as AppContainer).Express)
  );
}