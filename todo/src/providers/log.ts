import { Container, LoggerFactory } from "nimkee";
import { AppContainer } from "./interface";

export default function (c: Container) {
  c.service("Logger", (c) => {
    const appC = c as AppContainer;
    const logger = appC.config.app.logger;
    return LoggerFactory.create(logger);
  });
}