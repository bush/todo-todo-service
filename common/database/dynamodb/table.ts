import logger from "../../logging/logger";

import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  QueryCommandInput,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import {
  AttributeDefinition,
  CreateTableCommand,
  DeleteTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  KeySchemaElement,
} from "@aws-sdk/client-dynamodb";

export class DynamoDB {
  private static defaultClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({})
  );
  private client: DynamoDBDocumentClient;
  private tableName: string;
  private pkName: string;
  private skName: string;

  constructor(tableName: string, pkName: string, skName: string, docClient?: DynamoDBDocumentClient) {
    this.client = docClient ? docClient : DynamoDB.defaultClient;
    this.tableName = tableName;
    this.pkName = pkName;
    this.skName = skName;
  }

  static async describeTable(
    tableName: string,
    docClient?: DynamoDBDocumentClient
  ) {
    let result;

    const client = docClient ? docClient : this.defaultClient;
    

    try {
      const describeTableCommand = new DescribeTableCommand({
        TableName: tableName,
      });
      result = client.send(describeTableCommand);
    } catch (err) {
      logger.error(`Error occurred while describing the table: ${err}`);
      throw err;
    }

    return result;
  }

  static async init(
    tableName: string,
    pkName: string,
    skName: string,
    docClient?: DynamoDBDocumentClient
  ) {
    let result;

    const client = docClient ? docClient : this.defaultClient;

    const tableParams = {
      TableName: tableName,
      KeySchema: [
        { AttributeName: pkName, KeyType: "HASH" },
        { AttributeName: skName, KeyType: "RANGE" },
      ] as KeySchemaElement[],
      AttributeDefinitions: [
        { AttributeName: pkName, AttributeType: "S" },
        { AttributeName: skName, AttributeType: "S" },
      ] as AttributeDefinition[],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    };

    const createTableCommand = new CreateTableCommand(tableParams);

    let active = false;

    await client.send(createTableCommand);
    result = await this.describeTable(tableName, client);
    active = result.Table?.TableStatus === "ACTIVE" ? true : false;
    while (result.Table?.TableStatus === "CREATING") {
      await new Promise((res) => setTimeout(res, 1000));
      logger.info(`Table is being created: ${result.Table?.TableStatus}`);
      result = await this.describeTable(tableName, client);
    }

    return new DynamoDB(tableName, pkName, skName, client);
  }

  static async deleteTable(
    tableName: string,
    docClient?: DynamoDBDocumentClient
  ) {
    let result;

    const client = docClient ? docClient : this.defaultClient;

    const deleteTableCommand = new DeleteTableCommand({
      TableName: tableName,
    });
    try {
      await client.send(deleteTableCommand);
      result = await this.describeTable(tableName);
      while (result.Table?.TableStatus === "DELETING") {
        logger.info(`Table is being deleted: ${result.Table?.TableStatus}`);
        await new Promise((res) => setTimeout(res, 1000));
        result = await this.describeTable(tableName);
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "ResourceNotFoundException"
      ) {
        logger.info(`Table does not exist: ${tableName}`);
        result = { status: "success" };
      } else {
        logger.error(`Error occurred while deleting the table: ${error}`);
        throw error;
      }
    }

    return result;
  }

  async batchWrite(items: any[]) {
    const itemChunks = [];
    const chunkSize = 25;
  
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);

      const putRequests = chunk.map((item) => {
        if( this.pkName in item && this.skName in item) {
          item.nimkeePK = item[this.pkName];
          item.nimkeeSK = item[this.skName];
          delete item[this.pkName];
          delete item[this.skName];
        } else {
          throw new Error('missing pk and/or sk');
        }
   
        return {
          PutRequest: {
            Item: item,
          }
        }
      });

      let batchWriteCommand = new BatchWriteCommand({
        RequestItems: {
          [this.tableName]: putRequests,
        },
      });

      let result;
      result = await this.client.send(batchWriteCommand);
      let unProcessedItems = result.UnprocessedItems
        ? result.UnprocessedItems
        : {};
      let moreItems = Object.keys(unProcessedItems).length != 0;
      let retries = 3;

      while (moreItems && retries) {
        batchWriteCommand = new BatchWriteCommand({
          RequestItems: unProcessedItems,
        });

        result = await this.client.send(batchWriteCommand);
        console.log(result);
        unProcessedItems = result.UnprocessedItems
          ? result.UnprocessedItems
          : {};

        if (Object.keys(unProcessedItems).length != 0) {
          const delay = Math.floor(Math.random() * 2000 + 500);
          logger.info("Delaying for unprocessed items ...");
          await new Promise((resolve) => setTimeout(resolve, delay));
          retries--;
        } else {
          moreItems = false;
        }
      }
    }

    return { status: "success" };
  }

  async query(pk: string, sk: string, skCondition?: string) {
    //query.ConsistentRead = true;
    const command = new QueryCommand(query);
    let result = {};
    try {
      result = await this.client.send(command);
    } catch (err) {
      logger.error(`Error occurred while querying the table: ${err}`);
    }
    return result;
  }
}

export default DynamoDB;
