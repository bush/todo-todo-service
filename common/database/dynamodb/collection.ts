import logger from "../../logging/logger";
import {
  NimkeeDocDBClient,
  INimkeeDocDB,
  INimkeeDocDBCollection,
  NimkeeDocDBCollectionOptions,
  INimkeeDocDBDocument,
} from "../interface";

import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import {
  CreateTableCommand,
  KeySchemaElement,
  AttributeDefinition,
} from "@aws-sdk/client-dynamodb";

import { DynamoDB } from "./table";
import util from "util";
import * as CONSTANTS from "../constants";

interface NimkeeDynamoDBCollectionOptions {
  pkName?: string;
  skNames?: string[];
}

class Collection implements INimkeeDocDBCollection {
  s: any;

  constructor(
    db: INimkeeDocDB,
    name: string,
    options: NimkeeDocDBCollectionOptions = {}
  ) {
    this.s = {
      db,
      dynamodb: new DynamoDB(db.client.client),
      name,
      options,
    };

    logger.info(`collectionName: ${this.s.name}`);
  }

  private chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  // The basic idea is to resolve which values belong to the partition key,
  // and which values belong to the sort key and add a sort key prefix if
  // provided.  If the partition key is not specified, then insert
  // a default as the partition key value. If no sort keys are
  // specified, then insert 'nimkee-sk-default' as the sort key value.
  private resolveCollectionMap(
    document: INimkeeDocDBDocument
  ): INimkeeDocDBDocument {
    const tableName = this.s.db.tableName;
    const pkName =
      this.s.options.pkName || CONSTANTS.DEFAULT_PARTITION_KEY_NAME;
    const skNames = this.s.options.skNames || [];

    // Partition key value
    const pkValue = document[pkName] || CONSTANTS.DEFAULT_PARTITION_KEY_VALUE;

    // Sort key
    let skValue = this.s.name;

    // Chain the sort key names together but if one is missing then stop
    // and do not continue to chain any reamining sort key names.
    for (const name of skNames) {
      if (document[name]) {
        skValue += `#${document[name]}`;
      } else {
        logger.warn(`Sort key name ${name} not found in document.`);
        break;
      }
    }

    document[this.s.db.pkName] = pkValue;
    document[this.s.db.skName] = skValue;

    return document;
  }

  async insertMany(documents: INimkeeDocDBDocument[]): Promise<any> {
    for (const document of documents) {
      const tableName = this.s.db.tableName;
      const pkName =
        this.s.options.pkName || CONSTANTS.DEFAULT_PARTITION_KEY_NAME;
      const skNames = this.s.options.skNames || [];

      // Partition key value
      const pkValue = document[pkName] || CONSTANTS.DEFAULT_PARTITION_KEY_VALUE;

      // Sort key
      let skValue = this.s.name;

      // Chain the sort key names together but if one is missing then stop
      // and do not continue to chain any reamining sort key names.
      for (const name of skNames) {
        if (document[name]) {
          skValue += `#${document[name]}`;
        } else {
          logger.warn(`Sort key name ${name} not found in document.`);
          break;
        }
      }

      document[this.s.db.pkName] = pkValue;
      document[this.s.db.skName] = skValue;
    }
    /*
    logger.info(`insertMany`);
    const documentChunks = this.chunkArray(documents, 25);

    let results = [];

    // For every chunk of 25 movies, make one BatchWrite request.
    for (const chunk of documentChunks) {
      const putRequests = chunk.map((item) => ({
        PutRequest: {
          Item: this.resolveCollectionMap(item),
        },
      }));

      const command = new BatchWriteCommand({
        RequestItems: {
          // An existing table is required. A composite key of 'title' and 'year' is recommended
          // to account for duplicate titles.
          [this.s.db.tableName]: putRequests,
        },
      });


      //logger.info(util.inspect(putRequests, { depth: 10 }));
      logger.info(`sending batch write command`);
      //results.push(this.send(this.s.db.tableName, command));
      //results.push(this.client.send(command));
      
    }
*/
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
