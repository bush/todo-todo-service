
import * as dotenv from "dotenv";

class Config {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public load(conf: string): any {
    dotenv.config({ path: conf });
    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 4000;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';

    return {
      maxUploadLimit,
      database: {
        type: process.env.DATABASE_TYPE || 'basic-local',
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/todo',
      },
      port,
      url,
    };
  }
}

export default Config;