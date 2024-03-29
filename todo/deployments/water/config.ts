const config = {
  app: {
    options: {
      env: process.env.NODE_ENV || "development",
      port: 3000
    },
    middleware: {
      http: {
        urlencoded: {
          parameterLimit: 20,
          extended: true
        },
        json: {
          limit: "1mb"
        }
      }
    },
    todo: {
      route: "/todo",
      storage: {
        mapper: {
          type: "electrodb",
          config: {
            tableName: process.env.TODO_TABLE_NAME
          }
        },
        database: {
          type: "dynamodb",
          config: {}
        }
      }
    }
  }
};

export default config;
