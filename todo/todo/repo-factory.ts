import ElectroDBTodoStorage from "./electrodb/electrodb";
import { ITodoRepo } from "./interface";
import {
  NimkeeDBStorageMapper,
  NimkeeDBMapperConfig,
  ElectroDBMapperConfig,
} from "../todo/interface";
import { NimkeeDBClient } from "../../common/interface";
import { DocumentClient } from "electrodb";

class TodoRepoFactory {
  static create(
    mapperType: NimkeeDBStorageMapper,
    config: NimkeeDBMapperConfig,
    client: NimkeeDBClient
  ): ITodoRepo {
    let result: ITodoRepo;

    switch (mapperType) {
      case NimkeeDBStorageMapper.ELECTRODB:
        const electorConfig = config as ElectroDBMapperConfig;
        result = new ElectroDBTodoStorage(
          config.table,
          client as DocumentClient
        );
        break;
      default:
        throw new Error("Invalid database strategy");
    }

    return result;
  }
}

export default TodoRepoFactory;
