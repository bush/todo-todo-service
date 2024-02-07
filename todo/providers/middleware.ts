import Container from "../../common/ioc/container";
import HttpMiddleware from "../../common/express/middleware/http";
import { IExpressProvider } from "./express";
import { IConfigProvider } from "./config";

export interface IMiddlewareProvider extends Container {
  HttpMiddleware: HttpMiddleware;
}

export default function (c: Container) {
  const express = (c as IExpressProvider).Express;
  const http = (c as IConfigProvider).config.app.middleware.http;

  c.service(    
    "HttpMiddleware",
    (c) => new HttpMiddleware(express, http)
  );
}
