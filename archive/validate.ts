import config from "../config";
import Joi from "joi";
//import Container from "../../nimkee/ioc/container";
//import Container from "nimkee/ioc/container";
import { Container } from "nimkee";
import {
  NimkeeServerConfig,
  NimkeeApplicationMode,
  NimkeeDBConfig,
  NimkeeDBType,
  NimkeeDeploymentEnv,
  NimkeeLoggerType
} from "nimkee";

import { NimkeeDBStorageMapper } from "../todo/interface";
import { HttpConfig } from "nimkee";

const envVarsSchema = Joi.object({
  app: Joi.object({
    server: Joi.object({
      env: Joi.string()
        .valid(
          NimkeeDeploymentEnv.PRODUCTION,
          NimkeeDeploymentEnv.DEVELOPMENT,
          NimkeeDeploymentEnv.TEST
        ),
      mode: Joi.string()
        .valid(NimkeeApplicationMode.SERVER, NimkeeApplicationMode.SERVERLESS)
        .default(NimkeeApplicationMode.SERVER),
      port: Joi.number().default(3000),
    }),
    middleware: Joi.object({
      http: Joi.object({
        urlencoded: Joi.object({
          parameterLimit: Joi.number().default(20),
          extended: Joi.boolean().default(true),
        }),
        json: Joi.object({
          limit: Joi.alternatives(
            Joi.number().default(1e6),
            Joi.string()
          ).default("1mb"),
        }),
      }),
    }),
    logger: Joi.string().valid(NimkeeLoggerType.BASIC).default(NimkeeLoggerType.BASIC),
    todo: Joi.object({
      route: Joi.string().required(),
      storage: Joi.object({
        mapper: Joi.object({
          type: Joi.string()
            .valid(
              NimkeeDBStorageMapper.DYNAMODB,
              NimkeeDBStorageMapper.ELECTRODB,
              NimkeeDBStorageMapper.MONGODB,
              NimkeeDBStorageMapper.MONGOOSE
            )
            .required(),
          config: Joi.object({
            tableName: Joi.string().required(),
            pkName: Joi.string().required(),
            skName: Joi.string().required(),
          }).required(),
        }).required(),
        database: Joi.object({
          type: Joi.alternatives()
            .conditional(Joi.ref("...mapper.type"), [
              {
                is: NimkeeDBStorageMapper.ELECTRODB,
                then: Joi.string().valid(NimkeeDBType.DYNAMODB).required(),
              },
              {
                is: NimkeeDBStorageMapper.MONGOOSE,
                then: Joi.string().valid(NimkeeDBType.MONGODB).required(),
              },
            ])
            .messages({
              "any.only": `The storage mapper type '${config.app.todo.storage.mapper.type}' does not support the database type '${config.app.todo.storage.database.type}'`,
            }),
          config: Joi.alternatives()
            .conditional("type", [
              {
                is: NimkeeDBType.DYNAMODB,
                then: Joi.object({
                  region: Joi.string().valid("us-east-1", "us-west-2"),
                })
              },
              {
                is: NimkeeDBType.MONGODB,
                then: Joi.object({
                  url: Joi.string().required(),
                }),
              },
            ])
            .required(),
        }).required(),
      }).required(),
    }).required(),
  }),
})
  .required()
  .unknown();

import util from "util";
util.inspect(config, {depth:10});

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "path" } })
  .validate(config);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export type AppConfig = {
  app: {
    server: NimkeeServerConfig;
    middleware: {
      http: HttpConfig;
    };
    logger: NimkeeLoggerType;
    todo: {
      route: string;
      storage: {
        mapper: {
          type: NimkeeDBStorageMapper;
          config: {
            tableName: string;
            pkName: string;
            skName: string;
          };
        };
        database: {
          type: NimkeeDBType;
          config: NimkeeDBConfig;
        };
      };
    };
  };
};

export default function (c: Container) {
  c.service("config", (c) => config);
}