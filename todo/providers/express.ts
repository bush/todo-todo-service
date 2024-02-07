import express, { Express } from "express";
import Container from "../../common/ioc/container";

export interface IExpressProvider extends Container {
  Express: Express;
}

export default function (c: Container) {
  c.service("Express", c => express());
}