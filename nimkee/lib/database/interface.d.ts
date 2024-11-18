import { MongoClientOptions } from "mongodb";
import { DocumentClient } from "electrodb";
/**
 * @public
 */
export declare enum NimkeeDBType {
    DYNAMODB = "dynamodb",
    MONGODB = "mongodb"
}
/**
 * @public
 */
export declare enum NimkeeDBMapperType {
    DYNAMODB = "dynamodb",
    ELECTRODB = "electrodb",
    MONGODB = "mongodb",
    MONGOOSE = "mongoose"
}
/**
 * @public
 */
export type NimkeeElectroDBConfig = {
    tableName: string;
};
/**
 * @public
 */
export type NimkeeMongooseConfig = {};
/**
 * @public
 */
export type NimkeeDBMapperConfig = {
    electrodb: NimkeeElectroDBConfig;
    mongoose: NimkeeMongooseConfig;
};
/**
 * @public
 */
export type DynamoDBConfig = {};
/**
 * @public
 */
export type MongoDBConfig = {
    url: string;
    options?: MongoClientOptions;
};
/**
 * @public
 */
export type NimkeeDBConfig = DynamoDBConfig | MongoDBConfig;
/**
 * @public
 */
export type NimkeeDBStrategy = {
    client: string;
    config?: NimkeeDBConfig;
};
/**
 * @public
 */
export type NimkeeRepo = string;
/**
 * @public
 */
export interface INimkeeRepo {
    empty(): Promise<void>;
}
/**
 * @public
 */
export type NimkeeDBClient = DocumentClient;
//# sourceMappingURL=interface.d.ts.map