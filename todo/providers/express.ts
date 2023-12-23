import ExpressBase from "../../common/express/express";
import DatabaseFactory from "../../common/database/database-factory";
import logger from "../../common/logging/logger";
import * as path from 'path';

class Express extends ExpressBase {
  constructor(config: any) {
    super(config);
  }

  // Load database
  public loadDatabase(): void {
    logger.info(`url: ${this.express.locals.config.database.type}`);
    const client = DatabaseFactory.create(
      this.express.locals.config.database.type,
      path.join(process.cwd(),this.express.locals.config.database.url)
    );
    this.express.locals.dbClient = client;
  }
}

export default Express;
