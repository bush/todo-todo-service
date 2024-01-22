import ElectroDBTodoStorage from "./electrodb/electrodb";
import { ITodoRepo } from "./interface";
import {
  NimkeeDBStorageMapper,
  NimkeeDBMapperStrategy,
  NimkeeDBMapperConfig,
} from "../../common/database/interface";

class TodoRepoFactory {
  static create(strategy: NimkeeDBMapperStrategy): ITodoRepo {
    let result: ITodoRepo;

    switch (strategy.storageMapper) {
      case NimkeeDBStorageMapper.ELECTRODB:
        const config = strategy.config as NimkeeDBMapperConfig;
        result = new ElectroDBTodoStorage(config.tableName, strategy.client);
        break;
      default:
        throw new Error("Invalid database strategy");
    }

    return result;
  }
}

export default TodoRepoFactory;
