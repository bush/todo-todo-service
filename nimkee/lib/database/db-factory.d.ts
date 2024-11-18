import { MongoClient } from "mongodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { NimkeeDBType, NimkeeDBConfig } from "./interface";
/**
 * @public
 */
export declare class DatabaseFactory {
    static create(dbType: NimkeeDBType, config: NimkeeDBConfig): import("electrodb").DocumentClient | DynamoDBClient | MongoClient;
}
//# sourceMappingURL=db-factory.d.ts.map