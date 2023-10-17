import ExpressBase from "../../common/express/express";
import Database from "../../common/database/database";

class Express extends ExpressBase {
  constructor(config: any) {
    super(config);
  }

  // Load database
  public loadDatabase(): void {
    console.log(`url: ${this.express.locals.config.database.type}`);
    this.express.locals.database = Database.create(
      this.express.locals.config.database.type,
      { url: this.express.locals.config.database.url }
    );
  }
}

export default Express;
