import ElectroDBTodoRepo from "./database/dynamodb/electrodb";
import { ITodoRepo } from "./interface";
import { NimkeeDBClient, NimkeeDBMapperConfig, NimkeeDBMapperType } from 'nimkee';

class TodoRepoFactory {
  static create(
    mapperType: NimkeeDBMapperType,
    config: NimkeeDBMapperConfig,
    client: NimkeeDBClient
  ): ITodoRepo {
    let result: ITodoRepo;

    switch (mapperType) {
      case NimkeeDBMapperType.ELECTRODB:
        result = new ElectroDBTodoRepo(config.electrodb, client);
        break;
      default:
        throw new Error("Invalid database strategy");
    }

    return result;
  }
}

export default TodoRepoFactory;
