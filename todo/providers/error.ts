import Container from "../../common/ioc/container";
import { AppContainer } from "./interface";
import { NimkeeError } from "../../common/interface";

export default function (c: Container) {
  c.service("Error", (c) => {
    const appC = c as AppContainer;
    return new NimkeeError(appC.Express);
  });
}