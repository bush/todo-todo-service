import { INimkeeRepo } from "../interface";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { CreateTableCommandInput, DynamoDBClient } from "@aws-sdk/client-dynamodb";
export declare class DynamoDBRepo implements INimkeeRepo {
    private attributes;
    constructor(attributes: {
        client: DynamoDBClient;
        docClient: DynamoDBDocumentClient;
        tableName: string;
        hashKey: string;
        rangeKey?: string;
    });
    static create(tableInfo: CreateTableCommandInput, client?: DynamoDBClient, docClient?: DynamoDBDocumentClient): Promise<INimkeeRepo>;
    empty(): Promise<void>;
    private scan;
    private describe;
    private batchWrite;
}
//# sourceMappingURL=dynamodb.d.ts.map