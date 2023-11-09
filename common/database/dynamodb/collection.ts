import logger from "../../logging/logger";
import { INimkeeDBCollection } from "../interface";

class Collection implements INimkeeDBCollection {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    logger.info(`collectionName: ${this.collectionName}`);
  }

  insertMany() {
    logger.info(`insertMany`);
    return {};
  }

  drop() {
    logger.info(`drop`);
  }

  find() {
    logger.info(`find`);
  }
}

export default Collection;
