import BasicDatabase from "./basic";

class Database {
  static create(strategy: string, options: any): Database {
    console.log(strategy);
    switch (strategy) {
      case "basic":
        return new BasicDatabase(options);
      default:
        throw new Error("Database type not supported");
    }
  }
}

export default Database;