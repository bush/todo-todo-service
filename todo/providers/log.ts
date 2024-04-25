import Container from "../../common/ioc/container";
import { AppContainer } from "./interface";
import LoggerFactory from "../../common/logging/logger-factory";

export default function (c: Container) {
  c.service("Logger", (c) => {
    const appC = c as AppContainer;
    const logger = appC.config.app.logger;
    return LoggerFactory.create(logger);
  });
}