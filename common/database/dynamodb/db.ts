import logger from "../../logging/logger";
import Collection from "./collection";
import * as CONSTANTS from "../constants";
import {
  NimkeeDocDBOptions,
  NimkeeDocDBCollectionOptions,
  INimkeeDocDB,
  INimkeeDocDBClient,
} from "../interface";

interface DbPrivate {
  tableName: string;
  pkName: string;
  skName: string;
}

class Db implements INimkeeDocDB {
  s: DbPrivate;
  readonly client;

  constructor(
    client: INimkeeDocDBClient,
    databaseName: string,
    options: NimkeeDocDBOptions = {}
  ) {

    this.s = {
      tableName: databaseName,
      pkName: options.pkName || CONSTANTS.DEFAULT_PARTITION_KEY_NAME,
      skName: options.skName || CONSTANTS.DEFAULT_SORT_KEY_NAME
    };

    this.client = client;

    // TODO: Try to create the table if it doesn't exist
    // client.createTable(tableName, options.pk, options.sk);
  }

  public get tableName() {
    return this.s.tableName;
  }

  public get pkName() {
    return this.s.pkName;
  }

  public get skName() {
    return this.s.skName;
  }

  get dbClient() {
    return this.client.client;
  }

  public collection(name: string, options: NimkeeDocDBCollectionOptions = {}): any {
    logger.info(`Db creating collection: ${name}`);

    // TODO: Try to create the collection if it doesn't exist
    // Read the collections table to see if the collection exists
    // If it doesn't exist, then create it and pass the options
    // If it does exist then pass the options read from the collection table and log
    // a warning if the options passed in are different from the options read from the
    // collection table.
    return new Collection(this, name, options);
  }
}

export default Db;
