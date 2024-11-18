import express  from "express";
import { Container } from "nimkee";

export default function (c: Container) {
  c.service("Express", c => express());
  c.service("TodoExpressRouter", c => express.Router());
}