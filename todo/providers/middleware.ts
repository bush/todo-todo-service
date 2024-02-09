import { AppContainer } from "./interface";
import { Http as HttpMiddleware } from "../../common/interface";
import Container from "../../common/ioc/container";


export default function (c: Container) {
  const express = (c as AppContainer).Express;
  const http = (c as AppContainer).config.app.middleware.http;

  c.service(    
    "HttpMiddleware",
    (c) => new HttpMiddleware(express, http)
  );
}
