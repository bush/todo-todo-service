import logger from "../../logging/logger";
import Collection from "./collection";
import { INimkeeDB, INimkeeDBClient } from "../interface";

class Db implements INimkeeDB {
  private client: any;
  private databaseName: string;

  constructor(client: INimkeeDBClient, databaseName: string, options?: any) {
    this.client = client;
    this.databaseName = databaseName;
  }

  public collection(collectionName: string): any {
    logger.info(`Db creating collection: ${collectionName}`);
    return new Collection(collectionName);
  }
}

export default Db;
