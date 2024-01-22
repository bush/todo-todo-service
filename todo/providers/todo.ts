import Container from "../../common/ioc/container";
import TodoRepoFactory from "../todo/repo-factory";
import { ITodoRepo, ITodoController } from "../todo/interface";
import TodoController from "../todo/controller";

export interface IUserProvider extends Container {
  TodoRepo: ITodoRepo;
  TodoController: ITodoController;
  
}

export default function (c: Container, config: any) {
  c.service("TodoRepo", (c) => TodoRepoFactory.create(config.db.strategy));
  c.service("TodoController", (c) => new TodoController((c as IUserProvider).TodoRepo));
  c.service("UserProvider", (c) => c);
}
